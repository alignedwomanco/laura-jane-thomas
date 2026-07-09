import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

const OXBLOOD = [107, 31, 42];
const DARK = [20, 20, 20];
const MUTED = [100, 85, 75];
const LIGHT_BG = [250, 248, 245];
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;

const OAE_Q15_SENTENCES = {
  A: 'We match Sellers who make electricity with Buyers who use it.',
  B: "South Africa's first multilateral wheeling platform.",
  C: 'Your business can now buy cheaper, cleaner power, and we make that deal safe enough for your board.',
  D: 'We help large energy users cut their electricity costs, with a contract their bank and their board can trust.',
};

const OAE_SECTIONS = [
  { number: 1, title: 'You and OAE' },
  { number: 2, title: 'What we are' },
  { number: 3, title: 'Quick calibration' },
  { number: 4, title: 'The buyer' },
  { number: 5, title: 'Value and proof' },
  { number: 6, title: 'The market' },
  { number: 7, title: 'Last word' },
  { number: 8, title: 'About you' },
];

const OAE_QUESTIONS = [
  { id: 'q1_join_reason', section: 1, number: 'Q1', label: 'Why did you join OAE? What made you say yes?', type: 'longtext' },
  { id: 'q2_customer_frequency', section: 1, number: 'Q2', label: 'How often do you speak directly with customers or prospective customers?', type: 'single' },
  { id: 'q3_what_we_do', section: 2, number: 'Q3', label: 'In one sentence, in your own words: what does Open Access Energy do?', type: 'longtext' },
  { id: 'q4_prospect_lift', section: 2, number: 'Q4', label: 'A prospect leaves their first meeting with us. In the lift, a colleague asks: "So what do they actually do?" What do you think the prospect says?', type: 'longtext' },
  { id: 'q5_gerjo_sentence', section: 2, number: 'Q5a', label: 'What would Gerjo say OAE is, in one sentence?', type: 'longtext' },
  { id: 'q5_you_sentence', section: 2, number: 'Q5b', label: 'And what would you say?', type: 'longtext' },
  { id: 'q6_today_type', section: 2, number: 'Q6', label: 'Which of these feels most true of what OAE is today?', type: 'single' },
  { id: 'q6_today_other', section: 2, number: 'Q6', label: 'Other (today)', type: 'longtext' },
  { id: 'q6a_future_type', section: 2, number: 'Q6a', label: 'Which one should we be in three years?', type: 'single' },
  { id: 'q6a_future_other', section: 2, number: 'Q6a', label: 'Other (future)', type: 'longtext' },
  { id: 'q6a_change_required', section: 2, number: 'Q6a', label: 'What has to change to get there?', type: 'longtext' },
  { id: 'q7_three_words', section: 2, number: 'Q7', label: 'Describe OAE in exactly three words.', type: 'array' },
  { id: 's1_website_clarity', section: 3, number: 'S1', label: 'A stranger lands on our website for 30 seconds. How confident are you they could then say what OAE does?', type: 'slider' },
  { id: 's2_buyer_picture', section: 3, number: 'S2', label: 'How clearly can you picture our single most important buyer?', type: 'slider' },
  { id: 's3_team_alignment', section: 3, number: 'S3', label: 'How confident are you that everyone at OAE would describe the company the same way?', type: 'slider' },
  { id: 's4_proof_strength', section: 3, number: 'S4', label: 'How strong is our proof, today, that OAE saves buyers money?', type: 'slider' },
  { id: 's5_cfo_safety', section: 3, number: 'S5', label: 'A CFO asks us: "Is this safe?" How confident are you in the answer we can give today?', type: 'slider' },
  { id: 'q8_buyer_description', section: 4, number: 'Q8', label: 'Picture our single most important customer. Describe the person: their role, the operation they run, what a normal Tuesday looks like.', type: 'longtext' },
  { id: 'q9_main_obstacle', section: 4, number: 'Q9', label: 'What is the main thing stopping that person from signing with us?', type: 'longtext' },
  { id: 'q10_biggest_fear', section: 4, number: 'Q10', label: 'And what is their biggest fear?', type: 'longtext' },
  { id: 'q11_lost_deal_story', section: 4, number: 'Q11', label: 'Think of the last specific deal we lost. What actually happened, step by step?', type: 'longtext' },
  { id: 'q11a_why_died', section: 4, number: 'Q11a', label: 'And in your view, why did that one die?', type: 'longtext' },
  { id: 'q12_customer_quote', section: 4, number: 'Q12', label: 'What is the last thing you heard a customer or prospect say that stuck with you? Quote it and say why it stuck.', type: 'longtext' },
  { id: 'q13_why_choose', section: 5, number: 'Q13', label: 'Complete this sentence: "Businesses should choose OAE because ______."', type: 'longtext' },
  { id: 'q14_strongest_proof', section: 5, number: 'Q14', label: 'What is the single strongest piece of proof we have that OAE works?', type: 'longtext' },
  { id: 'q15a_most_true', section: 5, number: 'Q15a', label: 'Which is the most true of OAE today?', type: 'single', optionLabels: OAE_Q15_SENTENCES },
  { id: 'q15b_cfo_meeting', section: 5, number: 'Q15b', label: 'Which would make a CFO most likely to ask for a meeting?', type: 'single', optionLabels: OAE_Q15_SENTENCES },
  { id: 'q15c_better_sentence', section: 5, number: 'Q15c', label: 'If your two picks differ, say why. Or write a sentence that beats all four.', type: 'longtext' },
  { id: 'q16_overclaimed', section: 5, number: 'Q16', label: 'What do we currently say about ourselves that you privately suspect is overclaimed? What would you change?', type: 'longtext' },
  { id: 'q17_lose_to_ranking', section: 6, number: 'Q17', label: 'When we lose, who or what do we actually lose to? Rank whatever applies.', type: 'rank' },
  { id: 'q17_other', section: 6, number: 'Q17', label: 'Other (lose to)', type: 'longtext' },
  { id: 'q18_jargon_comfort', section: 6, number: 'Q18', label: 'Which of these would you happily use, unexplained, with a brand-new buyer?', type: 'multi' },
  { id: 'q19_if_disappeared', section: 6, number: 'Q19', label: 'If OAE disappeared tomorrow, what would our current customers genuinely do?', type: 'longtext' },
  { id: 'q20_stress_test', section: 6, number: 'Q20', label: 'Stress test. Fifty qualified buyers arrive tomorrow. What breaks first?', type: 'longtext' },
  { id: 'q21_turn_away', section: 6, number: 'Q21', label: 'Describe a customer we should politely turn away.', type: 'longtext' },
  { id: 'q22_magic_wand', section: 7, number: 'Q22', label: 'Magic wand. 18 months from now and OAE is the company everyone is talking about. What happened?', type: 'longtext' },
  { id: 'q23_anything_else', section: 7, number: 'Q23', label: 'Anything you want to say that no question asked?', type: 'longtext' },
  { id: 'respondent_name', section: 8, number: 'Q24', label: 'Your name.', type: 'shorttext' },
  { id: 'respondent_role', section: 8, number: 'Q25', label: 'Your role, in your own words.', type: 'longtext' },
];

function formatAnswer(question, value) {
  if (value === null || value === undefined || value === '') return '';
  if (question.type === 'multi') return value.join(', ');
  if (question.type === 'rank') return value.map((v, i) => `${i + 1}. ${v}`).join('\n');
  if (question.type === 'array') return value.join(', ');
  if (question.type === 'single' && question.optionLabels) return `${value}: ${question.optionLabels[value] || value}`;
  if (question.type === 'slider') return `${value} / 10`;
  return String(value);
}

function buildPdf(sub) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  const checkSpace = (needed) => {
    if (y + needed > PAGE_H - MARGIN) {
      doc.addPage();
      doc.setFillColor(...LIGHT_BG);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
      y = MARGIN;
    }
  };

  // Cover Page
  doc.setFillColor(...LIGHT_BG);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
  doc.setFillColor(...OXBLOOD);
  doc.rect(0, 0, 6, PAGE_H, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('OAE DIAGNOSTIC', MARGIN, 32, { charSpace: 1.5 });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...DARK);
  doc.text('Diagnostic Report', MARGIN, 72);

  if (sub.respondent_name) {
    doc.setFontSize(11);
    doc.setTextColor(...MUTED);
    doc.text(sub.respondent_name, MARGIN, 90);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...OXBLOOD);
  doc.text('laurajanethomas', MARGIN, PAGE_H - 28);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('Brand & Strategy Consulting', MARGIN, PAGE_H - 21);

  // Sections
  OAE_SECTIONS.forEach((section) => {
    const questions = OAE_QUESTIONS.filter(q => q.section === section.number);
    const hasAnswers = questions.some(q => {
      const val = sub[q.id];
      return val !== null && val !== undefined && val !== '' && !(Array.isArray(val) && val.length === 0);
    });
    if (!hasAnswers) return;

    doc.addPage();
    doc.setFillColor(...LIGHT_BG);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
    y = MARGIN;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...DARK);
    doc.text(`Section ${section.number} · ${section.title}`, MARGIN, y);
    y += 10;

    doc.setDrawColor(220, 215, 210);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 8;

    questions.forEach((q) => {
      const rawVal = sub[q.id];
      const answer = formatAnswer(q, rawVal);
      if (!answer) return;

      checkSpace(20);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...OXBLOOD);
      const qWrapped = doc.splitTextToSize(`${q.number}: ${q.label}`, CONTENT_W);
      doc.text(qWrapped, MARGIN, y);
      y += qWrapped.length * 5 + 3;

      checkSpace(10);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(60, 50, 44);
      const aWrapped = doc.splitTextToSize(answer, CONTENT_W - 4);
      doc.text(aWrapped, MARGIN + 4, y);
      y += aWrapped.length * 5.5 + 8;
    });

    doc.setDrawColor(220, 215, 210);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, PAGE_H - 14, PAGE_W - MARGIN, PAGE_H - 14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text('laurajanethomas — OAE Diagnostic Report', MARGIN, PAGE_H - 9);
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

    const submissions = await base44.asServiceRole.entities.OAEDiagnosticSubmission.filter({ id: submissionId });
    const sub = submissions[0];
    if (!sub) {
      return Response.json({ error: 'Submission not found' }, { status: 404 });
    }

    const pdfBuffer = buildPdf(sub);
    const pdfBytes = new Uint8Array(pdfBuffer);

    const fileName = sub.respondent_name
      ? `OAE-Diagnostic-${sub.respondent_name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}.pdf`
      : 'OAE-Diagnostic-Report.pdf';

    const file = new File([pdfBytes], fileName, { type: 'application/pdf' });
    const uploadRes = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ success: true, file_url: uploadRes.file_url, fileName });
  } catch (error) {
    console.error('[downloadOAESubmissionPDF] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});