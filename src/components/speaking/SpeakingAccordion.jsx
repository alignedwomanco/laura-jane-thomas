import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const speakingDropdowns = [
  {
    id: "where",
    label: "— WHERE I SPEAK",
    title: "Stages and",
    titleItalic: "audiences.",
    color: "#935170",
    textColor: "rgba(242,235,224,1)",
    body: [
      "The work translates across audiences because the underlying themes are universal.",
    ],
    themes: ["Power.", "Identity.", "Performance.", "Ambition.", "Sustainability."],
    primarySubtitle: "PRIMARY STAGES",
    primaryItems: [
      "Corporate conferences and executive teams.",
      "Leadership development programmes.",
      "Women in business forums.",
      "Entrepreneurship events.",
    ],
    secondarySubtitle: "ALSO AVAILABLE FOR",
    secondaryItems: [
      "Universities and senior school assemblies.",
      "Community platforms aligned with women's growth and leadership.",
    ],
    closingLine: "Each keynote is calibrated to the audience. The integrity does not move.",
  },
  {
    id: "experience",
    label: "— WHAT AUDIENCES EXPERIENCE",
    title: "Four perspectives,",
    titleItalic: "held in one keynote.",
    color: "#F2EBE0",
    textColor: "#1A1A1A",
    body: [
      "Most leadership talks come from one of these places. I have spent fifteen years inside all four.",
    ],
    subtitle: "THE TALKS COMBINE",
    items: [
      "Operator experience from running a multi-seven-figure agency.",
      "Senior strategic insight from advising leadership teams across global organisations.",
      "Behavioural and organisational research on female leadership and high performance.",
      "Lived experience of building it, breaking under it, and rebuilding it.",
    ],
    closingLine: "The language adapts to the room. The integrity does not.",
  },
  {
    id: "travel",
    label: "— TRAVEL & AVAILABILITY",
    title: "Globally",
    titleItalic: "available.",
    color: "#935170",
    textColor: "rgba(242,235,224,1)",
    body: [
      "I hold British and South African passports and am available for engagements across the United Kingdom, Europe, the Middle East, South Africa, and international conferences.",
    ],
    subtitle: "AVAILABLE FORMATS",
    items: [
      "Large-stage keynotes.",
      "Leadership intensives.",
      "Panel discussions.",
      "Senior school assemblies.",
      "Community conversations.",
      "Virtual events.",
    ],
  },
];

export default function SpeakingAccordion() {
  const [expanded, setExpanded] = useState(null);

  const handleCardClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {speakingDropdowns.map((dropdown) => {
        const isExpanded = expanded === dropdown.id;
        const isDark = dropdown.textColor === "rgba(242,235,224,1)";
        const headerTextColor = isDark ? "rgba(242,235,224,1)" : dropdown.textColor;
        const ctaHoverBg = isDark ? "rgba(242,235,224,1)" : dropdown.color;
        const ctaHoverText = isDark ? "#1A1A1A" : "#F2EBE0";

        return (
          <div
            key={dropdown.id}
            style={{
              backgroundColor: dropdown.color,
              borderRadius: "24px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(dropdown.id)}
          >
            {/* Card Header */}
            <div
              style={{
                padding: "24px 64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "100px",
              }}
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
                  {dropdown.label}
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
                  {dropdown.title}{" "}
                  {dropdown.titleItalic && (
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400, textTransform: "none" }}>
                      {dropdown.titleItalic}
                    </span>
                  )}
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
                {/* Body Text */}
                {dropdown.body && (
                  <div style={{ maxWidth: "640px", margin: "0 auto 24px" }}>
                    {dropdown.body.map((para, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: "Inter, system-ui, sans-serif",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          color: dropdown.textColor,
                          opacity: isDark ? 0.78 : 0.7,
                          marginBottom: "12px",
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Themes (Where I Speak only) */}
                {dropdown.themes && (
                  <div style={{ maxWidth: "640px", margin: "0 auto 24px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                    {dropdown.themes.map((theme) => (
                      <span
                        key={theme}
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "18px",
                          fontStyle: "italic",
                          color: headerTextColor,
                        }}
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                )}

                {/* Primary and Secondary Lists (Where I Speak) */}
                {dropdown.primarySubtitle && (
                  <div style={{ maxWidth: "640px", margin: "0 auto" }}>
                    <p
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: "11px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: headerTextColor,
                        marginBottom: "16px",
                      }}
                    >
                      {dropdown.primarySubtitle}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                      {dropdown.primaryItems.map((item, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "14px",
                            lineHeight: "1.6",
                            color: dropdown.textColor,
                            opacity: isDark ? 0.78 : 0.7,
                            margin: "0",
                            display: "flex",
                            gap: "8px",
                            alignItems: "flex-start",
                            justifyContent: "center",
                          }}
                        >
                          <span style={{ flexShrink: 0 }}>●</span>
                          <span>{item}</span>
                        </p>
                      ))}
                    </div>

                    <p
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: "11px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: headerTextColor,
                        marginBottom: "16px",
                      }}
                    >
                      {dropdown.secondarySubtitle}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                      {dropdown.secondaryItems.map((item, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "14px",
                            lineHeight: "1.6",
                            color: dropdown.textColor,
                            opacity: isDark ? 0.78 : 0.7,
                            margin: "0",
                            display: "flex",
                            gap: "8px",
                            alignItems: "flex-start",
                            justifyContent: "center",
                          }}
                        >
                          <span style={{ flexShrink: 0 }}>●</span>
                          <span>{item}</span>
                        </p>
                      ))}
                    </div>

                    {dropdown.closingLine && (
                      <p
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontStyle: "italic",
                          fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                          color: headerTextColor,
                          margin: "0",
                        }}
                      >
                        {dropdown.closingLine}
                      </p>
                    )}
                  </div>
                )}

                {/* Generic Subtitle and Items for other dropdowns */}
                {dropdown.subtitle && !dropdown.primarySubtitle && (
                  <div style={{ maxWidth: "640px", margin: "0 auto" }}>
                    <p
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: "11px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: headerTextColor,
                        marginBottom: "16px",
                      }}
                    >
                      {dropdown.subtitle}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {dropdown.items.map((item, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "14px",
                            lineHeight: "1.6",
                            color: dropdown.textColor,
                            opacity: isDark ? 0.78 : 0.7,
                            margin: "0",
                            display: "flex",
                            gap: "8px",
                            alignItems: "flex-start",
                            justifyContent: "center",
                          }}
                        >
                          <span style={{ flexShrink: 0 }}>●</span>
                          <span>{item}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}