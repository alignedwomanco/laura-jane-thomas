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

    const firstName = eng.client_name.split(' ')[0];
    const scopeItems = eng.scope_items || [];

    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your Client Portal is Ready</title></head>
<body style="margin:0;padding:0;background-color:#F5EDE0;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5EDE0;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border:1px solid #D6C4B0;">

        <!-- Header -->
        <tr>
          <td style="background-color:#3D0A14;padding:36px 48px;text-align:center;">
            <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:22px;letter-spacing:0.1em;text-transform:uppercase;color:#F5EDE0;">Laura Jane Thomas</p>
            <p style="margin:0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,237,224,0.55);font-family:Arial,sans-serif;">Brand &amp; Marketing Strategy</p>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:48px 48px 32px;">
            <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:13px;color:#888;letter-spacing:0.05em;">Dear ${firstName},</p>
            <p style="margin:0 0 16px;font-family:'Georgia',serif;font-size:22px;color:#3D0A14;line-height:1.4;">Your client portal is ready.</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#555;line-height:1.8;">I'm delighted to confirm the start of our engagement. Everything you need is waiting for you in your dedicated client portal.</p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 48px;"><div style="height:1px;background-color:#EDE4D8;"></div></td></tr>

        <!-- Engagement Summary -->
        <tr>
          <td style="padding:32px 48px;">
            <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#C2858B;font-weight:600;">Engagement Summary</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding:4px 0;font-family:Arial,sans-serif;font-size:12px;color:#999;width:40%;vertical-align:top;">Package</td>
                <td style="padding:4px 0;font-family:Arial,sans-serif;font-size:12px;color:#2C2C2C;font-weight:600;">${eng.package_title || eng.package_template}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-family:Arial,sans-serif;font-size:12px;color:#999;vertical-align:top;">Company</td>
                <td style="padding:4px 0;font-family:Arial,sans-serif;font-size:12px;color:#2C2C2C;font-weight:600;">${eng.company_name}</td>
              </tr>
            </table>

            ${scopeItems.length > 0 ? `
            <p style="margin:24px 0 12px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#999;">Scope of Work</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              ${scopeItems.map((item, i) => `
              <tr>
                <td style="padding:5px 0;border-bottom:1px solid #F0E8DF;">
                  <span style="font-family:Arial,sans-serif;font-size:13px;color:#3D0A14;font-weight:600;margin-right:10px;">${i + 1}.</span>
                  <span style="font-family:Arial,sans-serif;font-size:13px;color:#2C2C2C;line-height:1.6;">${item}</span>
                </td>
              </tr>`).join('')}
            </table>` : ''}

            ${eng.total_investment ? `
            <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:24px;background-color:#FAF5EF;border:1px solid #EDE4D8;">
              <tr>
                <td style="padding:12px 16px;font-family:Arial,sans-serif;font-size:12px;color:#999;border-bottom:1px solid #EDE4D8;">Total Investment</td>
                <td style="padding:12px 16px;font-family:'Georgia',serif;font-size:14px;color:#3D0A14;font-weight:600;text-align:right;border-bottom:1px solid #EDE4D8;">${eng.total_investment}</td>
              </tr>
              ${eng.deposit_amount ? `<tr>
                <td style="padding:12px 16px;font-family:Arial,sans-serif;font-size:12px;color:#999;border-bottom:1px solid #EDE4D8;">Deposit (${eng.deposit_percent || '60%'})</td>
                <td style="padding:12px 16px;font-family:'Georgia',serif;font-size:14px;color:#C2858B;font-weight:600;text-align:right;border-bottom:1px solid #EDE4D8;">${eng.deposit_amount}</td>
              </tr>` : ''}
              ${eng.balance_amount ? `<tr>
                <td style="padding:12px 16px;font-family:Arial,sans-serif;font-size:12px;color:#999;">Balance on delivery</td>
                <td style="padding:12px 16px;font-family:'Georgia',serif;font-size:14px;color:#2C2C2C;font-weight:600;text-align:right;">${eng.balance_amount}</td>
              </tr>` : ''}
            </table>` : ''}
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 48px;"><div style="height:1px;background-color:#EDE4D8;"></div></td></tr>

        <!-- Portal CTA -->
        <tr>
          <td style="padding:32px 48px;">
            <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#C2858B;font-weight:600;">Your Client Portal</p>
            <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:13px;color:#555;line-height:1.8;">Access your portal to:</p>
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr><td style="padding:4px 0;font-family:Arial,sans-serif;font-size:13px;color:#2C2C2C;line-height:1.7;"><span style="color:#C2858B;margin-right:8px;">•</span>Review and accept your engagement agreement</td></tr>
              ${eng.include_questionnaire ? `<tr><td style="padding:4px 0;font-family:Arial,sans-serif;font-size:13px;color:#2C2C2C;line-height:1.7;"><span style="color:#C2858B;margin-right:8px;">•</span>Complete the Brand Strategy Diagnostic questionnaire</td></tr>` : ''}
              <tr><td style="padding:4px 0;font-family:Arial,sans-serif;font-size:13px;color:#2C2C2C;line-height:1.7;"><span style="color:#C2858B;margin-right:8px;">•</span>View banking details and make your deposit payment</td></tr>
            </table>
            <a href="${portalUrl}" style="display:inline-block;background-color:#3D0A14;color:#F5EDE0;text-decoration:none;padding:14px 36px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">Access Your Portal →</a>
          </td>
        </tr>

        ${eng.process_notes ? `
        <!-- Divider -->
        <tr><td style="padding:0 48px;"><div style="height:1px;background-color:#EDE4D8;"></div></td></tr>
        <tr>
          <td style="padding:28px 48px;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#555;line-height:1.8;">${eng.process_notes}</p>
          </td>
        </tr>` : ''}

        <!-- Divider -->
        <tr><td style="padding:0 48px;"><div style="height:1px;background-color:#EDE4D8;"></div></td></tr>

        <!-- Sign off -->
        <tr>
          <td style="padding:32px 48px 40px;">
            <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:13px;color:#555;line-height:1.8;">Please don't hesitate to reach out if you have any questions.</p>
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:12px;color:#999;">Warmly,</p>
            <p style="margin:0 0 12px;font-family:'Georgia',serif;font-size:17px;color:#3D0A14;">Laura Jane Thomas</p>
            <table cellpadding="0" cellspacing="0">
              <tr><td style="padding:2px 0;font-family:Arial,sans-serif;font-size:12px;"><a href="https://laurajanethomas.biz" style="color:#C2858B;text-decoration:none;">laurajanethomas.biz</a></td></tr>
              <tr><td style="padding:2px 0;font-family:Arial,sans-serif;font-size:12px;"><a href="mailto:hello@laurajanethomas.biz" style="color:#C2858B;text-decoration:none;">hello@laurajanethomas.biz</a></td></tr>
              <tr><td style="padding:2px 0;font-family:Arial,sans-serif;font-size:12px;color:#999;">+27 677302030</td></tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#FAF5EF;padding:16px 48px;border-top:1px solid #EDE4D8;text-align:center;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:#bbb;letter-spacing:0.05em;">This message is confidential and intended solely for ${eng.client_name}. © Laura Jane Thomas</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const mimeMessage = `From: hello@laurajanethomas.biz
To: ${eng.client_email}
Bcc: hello@laurajanethomas.biz
Subject: Your Client Portal is Ready — Laura Jane Thomas
MIME-Version: 1.0
Content-Type: text/html; charset="UTF-8"

${htmlBody}`;

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