import { jsPDF } from "jspdf";

const OXBLOOD = [107, 15, 15];
const DARK = [20, 20, 20];
const MUTED = [100, 85, 75];
const LIGHT_BG = [250, 248, 245];
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;

function splitTextToLines(doc, text, maxWidth) {
  return doc.splitTextToSize(text, maxWidth);
}

function addSection(doc, title, content, y) {
  // Section title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...DARK);
  doc.text(title, MARGIN, y);
  y += 8;

  // Divider
  doc.setDrawColor(220, 215, 210);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 6;

  // Content
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(60, 50, 44);

  const wrapped = splitTextToLines(doc, content, CONTENT_W);
  wrapped.forEach((line) => {
    if (y + 5 > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
    doc.text(line, MARGIN, y);
    y += 5;
  });

  return y + 6;
}

export function generateAnswersPDF(report) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

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
    doc.text(report.company, MARGIN, 100);
  }

  // ── Content Pages ───────────────────────────────────────────────────────────
  const sections = [
    { title: "Your Details", data: [
      ["Full Name", report.fullName || "—"],
      ["Position", report.position || "—"],
      ["Company", report.company || "—"],
      ["Email", report.email || "—"],
      ["Phone", report.phone || "—"],
    ]},
    { title: "Business Foundation", data: report.businessFoundation },
    { title: "Operations, Budget & Delivery", data: report.operationsBudget },
    { title: "Current Marketing Assets", data: report.marketingAssets },
    { title: "Audience Insight", data: report.audienceInsight },
    { title: "Positioning & Differentiation", data: report.positioning },
    { title: "Brand Truth", data: report.brandTruth },
    { title: "Brand Essence", data: report.brandEssence },
    { title: "Vision & Growth", data: report.visionGrowth },
    { title: "Legacy & Values", data: report.legacyValues },
  ];

  sections.forEach((section) => {
    doc.addPage();
    y = MARGIN;

    doc.setFillColor(...LIGHT_BG);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");

    // Section title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...DARK);
    doc.text(section.title, MARGIN, y);
    y += 12;

    doc.setDrawColor(220, 215, 210);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 8;

    // Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    if (Array.isArray(section.data)) {
      // Contact details format
      section.data.forEach(([label, value]) => {
        if (y + 10 > PAGE_H - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }
        doc.setTextColor(...MUTED);
        doc.text(label + ":", MARGIN, y);
        doc.setTextColor(...DARK);
        const wrapped = splitTextToLines(doc, String(value), CONTENT_W - 30);
        doc.text(wrapped, MARGIN + 30, y);
        y += wrapped.length * 5 + 3;
      });
    } else if (typeof section.data === "object" && section.data !== null) {
      // Q&A format
      Object.entries(section.data).forEach(([key, value]) => {
        if (y + 20 > PAGE_H - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }
        const text = String(value || "—").trim();
        doc.setTextColor(...DARK);
        const wrapped = splitTextToLines(doc, text, CONTENT_W);
        doc.text(wrapped, MARGIN, y);
        y += wrapped.length * 5 + 6;
      });
    }

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