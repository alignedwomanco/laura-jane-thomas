import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const testEmail = 'hello@laurajanethomas.biz';
    const testFirstName = 'Laura';
    const testCompany = 'Your Brand';
    const testReportId = 'test-123';
    const origin = 'https://laurajanethomas.biz';
    const reportUrl = `${origin}/strategy-report/${testReportId}`;

    const emailBody = `Hi ${testFirstName},

Thank you for completing the Brand Strategy Diagnostic. Your honesty and clarity throughout the questionnaire have given us everything we need to create a meaningful strategy for ${testCompany}.

Your Brand Strategy Report: A comprehensive analysis of your business, positioning, audience, and the strategic priorities that will move the needle. This is the strategic roadmap.

Your Questionnaire Answers: A complete record of everything you shared. Reference this as you review the strategy, and share it with your team.

Both are yours to keep, review, and act on at your own pace.

What's next?

This report is most valuable when we walk through it together. Book a strategy session to:

Dive deep into the key findings
Clarify any recommendations
Map out your first 90 days of execution

Download both PDFs here:
${reportUrl}

The clarity is already here. Now comes the action.

Look forward to hearing from you,
Laura.

www.laurajanethomas.biz
hello@laurajanethomas.biz
+27 677302030`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: testEmail,
      subject: 'Your Brand Strategy Diagnostic is Ready',
      body: emailBody,
      from_name: 'Laura Jane Thomas',
    });

    return Response.json({ success: true, message: `Test email sent to ${testEmail}` });
  } catch (error) {
    console.error('[sendTestEmail] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});