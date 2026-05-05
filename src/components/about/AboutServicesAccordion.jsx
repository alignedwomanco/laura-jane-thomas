import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const aboutServices = [
  {
    id: "expertise",
    label: "CHAPTER ONE",
    title: "MY EXPERTISE &",
    titleItalic: "Credentials",
    color: "#4A2730",
    textColor: "rgba(242,235,224,1)",
    body: [
      "I have spent fifteen years leading brand strategy, creative direction, and high-level marketing across global organisations and fast-growing start-ups. I founded and ran a multi-seven-figure creative agency. I have sat in the boardrooms where the decisions actually got made, and I have led the senior teams who had to deliver against them. I am a published author, a keynote speaker on female leadership, and the former Chair of the 30 Percent Club, the collective of senior executives advancing women into leadership. The work has been featured in Forbes, TechCrunch, Glamour, Business Day, and The Times. I hold a specialised degree in Brand Communications and I am a Certified Director. I am also internationally accredited by the American Board of NLP as both an NLP Practitioner and a Timeline Therapy Coach. The qualifications support the methodology. They are not the methodology."
    ],
  },
  {
    id: "what-i-do",
    label: "CHAPTER TWO",
    title: "WHAT",
    titleItalic: "I Do",
    color: "#3A0E1A",
    textColor: "rgba(242,235,224,1)",
    body: [
      "Three doors. One conviction underneath.",
      "For Businesses: Fractional CMO and Brand Advisor — Brand, strategy, and creative direction in one senior partner. Built on The Aligned Operating Model.",
      "For Women: Senior Advisory and Coaching — Private engagements for ambitious women building what's next. Built on The A.L.I.V.E. Method.",
      "For Organisations: Speaking and Leadership Programs — Keynotes, workshops, and the Aligned Leader Program. Built on The A.L.I.V.E. Method, at organisational scale."
    ],
  },
  {
    id: "aligned-woman-co",
    label: "CHAPTER THREE",
    title: "THE",
    titleItalic: "Aligned Woman Co.",
    color: "#0D0508",
    textColor: "rgba(242,235,224,1)",
    body: [
      "The Aligned Woman Co. is the platform I built to scale the work to women everywhere. It is where the methodology lives outside the private advisory engagement.",
      "Self-paced courses, masterclasses, and the Aligned Woman Blueprint, the foundational program built on the five stages of The A.L.I.V.E. Method.",
      "The methodology is the same one I use in private practice. The architecture does not soften when it gets bigger."
    ],
    cta: {
      text: "Visit The Aligned Woman Co.",
      href: "https://alignedwomanco.com/blueprint"
    }
  },
];

export default function AboutServicesAccordion() {
  const [expanded, setExpanded] = useState(null);

  const styles = `
    @media (max-width: 768px) {
      .about-accordion-header {
        padding: 20px 16px !important;
      }
      .about-accordion-title {
        font-size: 20px !important;
        line-height: 1.1 !important;
      }
      .about-accordion-label {
        font-size: 9px !important;
      }
      .about-accordion-content {
        padding: 24px 16px 48px !important;
      }
      .about-accordion-body {
        font-size: 13px !important;
      }
    }
  `;

  const handleCardClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <>
      <style>{styles}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "48px 24px" }}>
        {aboutServices.map((service) => {
          const isExpanded = expanded === service.id;
          const isDark = service.textColor === "rgba(242,235,224,1)";
          const headerTextColor = service.textColor;

          return (
            <div
              key={service.id}
              className="about-accordion-card"
              style={{
                backgroundColor: service.color,
                borderRadius: "24px",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => handleCardClick(service.id)}
            >
              {/* Card Header */}
              <div
                className="about-accordion-header"
                style={{
                  padding: "24px 64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: "100px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className="about-accordion-label"
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
                    {service.label}
                  </p>
                  <h3
                    className="about-accordion-title"
                    style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(24px, 5vw, 40px)",
                      lineHeight: "0.95",
                      letterSpacing: "-0.02em",
                      textTransform: "uppercase",
                      color: headerTextColor,
                      margin: "0",
                      wordBreak: "break-word",
                    }}
                  >
                    {service.title}{" "}
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400, textTransform: "none" }}>
                      {service.titleItalic}
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
                <div className="about-accordion-content" style={{ padding: "48px 64px 96px", textAlign: "center" }}>
                  {service.body.map((para, i) => (
                    <p
                      className="about-accordion-body"
                      key={i}
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: "16px",
                        lineHeight: "1.65",
                        maxWidth: "720px",
                        color: headerTextColor,
                        opacity: 0.78,
                        marginBottom: i < service.body.length - 1 ? "16px" : "0",
                        margin: i < service.body.length - 1 ? "0 auto 16px" : "0 auto",
                      }}
                    >
                      {para}
                    </p>
                  ))}
                  
                  {service.cta && (
                    <div style={{ marginTop: "32px" }}>
                      <a
                        href={service.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "12px",
                          border: `1px solid ${headerTextColor}`,
                          color: headerTextColor,
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
                          e.currentTarget.style.background = headerTextColor;
                          e.currentTarget.style.color = service.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = headerTextColor;
                        }}
                      >
                        {service.cta.text} →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}