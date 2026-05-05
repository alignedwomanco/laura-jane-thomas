import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const offerings = [
  {
    id: "audit",
    label: "The Alignment Audit",
    title: "The Alignment",
    titleItalic: "Audit",
    color: "#935170",
    textColor: "rgba(242,235,224,1)",
    subtitle: "You do not need another program. You need to see what is actually going on.",
    body: [
      "A 60-minute structured diagnostic session for the woman who needs to know exactly what is costing her, before she decides what to do about it.",
      "Most women at this threshold do not need more inspiration. They need a senior set of eyes on the actual situation, named clearly and held without judgement. The Alignment Audit is the lowest-commitment way to start.",
    ],
    includedItems: [
      "A pre-audit intake so we are in the diagnostic from the first minute, not the fifteenth.",
      "A 60-minute audit session, structured and direct.",
      "A written Alignment Diagnostic delivered within 72 hours, capturing what is actually happening and what the next move is.",
      "A Senior Advisory path-forward conversation, so you leave knowing whether the deeper work is right for you.",
    ],
    closingLine: "This is the diagnostic that decides whether the rest of the work is for you. It is also a complete piece of work in itself.",
    ctaText: "Book Your Alignment Audit",
    ctaBg: "#4A2730",
  },
  {
    id: "intensive",
    label: "The Recalibration Intensive",
    title: "The Recalibration",
    titleItalic: "Intensive",
    color: "#F2EBE0",
    textColor: "#000",
    subtitle: "Some decisions are too important to figure out slowly.",
    body: [
      "A private one-day intensive for the woman who already knows what is not working, and needs to make her next move with senior strategic clarity rather than another six months of trying to figure it out alone.",
      "This is the offering for the threshold moment. The decision about whether to leave. The decision about what to build. The decision about which version of the next chapter is the one to commit to. Held in one structured day, with the senior strategic and embodied work running in the same conversation.",
    ],
    includedItems: [
      "A pre-intensive intake so the day opens at depth, not at introductions.",
      "A full day of private strategic work, structured around the specific decision or threshold you are sitting in.",
      "A written Recalibration Map delivered within five days, capturing the decision architecture, the priorities, and the next 90 days of action.",
      "A 30-day strategic check-in, so the work holds when you are back in your life.",
    ],
    closingLine: "The Recalibration Intensive is for the woman who is ready to move. Not ready to commit to a 90-day engagement. Ready to make the next decision properly.",
    ctaText: "Book Your Recalibration Intensive",
    ctaBg: "#333",
  },
  {
    id: "advisory",
    label: "The Senior Advisory",
    title: "The Senior",
    titleItalic: "Advisory",
    color: "#935170",
    textColor: "rgba(242,235,224,1)",
    subtitle: "For the woman ready to build the next chapter properly, not piece by piece.",
    body: [
      "A 90-day private engagement for ambitious women building what is next. Whether that is leaving corporate, evolving the business you have built, or building the life your higher self would be proud of.",
      "This is the work that sits underneath the next decade of your life. The senior advisory you have never given yourself. We hold the structural work and the embodied work in the same conversation, and we build the architecture for what comes next on a foundation that is honest about what you actually want.",
    ],
    includedItems: [
      "A senior diagnostic intake and a written Misalignment Diagnostic, so the engagement opens at depth.",
      "Six 60-minute strategic sessions over 90 days, structured around the specific architecture of what you are building.",
      "A 90-Day Priority Structure that integrates business, capacity, and life into one operating system.",
      "A Renegotiated Standards Document, capturing the actual non-negotiables of who you are now.",
      "A System Renegotiation Session, for the conversations with the people in your life that have to happen as you become the woman who can hold this.",
      "Strategic async support throughout, so you are never building alone in the in-between weeks.",
      "A Forward Roadmap Session at the close, so the work continues when the engagement ends.",
    ],
    bonuses: [
      "A pre-engagement strategy briefing in the week before we start.",
      "Three Aligned Woman Blueprint seats inside The Aligned Woman Co., to share with the women in your life.",
      "A Quarterly Roundtable invitation, for ongoing connection with women doing this work at the same altitude.",
      "A 12-month strategic check-in.",
    ],
    closingLine: "The Senior Advisory runs with a small number of women per quarter, by design. Privacy is assumed. The work is direct, structured, and built to last.",
    ctaText: "Apply For The Senior Advisory",
    ctaBg: "#935170",
  },
];

export default function OfferingsAccordion() {
  const [expanded, setExpanded] = useState(null);

  const handleCardClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: "48px", paddingBottom: "96px" }}>
      <div style={{ marginBottom: "48px", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3rem, 6vw, 6rem)",
            lineHeight: "0.95",
            letterSpacing: "-0.02em",
            color: "#1A1A1A",
            margin: "0",
          }}
        >
          Offerings
        </h2>
      </div>
      {offerings.map((offering) => {
        const isExpanded = expanded === offering.id;
        const isDark = offering.textColor === "rgba(242,235,224,1)";
        const headerTextColor = isDark ? "rgba(242,235,224,1)" : offering.textColor;
        const ctaBorderColor = isDark ? "rgba(242,235,224,0.4)" : offering.ctaBg;
        const ctaHoverBg = isDark ? "rgba(242,235,224,1)" : offering.ctaBg;
        const ctaHoverText = isDark ? "#0D0508" : "#F2EBE0";

        return (
          <div
            key={offering.id}
            className="offerings-card"
            style={{
              backgroundColor: offering.color,
              borderRadius: "24px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(offering.id)}
          >
            {/* Card Header */}
            <div
              style={{
                padding: "24px 64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "100px",
                "@media (max-width: 860px)": {
                  padding: "24px",
                },
              }}
              className="@media (max-width: 860px) {padding: 24px}"
            >
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "11px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: headerTextColor,
                    margin: "0 0 12px 0",
                  }}
                >
                  {offering.label}
                </p>
                <h3
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(24px, 5vw, 40px)",
                    lineHeight: "0.95",
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    color: headerTextColor,
                    margin: "0",
                  }}
                >
                  {offering.title}{" "}
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400, textTransform: "none" }}>
                    {offering.titleItalic}
                  </span>
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginLeft: "24px", flexShrink: 0 }}>
                <p
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: headerTextColor,
                    opacity: 0.7,
                    margin: "0",
                    textAlign: "center",
                  }}
                >
                  {isExpanded ? "Click to close" : "More info"}
                </p>
                <ChevronDown
                  className="offerings-arrow"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: headerTextColor,
                    opacity: 0.7,
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 300ms ease",
                  }}
                />
              </div>
            </div>

            {/* Card Content */}
            <div
              style={{
                maxHeight: isExpanded ? "2000px" : "0",
                opacity: isExpanded ? "1" : "0",
                overflow: "hidden",
                transition: "max-height 400ms cubic-bezier(0.2, 0.6, 0.2, 1), opacity 300ms ease",
              }}
            >
              <div style={{ padding: "48px 64px 96px", textAlign: "center" }}>
                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 1.6vw, 1.35rem)",
                    lineHeight: "1.1",
                    maxWidth: "640px",
                    margin: "0 auto 24px",
                    color: offering.textColor,
                  }}
                >
                  {offering.subtitle}
                </p>

                {/* Body Paragraphs */}
                <div style={{ maxWidth: "640px", margin: "0 auto 24px" }}>
                  {offering.body.map((para, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        color: offering.textColor,
                        opacity: isDark ? 0.78 : 0.7,
                        marginBottom: i < offering.body.length - 1 ? "12px" : "0",
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* What's Included */}
                <div style={{ maxWidth: "640px", margin: "24px auto 24px", backgroundColor: offering.id === "intensive" ? "#935170" : "#F2EBE0", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: "11px",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: offering.id === "intensive" ? "rgba(242,235,224,1)" : "#1A1A1A",
                      opacity: 1,
                      margin: "0 0 16px 0",
                    }}
                  >
                    What's Included
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    {offering.includedItems.map((item, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: "Inter, system-ui, sans-serif",
                          fontSize: "14px",
                          lineHeight: "1.85",
                          color: offering.id === "intensive" ? "rgba(242,235,224,0.85)" : "#1A1A1A",
                          opacity: 1,
                          margin: "0",
                          display: "flex",
                          gap: "8px",
                          alignItems: "flex-start",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ marginTop: "2px", flexShrink: 0 }}>✓</span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bonuses (Senior Advisory only) */}
                {offering.bonuses && (
                  <div style={{ maxWidth: "640px", margin: "24px auto 24px", backgroundColor: "#F2EBE0", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: "11px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "#1A1A1A",
                        opacity: 1,
                        margin: "0 0 16px 0",
                      }}
                    >
                      Included Bonuses
                    </p>
                    <div>
                      {offering.bonuses.map((bonus, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "14px",
                            lineHeight: "1.85",
                            color: "#1A1A1A",
                            opacity: 0.7,
                            marginBottom: i < offering.bonuses.length - 1 ? "8px" : "0",
                            textAlign: "left",
                          }}
                        >
                          {bonus}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Closing Line */}
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                    color: offering.textColor,
                    maxWidth: "640px",
                    margin: "0 auto 28px",
                  }}
                >
                  {offering.closingLine}
                </p>

                {/* CTA */}
                <Link
                  to="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    border: `1px solid ${ctaBorderColor}`,
                    color: offering.textColor,
                    background: "transparent",
                    padding: "14px 28px",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "background 200ms cubic-bezier(0.2,0.6,0.2,1), color 200ms cubic-bezier(0.2,0.6,0.2,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = ctaHoverBg;
                    e.currentTarget.style.color = ctaHoverText;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = offering.textColor;
                  }}
                >
                  {offering.ctaText} <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}