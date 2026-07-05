import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

const OXBLOOD = [107, 15, 15];
const DARK = [20, 20, 20];
const MUTED = [100, 85, 75];
const LIGHT_BG = [250, 248, 245];
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;

const SECTION_QUESTIONS = {
  businessFoundation: [
    "What are you actually selling — not the category, but the outcome?",
    "If someone paid you tomorrow, what exactly would they receive?",
    "What would someone Google to find you, honestly?",
    "What problem are you solving that people are already paying to fix?",
    "Where does your business make money first, and where does it scale later?",
    "If this business worked perfectly, how would it generate revenue?",
    "If you could not sell your current offer, what would you sell instead?",
  ],
  operationsBudget: [
    "What is your budget for this project?",
    "What is your target timeframe or deadline?",
    "What type of support do you need?",
    "Do you have an existing internal team?",
    "What are your team's capabilities?",
    "What is your preferred working model?",
    "Describe your past experience working with agencies.",
    "What needs to be different this time?",
  ],
  marketingAssets: [
    "What marketing assets do you currently have?",
    "What is currently working well from your existing assets and channels?",
  ],
  audienceInsight: [
    "Who frustrates you the most in your audience and why?",
    "Who do you want more of?",
    "What do your best clients have in common?",
    "What does your audience say they want vs. what they actually need?",
    "What are they tired of hearing in your industry?",
    "If your audience was in a room, what would they be too embarrassed to admit?",
  ],
  positioning: [
    "What do you do that others technically do, but not like you?",
    "What do you believe your industry gets wrong?",
    "Where are you playing small to stay palatable?",
    "If you removed 80% of your offer, what would remain?",
    "What are you over-explaining that should be obvious?",
    "If a competitor copied you, what could they never replicate?",
  ],
  brandTruth: [
    "What part of your brand is performative?",
    "Where are you trying to sound like someone else?",
    "What are you afraid to say publicly?",
    "What would your brand say if it had nothing to lose?",
    "What do people misunderstand about your brand?",
    "If your business became wildly successful overnight, what would you lose?",
  ],
  brandEssence: [
    "If your brand were a character or guide, who would it be?",
    "What deeper truth does your brand stand for?",
    "What do you want people to feel when they interact with your brand?",
  ],
  visionGrowth: [
    "What future are you building through this brand?",
    "What needs to change to get there?",
    "What opportunities are you not pursuing but should be?",
  ],
  legacyValues: [
    "What would people say about your brand if you were not in the room?",
    "What do you want to be known for in 10 years?",
    "What would make your brand irreplaceable?",
    "What would matter most if you had to teach this business to someone else?",
    "What does your brand protect?",
    "Core Values",
  ],
};

function buildPdf(report) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  const checkSpace = (needed) => {
    if (y + needed > PAGE_H - MARGIN) {
      doc.addPage();
      doc.setFillColor(...LIGHT_BG);
      doc.rect(0, 0, PAGE_W, PAGE_H, "F");
      y = MARGIN;
    }
  };

  // Cover Page
  doc.setFillColor(...LIGHT_BG);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  doc.setFillColor(...OXBLOOD);
  doc.rect(0, 0, 6, PAGE_H, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text("BRAND STRATEGY DIAGNOSTIC", MARGIN, 32, { charSpace: 1.5 });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...DARK);
  doc.text("Questionnaire Answers", MARGIN, 72);

  if (report.fullName) {
    doc.setFontSize(11);
    doc.setTextColor(...MUTED);
    doc.text(report.fullName, MARGIN, 90);
  }
  if (report.company) {
    doc.setFontSize(11);
    doc.setTextColor(...MUTED);
    doc.text(report.company, MARGIN, report.fullName ? 100 : 90);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...OXBLOOD);
  doc.text("laurajanethomas", MARGIN, PAGE_H - 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("Award-Winning Brand Strategist", MARGIN, PAGE_H - 21);

  // Your Details Page
  doc.addPage();
  doc.setFillColor(...LIGHT_BG);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  y = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...DARK);
  doc.text("Your Details", MARGIN, y);
  y += 10;

  doc.setDrawColor(220, 215, 210);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  const details = [
    ["Full Name", report.fullName],
    ["Position", report.position],
    ["Company", report.company],
    ["Email", report.email],
    ["Phone", report.phone],
  ];

  details.forEach(([label, value]) => {
    if (!value) return;
    checkSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(label.toUpperCase(), MARGIN, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    const wrapped = doc.splitTextToSize(String(value), CONTENT_W);
    doc.text(wrapped, MARGIN, y);
    y += wrapped.length * 5.5 + 5;
  });

  // Q&A Sections
  const sections = [
    { title: "Business Foundation", key: "businessFoundation" },
    { title: "Operations, Budget & Delivery", key: "operationsBudget" },
    { title: "Current Marketing Assets", key: "marketingAssets" },
    { title: "Audience Insight", key: "audienceInsight" },
    { title: "Positioning & Differentiation", key: "positioning" },
    { title: "Brand Truth", key: "brandTruth" },
    { title: "Brand Essence", key: "brandEssence" },
    { title: "Vision & Growth", key: "visionGrowth" },
    { title: "Legacy & Values", key: "legacyValues" },
  ];

  sections.forEach((section) => {
    const data = report[section.key];
    if (!data || typeof data !== "object") return;

    doc.addPage();
    doc.setFillColor(...LIGHT_BG);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");
    y = MARGIN;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...DARK);
    doc.text(section.title, MARGIN, y);
    y += 10;

    doc.setDrawColor(220, 215, 210);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 8;

    const questions = SECTION_QUESTIONS[section.key] || [];
    const entries = Object.entries(data);

    entries.forEach(([key, value], idx) => {
      const question = questions[idx] || key;
      const answer = String(value || "—").trim();

      checkSpace(20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(...OXBLOOD);
      const qWrapped = doc.splitTextToSize(`Q: ${question}`, CONTENT_W);
      doc.text(qWrapped, MARGIN, y);
      y += qWrapped.length * 5 + 3;

      checkSpace(10);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 50, 44);
      const aWrapped = doc.splitTextToSize(answer, CONTENT_W - 4);
      doc.text(aWrapped, MARGIN + 4, y);
      y += aWrapped.length * 5.5 + 8;
    });

    doc.setDrawColor(220, 215, 210);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, PAGE_H - 14, PAGE_W - MARGIN, PAGE_H - 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text("laurajanethomas — Questionnaire Answers", MARGIN, PAGE_H - 9);
  });

  return doc.output('arraybuffer');
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { submissionId } = await req.json();
    if (!submissionId) {
      return Response.json({ error: 'submissionId is required' }, { status: 400 });
    }

    const submissions = await base44.asServiceRole.entities.BrandStrategySubmission.filter({ id: submissionId });
    const report = submissions[0];
    if (!report) {
      return Response.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Generate PDF
    const pdfBuffer = buildPdf(report);
    const pdfBytes = new Uint8Array(pdfBuffer);

    // Base64 encode PDF
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < pdfBytes.length; i += chunkSize) {
      const chunk = pdfBytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk);
    }
    const pdfBase64 = btoa(binary);

    const fileName = report.company
      ? `${report.company.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}-Answers.pdf`
      : 'Questionnaire-Answers.pdf';

    const firstName = (report.fullName || report.firstName || 'there').split(' ')[0];

    // HTML email body
    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#F5EDE0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5EDE0;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border:1px solid #D6C4B0;">
        <tr>
          <td style="background-color:#3D0A14;padding:36px 48px;text-align:center;">
            <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:22px;letter-spacing:0.1em;text-transform:uppercase;color:#F5EDE0;">Laura Jane Thomas</p>
            <p style="margin:0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,237,224,0.55);">Brand &amp; Marketing Strategy</p>
          </td>
        </tr>
        <tr>
          <td style="padding:48px 48px 32px;">
            <p style="margin:0 0 20px;font-size:13px;color:#888;">Hi ${firstName},</p>
            <p style="margin:0 0 16px;font-size:15px;color:#2C2C2C;line-height:1.8;">Thank you for completing the Brand Strategy Diagnostic. Your responses were detailed and honest which is a great start! There's a clear vision behind Grounded Wellbeing, and I can see the depth of thought you've put into it.</p>
            <p style="margin:0 0 16px;font-size:15px;color:#2C2C2C;line-height:1.8;">I've attached a PDF of your full answers for your records, so you have everything in one place to revisit whenever you need.</p>
            <p style="margin:0;font-size:15px;color:#2C2C2C;line-height:1.8;">Look forward to speaking with you on Wednesday.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 48px 40px;">
            <p style="margin:0 0 4px;font-size:12px;color:#999;">Warmly,</p>
            <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:17px;color:#3D0A14;">Laura Jane Thomas</p>
            <table cellpadding="0" cellspacing="0">
              <tr><td style="padding:2px 0;font-size:12px;"><a href="https://laurajanethomas.biz" style="color:#C2858B;text-decoration:none;">www.laurajanethomas.biz</a></td></tr>
              <tr><td style="padding:2px 0;font-size:12px;"><a href="mailto:hello@laurajanethomas.biz" style="color:#C2858B;text-decoration:none;">hello@laurajanethomas.biz</a></td></tr>
              <tr><td style="padding:2px 0;font-size:12px;color:#999;">+27 677302030</td></tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // Build multipart MIME message with attachment
    const boundary = "ljt_boundary_" + Math.random().toString(36).substring(2);
    const mimeMessage = `From: hello@laurajanethomas.biz
To: ${report.email}
Bcc: hello@laurajanethomas.biz
Subject: Your Brand Strategy Diagnostic Answers
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="${boundary}"

--${boundary}
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: 7bit

${htmlBody}

--${boundary}
Content-Type: application/pdf
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="${fileName}"

${pdfBase64}

--${boundary}--`;

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

    const result = await gmailRes.json();
    console.log('[sendAnswersPDF] Email sent to:', report.email, 'Message ID:', result.id);

    return Response.json({ success: true, messageId: result.id, to: report.email });

  } catch (error) {
    console.error('[sendAnswersPDF] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});