import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { engagementId } = await req.json();
    if (!engagementId) {
      return Response.json({ error: 'engagementId is required' }, { status: 400 });
    }

    const engagements = await base44.asServiceRole.entities.ClientEngagement.filter({ id: engagementId });
    const eng = engagements[0];
    if (!eng) {
      return Response.json({ error: 'Engagement not found' }, { status: 404 });
    }

    const origin = req.headers.get('origin') || 'https://laurajanethomas.biz';
    const portalUrl = `${origin}/portal`;

    const scopeList = (eng.scope_items || []).map((item, i) => `${i + 1}. ${item}`).join('\n');

    const emailBody = `Dear ${eng.client_name},

I'm delighted to confirm the start of our engagement. Your client portal is now ready and you can access everything you need there.

—

ENGAGEMENT SUMMARY
Package: ${eng.package_title || eng.package_template}
Company: ${eng.company_name}

${scopeList ? `Scope of Work:\n${scopeList}\n` : ''}
${eng.total_investment ? `Investment: ${eng.total_investment}` : ''}
${eng.deposit_amount ? `Deposit (${eng.deposit_percent || '60%'}): ${eng.deposit_amount}` : ''}
${eng.balance_amount ? `Balance on delivery: ${eng.balance_amount}` : ''}

—

YOUR CLIENT PORTAL
Access your portal here to:
• Review and accept your engagement agreement
${eng.include_questionnaire ? '• Complete the Brand Strategy Diagnostic questionnaire\n' : ''}• View banking details and make your deposit payment

${portalUrl}

${eng.process_notes ? `\n${eng.process_notes}\n` : ''}
Please don't hesitate to reach out if you have any questions.

With warmth,
Laura Jane Thomas
laurajanethomas.biz
hello@laurajanethomas.biz
+27 677302030`;

    const mimeMessage = `From: hello@laurajanethomas.biz
To: ${eng.client_email}
Subject: Your Client Portal is Ready — Laura Jane Thomas
Content-Type: text/plain; charset="UTF-8"

${emailBody}`;

    const base64Message = btoa(unescape(encodeURIComponent(mimeMessage)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

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

    // Update engagement record
    await base44.asServiceRole.entities.ClientEngagement.update(engagementId, {
      invite_sent: true,
      invite_sent_at: new Date().toISOString(),
      status: 'invited',
    });

    console.log('[sendClientInvite] Invite sent to:', eng.client_email);
    return Response.json({ success: true });

  } catch (error) {
    console.error('[sendClientInvite] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});