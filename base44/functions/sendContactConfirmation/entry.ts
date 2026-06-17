import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const EMAILS = {
  "1:1 Coaching": {
    subject: "Let's talk, [First Name]",
    body: `Hi [First Name],

Thank you for reaching out. I read this myself, and it landed.

People who fill this in are rarely short on capability. They are usually carrying a pattern that keeps producing the same result, and it is hard to see from the inside. That is exactly what a conversation is for.

So rather than trading emails, let's just talk. Grab a 30-minute slot here and we will get into what is actually keeping you stuck:

https://calendly.com/hello-laurajanethomas/30min

See you soon,

Laura`,
  },
  "Business Mentorship": {
    subject: "Book a time, [First Name]",
    body: `Hi [First Name],

Got your message, and I am glad you reached out.

I built and ran my own agency for more than a decade, so I mentor from the operator seat, not the theory shelf. The quickest way to know whether I am the right person for what you are building is a real conversation.

Pick a time that works for you and we will get into it:

https://calendly.com/hello-laurajanethomas/30min

Talk soon,

Laura`,
  },
  "Fractional CMO Consulting": {
    subject: "Let's get a call in the diary",
    body: `Hi [First Name],

Thanks for reaching out. Your enquiry is in front of me.

I work with a small number of founders and CEOs at a time, so the first step is a direct conversation about your growth goals and whether I am the right person to lead this. We can map the entry point on the call, whether that is a strategy-first scope, an audit, or an ongoing partnership.

Book 30 minutes here and we will get moving:

https://calendly.com/hello-laurajanethomas/30min

Speak soon,

Laura`,
  },
  "Speaking or Panelist Opportunities": {
    subject: "Thanks for the invitation, [First Name]",
    body: `Hi [First Name],

Thank you for thinking of me for [Event Name].

The fastest way to work out fit, fee, and angle is a quick call. Grab a time and walk me through the room you are building and what you want the audience to leave with:

https://calendly.com/hello-laurajanethomas/30min

I tailor the talk to the audience rather than recycling a fixed keynote, so the more I understand the event, the sharper it will be.

Warmly,

Laura`,
  },
  "Podcast Collaboration": {
    subject: "Let's talk podcast, [First Name]",
    body: `Hi [First Name],

Thank you for the invitation to [Podcast Name].

I care more about whether a conversation is useful to your listeners than about airtime. The easiest way to find the right angle is to talk it through. Pick a time here:

https://calendly.com/hello-laurajanethomas/30min

Come with the outcome you want your audience to walk away with, and I will build around it.

Talk soon,

Laura`,
  },
  "Something Else": {
    subject: "Let's talk, [First Name]",
    body: `Hi [First Name],

Thanks for reaching out. Not everything fits in a neat box, and I would rather hear what you are actually navigating than guess.

Grab a 30-minute slot and tell me directly. If I am the right person to help, I will tell you how. If someone in my network is a better fit, I will point you there:

https://calendly.com/hello-laurajanethomas/30min

Either way, you will not be talking to an automation.

Laura`,
  },
};

function fillTemplate(template, firstName, messageData) {
  const name = firstName || "there";
  let result = template.replace(/\[First Name\]/g, name);

  if (messageData) {
    result = result.replace(/\[Event Name\]/g, messageData.event_name || "your event");
    result = result.replace(/\[Podcast Name\]/g, messageData.podcast_name || "your podcast");
  }

  return result;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();
    const submission = payload.data;

    if (!submission) {
      return Response.json({ error: "No submission data" }, { status: 400 });
    }

    const enquiryType = submission.subject;
    const email = EMAILS[enquiryType];

    if (!email) {
      console.log(`[sendContactConfirmation] Unknown enquiry type: ${enquiryType}, skipping`);
      return Response.json({ skipped: true, reason: `Unknown enquiry type: ${enquiryType}` });
    }

    const firstName = submission.firstName || "";
    let messageData = {};
    try {
      messageData = JSON.parse(submission.message || "{}");
    } catch (_) { /* ignore parse errors */ }

    const subject = fillTemplate(email.subject, firstName, messageData);
    const body = fillTemplate(email.body, firstName, messageData);

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    const mimeMessage = `From: hello@laurajanethomas.biz
To: ${submission.email}
Bcc: hello@laurajanethomas.biz
Subject: ${subject}
Content-Type: text/plain; charset="UTF-8"

${body}`;

    const base64Message = btoa(mimeMessage).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    const gmailRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: base64Message }),
    });

    if (!gmailRes.ok) {
      const err = await gmailRes.text();
      throw new Error(`Gmail API error: ${err}`);
    }

    console.log(`[sendContactConfirmation] Confirmation email sent to ${submission.email} for "${enquiryType}"`);
    return Response.json({ success: true });
  } catch (error) {
    console.error("[sendContactConfirmation] Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});