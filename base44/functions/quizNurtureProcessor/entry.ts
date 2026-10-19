// Scheduled every 5 minutes. Finds due ScheduledEmail records and sends them via Gmail.
// After sending the final email of a sequence, adds user to NewsletterSubscriber.
// Also updates nurtureEmailsSent count on the QuizSubmission.

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const FROM_EMAIL = "hello@laurajanethomas.biz";
const FROM_NAME = "Laura Jane Thomas";

const SEQUENCE_LENGTHS = {
  clarity_sprint: 4,
  blueprint: 3,
  alignment_audit: 4,
  recalibration_intensive: 4,
  senior_advisory: 4,
  business_consulting: 4,
};

// Retry a failed send this many times, waiting RETRY_DELAY_MINUTES between tries.
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MINUTES = 30;
// Never send a nurture email more than this late. Stops stale sequences going out
// in a burst after an outage (e.g. a lead who has since become a client).
const MAX_OVERDUE_HOURS = 48;

// RFC 2047 header encoding so subjects with accents or curly quotes render correctly.
function encodeHeader(value) {
  return /^[\x00-\x7F]*$/.test(value)
    ? value
    : `=?UTF-8?B?${btoa(unescape(encodeURIComponent(value)))}?=`;
}

async function sendViaGmail(accessToken, toEmail, subject, htmlBody) {
  const boundary = "boundary_" + Date.now();
  const mimeMessage = [
    `From: ${FROM_NAME} <${FROM_EMAIL}>`,
    `To: ${toEmail}`,
    `Subject: ${encodeHeader(subject)}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    `Content-Transfer-Encoding: base64`,
    ``,
    btoa(unescape(encodeURIComponent(htmlBody))),
    `--${boundary}--`,
  ].join("\r\n");

  const encodedMessage = btoa(unescape(encodeURIComponent(mimeMessage)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: encodedMessage }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gmail send failed: ${err}`);
  }

  return await res.json();
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const now = new Date();

    // Get Gmail access token once for this run
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("gmail");

    // Fetch all scheduled emails that are due
    const allScheduled = await base44.asServiceRole.entities.ScheduledEmail.filter({
      status: "scheduled"
    });

    const due = allScheduled.filter(e => new Date(e.scheduledAt) <= now);

    if (due.length === 0) {
      return Response.json({ success: true, processed: 0 });
    }

    let sent = 0;
    let failed = 0;

    let skipped = 0;

    for (const emailRecord of due) {
      const hoursOverdue = (now.getTime() - new Date(emailRecord.scheduledAt).getTime()) / 3600000;
      if (hoursOverdue > MAX_OVERDUE_HOURS) {
        await base44.asServiceRole.entities.ScheduledEmail.update(emailRecord.id, {
          status: "skipped",
          errorMessage: `Not sent: ${Math.round(hoursOverdue)} hours overdue (limit ${MAX_OVERDUE_HOURS}). Use Retry in the admin page to send anyway.`,
        });
        skipped++;
        continue;
      }

      try {
        await sendViaGmail(accessToken, emailRecord.toEmail, emailRecord.subject, emailRecord.htmlBody);

        const sentAt = new Date().toISOString();
        await base44.asServiceRole.entities.ScheduledEmail.update(emailRecord.id, {
          status: "sent",
          sentAt,
        });

        sent++;

        // Update nurtureEmailsSent on the QuizSubmission
        if (emailRecord.submissionId) {
          try {
            const submission = await base44.asServiceRole.entities.QuizSubmission.get(emailRecord.submissionId);
            if (submission) {
              await base44.asServiceRole.entities.QuizSubmission.update(emailRecord.submissionId, {
                nurtureEmailsSent: (submission.nurtureEmailsSent || 0) + 1,
              });
            }
          } catch (_) {
            // Non-fatal: don't fail the send if submission update fails
          }
        }

        // Check if this is the final email of the sequence — add to newsletter
        const seqLength = SEQUENCE_LENGTHS[emailRecord.sequence];
        if (seqLength && emailRecord.emailNumber === seqLength) {
          const existing = await base44.asServiceRole.entities.NewsletterSubscriber.filter({
            email: emailRecord.toEmail,
          });

          if (!existing || existing.length === 0) {
            await base44.asServiceRole.entities.NewsletterSubscriber.create({
              firstName: emailRecord.firstName,
              email: emailRecord.toEmail,
              source: "quiz_completion",
              subscribedAt: sentAt,
              primaryResult: emailRecord.primaryResult || null,
            });
          }
        }

      } catch (sendError) {
        const attempts = (emailRecord.attempts || 0) + 1;
        if (attempts >= MAX_ATTEMPTS) {
          await base44.asServiceRole.entities.ScheduledEmail.update(emailRecord.id, {
            status: "failed",
            attempts,
            errorMessage: sendError.message,
          });
        } else {
          // Keep it queued and try again later. Shifting scheduledAt also resets the overdue clock.
          await base44.asServiceRole.entities.ScheduledEmail.update(emailRecord.id, {
            status: "scheduled",
            attempts,
            scheduledAt: new Date(now.getTime() + RETRY_DELAY_MINUTES * 60000).toISOString(),
            errorMessage: `Attempt ${attempts} failed: ${sendError.message}`,
          });
        }
        failed++;
      }
    }

    return Response.json({ success: true, processed: due.length, sent, failed, skipped });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});