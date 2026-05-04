import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    label: "SERVICE ONE",
    bg: "#3A0E1A",
    top: 0,
    zIndex: 1,
    titleLines: [
      { text: "FRACTIONAL" },
      { text: "CMO AND" },
      { parts: [{ text: "Brand", italic: true }, { text: " ADVISOR" }] },
    ],
    body: "Senior brand and marketing strategy for businesses that want commercial clarity and elevated brand expression in one partner. Productised 90-day engagements. Built on the Aligned Operating Model.",
    cta: "LEARN MORE",
    href: "/consulting",
  },
  {
    label: "SERVICE TWO",
    bg: "#4A2730",
    top: 64,
    zIndex: 2,
    titleLines: [
      { text: "SENIOR" },
      { text: "ADVISORY AND" },
      { text: "COACHING" },
    ],
    body: "Private advisory engagements for women at the threshold of their next chapter. Whether you're stepping out of corporate, evolving the business you've built, or building the life that finally matches your resources. Built on The A.L.I.V.E. Method.",
    cta: "EXPLORE THE ADVISORY",
    href: "/consulting",
  },
  {
    label: "SERVICE THREE",
    bg: "#0D0508",
    top: 128,
    zIndex: 3,
    titleLines: [
      { text: "SPEAKING AND" },
      { parts: [{ text: "Leadership", italic: true }, { text: " PROGRAMS" }] },
    ],
    body: "Keynotes, half-day workshops, and multi-session leadership programs designed to develop and retain high-performing women. Built on The A.L.I.V.E. Method, at organisational scale.",
    cta: "ENQUIRE SPEAKING",
    href: "/speaking",
  },
];

const cream = "#F2EBE0";

export default function Services() {
  return (
    <div className="relative">
      {services.map((s) => (
        <div
          key={s.label}
          style={{
            backgroundColor: s.bg,
            position: "sticky",
            top: `${s.top}px`,
            zIndex: s.zIndex,
            minHeight: "100vh",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              height: "64px",
              padding: "0 64px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: cream,
                opacity: 0.7,
              }}
            >
              {s.label}
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "880px",
              margin: "0 auto",
              paddingTop: "48px",
              paddingBottom: "96px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            {/* Title */}
            <h2
              style={{
                color: cream,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                marginBottom: "32px",
                fontSize: "clamp(44px, 7vw, 88px)",
              }}
            >
              {s.titleLines.map((line, li) => (
                <span key={li} style={{ display: "block" }}>
                  {line.parts ? (
                    line.parts.map((part, pi) =>
                      part.italic ? (
                        <span
                          key={pi}
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontStyle: "italic",
                            fontWeight: 400,
                            color: cream,
                          }}
                        >
                          {part.text}
                        </span>
                      ) : (
                        <span
                          key={pi}
                          style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontWeight: 800,
                            textTransform: "uppercase",
                          }}
                        >
                          {part.text}
                        </span>
                      )
                    )
                  ) : (
                    <span
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      {line.text}
                    </span>
                  )}
                </span>
              ))}
            </h2>

            {/* Body paragraph */}
            <p
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "14px",
                lineHeight: 1.65,
                maxWidth: "560px",
                color: `rgba(242,235,224,0.78)`,
                marginBottom: "40px",
              }}
            >
              {s.body}
            </p>

            {/* CTA */}
            <Link
              to={s.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                border: `1px solid rgba(242,235,224,0.4)`,
                color: cream,
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
                e.currentTarget.style.background = cream;
                e.currentTarget.style.color = "#1a0508";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = cream;
              }}
            >
              {s.cta} →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}