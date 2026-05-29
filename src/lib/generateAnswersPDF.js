import { jsPDF } from "jspdf";

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

function splitTextToLines(doc, text, maxWidth) {
  return doc.splitTextToSize(text, maxWidth);
}

export function generateAnswersPDF(report) {
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

  // ── Cover Page ──────────────────────────────────────────────────────────────
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

  // ── Your Details Page ───────────────────────────────────────────────────────
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
    const wrapped = splitTextToLines(doc, String(value), CONTENT_W);
    doc.text(wrapped, MARGIN, y);
    y += wrapped.length * 5.5 + 5;
  });

  // ── Q&A Sections ────────────────────────────────────────────────────────────
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

    // Section title
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

      // Question
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(...OXBLOOD);
      const qWrapped = splitTextToLines(doc, `Q: ${question}`, CONTENT_W);
      doc.text(qWrapped, MARGIN, y);
      y += qWrapped.length * 5 + 3;

      checkSpace(10);

      // Answer
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 50, 44);
      const aWrapped = splitTextToLines(doc, answer, CONTENT_W - 4);
      doc.text(aWrapped, MARGIN + 4, y);
      y += aWrapped.length * 5.5 + 8;
    });

    // Footer
    doc.setDrawColor(220, 215, 210);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, PAGE_H - 14, PAGE_W - MARGIN, PAGE_H - 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text("laurajanethomas — Questionnaire Answers", MARGIN, PAGE_H - 9);
  });

  // ── Save ────────────────────────────────────────────────────────────────────
  const fileName = report.company
    ? `${report.company.replace(/\s+/g, "-")}-Answers.pdf`
    : "Questionnaire-Answers.pdf";
  doc.save(fileName);
}