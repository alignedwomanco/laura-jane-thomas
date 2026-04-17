import React from "react";

const SECTION_COLORS = {
  "Executive Summary": "#FAF0E6",
  "Brand Positioning Analysis": "#F5F1EC",
  "Audience & Market Opportunity": "#F0EDE8",
  "Core Brand Identity & Differentiation": "#EDE8E2",
  "Strategic Gaps & Risks": "#FDF6F0",
  "Growth & Vision Alignment": "#F5F1EC",
  "Recommended Strategic Priorities": "#141414",
};

const ACCENT = "#4A3728";

function parseReport(content) {
  // Split by numbered headings like "1. Executive Summary" or "## Executive Summary"
  const lines = content.split("\n");
  const sections = [];
  let current = null;

  for (const raw of lines) {
    const line = raw.trim();

    // Match "1. Title" or "## Title" or "**1. Title**"
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

export default function ReportContent({ content }) {
  const sections = parseReport(content);

  if (sections.length === 0) {
    // Fallback: render as plain paragraphs
    return (
      <div className="space-y-4">
        {content.split("\n").filter(l => l.trim()).map((line, i) => (
          <p key={i} className="text-[#141414]/70 text-sm font-sans leading-relaxed">
            {line.replace(/\*\*/g, "").replace(/\*/g, "")}
          </p>
        ))}
      </div>
    );
  }

  const isPriorities = (title) =>
    title.toLowerCase().includes("priorities") || title.toLowerCase().includes("recommended");

  return (
    <div className="space-y-6 print:space-y-4">
      {sections.map((section, idx) => {
        const dark = isPriorities(section.title);
        const bg = SECTION_COLORS[section.title] || (idx % 2 === 0 ? "#FAF8F5" : "#F5F1EC");

        return (
          <div
            key={idx}
            className="p-8 md:p-10 print:p-6"
            style={{ 
              backgroundColor: dark ? "#141414" : bg,
              pageBreakInside: "avoid",
              breakInside: "avoid",
            }}
            data-report-section
          >
            <div className="flex items-start gap-5 mb-6 print:mb-3 print:gap-3">
              <span
                className="text-[10px] tracking-editorial uppercase font-sans mt-1 shrink-0 print:text-[9px]"
                style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(20,20,20,0.35)" }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-serif leading-tight print:text-sm"
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                  color: dark ? "white" : "#141414",
                  pageBreakAfter: "avoid",
                }}
              >
                {section.title}
              </h3>
            </div>

            <div className="pl-9 space-y-3 print:space-y-2 print:pl-7">
              {section.body.map((line, i) => {
                const isBullet = line.startsWith("•") || line.startsWith("-") || line.match(/^\d+\./);
                return (
                  <p
                    key={i}
                    className="text-sm font-sans leading-relaxed print:text-xs print:leading-snug"
                    style={{ 
                      color: dark ? "rgba(255,255,255,0.70)" : "rgba(20,20,20,0.65)",
                      pageBreakInside: "avoid",
                    }}
                  >
                    {isBullet ? line : line}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}