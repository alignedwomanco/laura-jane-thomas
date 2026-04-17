import { jsPDF } from "jspdf";

const OXBLOOD = [107, 15, 15];
const DARK = [20, 20, 20];
const MUTED = [100, 85, 75];
const LIGHT_BG = [250, 248, 245];
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;

function parseReport(content) {
  const lines = content.split("\n");
  const sections = [];
  let current = null;
  for (const raw of lines) {
    const line = raw.trim();
    const headingMatch =
      line.match(/^\*?\*?(\d+)\.\s+(.+?)\*?\*?$/) ||
      line.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      if (current) sections.push(current);
      const title = headingMatch[2] || headingMatch[1];
      current = { title: title.replace(/\*/g, "").trim(), body: [] };
    } else if (current && line) {
      current.body.push(line.replace(/\*\*/g, "").replace(/\*/g, ""));
    }
  }
  if (current) sections.push(current);
  return sections;
}

function splitTextToLines(doc, text, maxWidth) {
  return doc.splitTextToSize(text, maxWidth);
}

export function generateBrandStrategyPDF(report) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 0;

  const addPage = () => {
    doc.addPage();
    y = MARGIN;
  };

  const checkSpace = (needed) => {
    if (y + needed > PAGE_H - MARGIN) addPage();
  };

  // ── Cover Page ──────────────────────────────────────────────────────────────
  // Background
  doc.setFillColor(...LIGHT_BG);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  // Left oxblood bar
  doc.setFillColor(...OXBLOOD);
  doc.rect(0, 0, 6, PAGE_H, "F");

  // Top label
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text("BRAND STRATEGY DIAGNOSTIC", MARGIN, 32, { charSpace: 1.5 });

  // Main title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(...DARK);
  const nameStr = report.firstName ? `${report.firstName}'s` : "Your";
  doc.text(nameStr, MARGIN, 72);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(28);
  doc.text("Brand Strategy Report", MARGIN, 84);

  // Company + date
  if (report.company) {
    doc.setFontSize(11);
    doc.setTextColor(...MUTED);
    doc.text(report.company, MARGIN, 100);
  }
  if (report.submittedAt) {
    const dateStr = new Date(report.submittedAt).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(dateStr, MARGIN, report.company ? 108 : 100);
  }

  // Hairline divider
  doc.setDrawColor(...OXBLOOD);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, 120, PAGE_W - MARGIN, 120);

  // Branding at bottom
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...OXBLOOD);
  doc.text("laurajanethomas", MARGIN, PAGE_H - 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("Award-Winning Brand Strategist", MARGIN, PAGE_H - 21);

  // ── Key Insights Page ───────────────────────────────────────────────────────
  if (report.emailSummary) {
    addPage();

    // Background
    doc.setFillColor(20, 20, 20);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(180, 165, 155);
    doc.text("KEY STRATEGIC INSIGHTS", MARGIN, y + 8, { charSpace: 1.5 });
    y += 20;

    doc.setDrawColor(107, 15, 15);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 10;

    const bullets = report.emailSummary.split("\n").filter(l => l.trim());
    bullets.forEach((line) => {
      const text = line.startsWith("•") ? line : `• ${line}`;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(230, 220, 210);
      const wrapped = splitTextToLines(doc, text, CONTENT_W - 4);
      checkSpace(wrapped.length * 6 + 6);
      doc.text(wrapped, MARGIN, y);
      y += wrapped.length * 6 + 5;
    });
  }

  // ── Report Sections ─────────────────────────────────────────────────────────
  const sections = parseReport(report.generatedReport || "");
  sections.forEach((section, idx) => {
    addPage();
    y = MARGIN;

    // Section background
    doc.setFillColor(...LIGHT_BG);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");

    // Section number badge
    doc.setFillColor(...OXBLOOD);
    doc.rect(MARGIN, y, 8, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(String(idx + 1).padStart(2, "0"), MARGIN + 2.5, y + 5.5);

    // Section title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...DARK);
    doc.text(section.title, MARGIN + 12, y + 6);
    y += 16;

    // Divider
    doc.setDrawColor(220, 215, 210);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 8;

    // Body text
    section.body.forEach((line) => {
      if (!line.trim()) { y += 3; return; }
      const isBullet = line.startsWith("•") || line.startsWith("-") || /^\d+\./.test(line);
      const indent = isBullet ? 5 : 0;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 50, 44);
      const wrapped = splitTextToLines(doc, line, CONTENT_W - indent);
      checkSpace(wrapped.length * 5.5 + 4);
      doc.text(wrapped, MARGIN + indent, y);
      y += wrapped.length * 5.5 + 3;
    });

    // Footer line
    doc.setDrawColor(220, 215, 210);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, PAGE_H - 14, PAGE_W - MARGIN, PAGE_H - 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text("laurajanethomas — Brand Strategy Report", MARGIN, PAGE_H - 9);
    doc.text(`${idx + 1} / ${sections.length}`, PAGE_W - MARGIN, PAGE_H - 9, { align: "right" });
  });

  // ── Save ────────────────────────────────────────────────────────────────────
  const fileName = report.company
    ? `${report.company.replace(/\s+/g, "-")}-Brand-Strategy.pdf`
    : "Brand-Strategy-Report.pdf";
  doc.save(fileName);
}