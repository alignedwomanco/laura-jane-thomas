// Scheduled every 5 minutes. Finds due ScheduledEmail records and sends them.
// After sending the final email of a sequence, adds user to NewsletterSubscriber.

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SEQUENCE_LENGTHS = {
  clarity_sprint: 4,
  blueprint: 3,
  alignment_audit: 4,
  recalibration_intensive: 4,
  senior_advisory: 4,
  business_consulting: 4,
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Allow both scheduled automation (no auth) and admin manual triggers
    // Use service role throughout since this is a system function
    const now = new Date();

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

    for (const email of due) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          from_name: "Laura Jane Thomas",
          to: email.toEmail,
          subject: email.subject,
          body: email.htmlBody,
        });

        await base44.asServiceRole.entities.ScheduledEmail.update(email.id, {
          status: "sent",
          sentAt: new Date().toISOString(),
        });

        sent++;

        // Check if this is the final email of the sequence
        const seqLength = SEQUENCE_LENGTHS[email.sequence];
        if (seqLength && email.emailNumber === seqLength) {
          // Add to NewsletterSubscriber if not already there
          const existing = await base44.asServiceRole.entities.NewsletterSubscriber.filter({
            email: email.toEmail,
          });

          if (!existing || existing.length === 0) {
            await base44.asServiceRole.entities.NewsletterSubscriber.create({
              firstName: email.firstName,
              email: email.toEmail,
              source: "quiz_completion",
              subscribedAt: new Date().toISOString(),
              primaryResult: email.primaryResult || null,
            });
          }
        }

      } catch (sendError) {
        await base44.asServiceRole.entities.ScheduledEmail.update(email.id, {
          status: "failed",
          errorMessage: sendError.message,
        });
        failed++;
      }
    }

    return Response.json({ success: true, processed: due.length, sent, failed });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});