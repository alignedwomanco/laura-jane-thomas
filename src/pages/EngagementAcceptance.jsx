import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";
const DARK = "#2C2C2C";
const BORDER = "#D6C4B0";

export default function EngagementAcceptance() {
  const [form, setForm] = useState({ full_name: "", company_name: "", registration_number: "", email: "", place_of_acceptance: "" });
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const accepted_at = new Date().toISOString();
    await base44.entities.EngagementAcceptance.create({
      ...form,
      accepted_at,
      status: "accepted",
    });

    const bankingDetails = `Account holder: Miss LJ Thomas\nAccount number: 10012596596\nBank: Investec Bank Limited\nBranch name: Investec Bank Grayston Drive\nSWIFT code: IVESZAJJXXX\nBranch code: 580105`;
    const acceptanceDetails = `Full Name: ${form.full_name}\nBusiness Name: ${form.company_name}\nRegistration Number: ${form.registration_number || "N/A"}\nEmail: ${form.email}\nPlace of Acceptance: ${form.place_of_acceptance || "N/A"}\nTime of Acceptance: ${new Date(accepted_at).toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" })}`;

    // Email to Laura
    await base44.integrations.Core.SendEmail({
      to: "hello@laurajanethomas.biz",
      subject: `New Engagement Acceptance — ${form.full_name} (${form.company_name})`,
      body: `A new engagement has been accepted.\n\n${acceptanceDetails}\n\n---\nOption S: Foundations Strategy\nTotal: R11 000 | Deposit due: R6 600`,
    });

    // Email to client
    await base44.integrations.Core.SendEmail({
      to: form.email,
      from_name: "Laura Jane Thomas",
      subject: "Your Engagement Acceptance — Laura Jane Thomas",
      body: `Dear ${form.full_name},\n\nThank you for accepting the terms of your engagement with Laura Jane Thomas.\n\nYour acceptance has been recorded with the following details:\n\n${acceptanceDetails}\n\nNEXT STEP — DEPOSIT PAYMENT\nPlease proceed with the 60% deposit of R6 600 using the banking details below. Use your brand name as the payment reference.\n\n${bankingDetails}\n\nIf you have any questions, please don't hesitate to reach out.\n\nKind regards,\nLaura Jane Thomas\nlaurajanethomas.biz`,
    });

    setConfirmation({ ...form, accepted_at });
    setSubmitting(false);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString("en-ZA", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      timeZoneName: "short",
    });
  };

  if (confirmation) {
    return (
      <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: DARK }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 40px" }}>
          <Header />
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: DUSTY_ROSE, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, color: BURGUNDY, marginBottom: 12 }}>
              Thank you. Your acceptance has been recorded.
            </h2>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
              <strong style={{ color: DARK }}>{confirmation.full_name}</strong> — {confirmation.company_name}
            </p>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 40 }}>Accepted on {formatDate(confirmation.accepted_at)}</p>

            <div style={{ backgroundColor: "#fff", border: `1px solid ${BORDER}`, padding: "28px 32px", textAlign: "left", borderLeft: `4px solid ${DUSTY_ROSE}` }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: BURGUNDY, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Next Step — Deposit Payment</p>
              <p style={{ fontSize: 14, color: DARK, lineHeight: 1.7, marginBottom: 16 }}>
                Please proceed with the 60% deposit of <strong>R6 600</strong> using the banking details below. Use your brand name as the payment reference.
              </p>
              <table style={{ fontSize: 13, borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  {[
                    ["Account holder", "Miss LJ Thomas"],
                    ["Account number", "10012596596"],
                    ["Bank", "Investec Bank Limited"],
                    ["Branch name", "Investec Bank Grayston Drive"],
                    ["SWIFT code", "IVESZAJJXXX"],
                    ["Branch code", "580105"],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td style={{ padding: "4px 12px 4px 0", color: "#888", whiteSpace: "nowrap" }}>{k}</td>
                      <td style={{ padding: "4px 0", color: DARK, fontWeight: 500 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
              <button
                onClick={() => {
                  const subject = encodeURIComponent("Engagement Acceptance – Laura Jane Thomas");
                  const body = encodeURIComponent(
                    `Dear ${confirmation.full_name},\n\nThank you for accepting the engagement terms.\n\nYour acceptance was recorded on ${formatDate(confirmation.accepted_at)}.\n\nNEXT STEP — DEPOSIT PAYMENT\nPlease proceed with the 60% deposit of R6 600 using the banking details below. Use your brand name as the payment reference.\n\nAccount holder: Miss LJ Thomas\nAccount number: 10012596596\nBank: Investec Bank Limited\nBranch name: Investec Bank Grayston Drive\nSWIFT code: IVESZAJJXXX\nBranch code: 580105\n\nKind regards,\nLaura Jane Thomas\nlaurajanethomas.biz`
                  );
                  window.location.href = `mailto:${confirmation.email}?subject=${subject}&body=${body}`;
                }}
                style={{ backgroundColor: DUSTY_ROSE, color: "#fff", border: "none", padding: "12px 28px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Email to Myself
              </button>
              <button
                onClick={() => window.print()}
                style={{ backgroundColor: "transparent", color: BURGUNDY, border: `1px solid ${BURGUNDY}`, padding: "12px 28px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Print
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: DARK }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 40px" }}>
        <Header />

        {/* Title */}
        <div style={{ borderTop: `2px solid ${BURGUNDY}`, borderBottom: `1px solid ${BORDER}`, padding: "28px 0", marginBottom: 36, textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 10 }}>Engagement Letter</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: BURGUNDY, margin: 0 }}>Gold Strategy</h2>
        </div>

        {/* Scope */}
        <Section title="Scope of Work">
          <ol style={{ paddingLeft: 20, margin: 0, lineHeight: 1.9, fontSize: 14 }}>
            <li><strong>Brand Direction Clarity</strong> — positioning diagnosis</li>
            <li><strong>Core Customer Snapshot</strong> — one focused customer profile</li>
            <li><strong>Competitive Snapshot</strong> — light review of key competitors</li>
            <li><strong>Brand Narrative Essentials</strong> — positioning statement, summary, elevator pitch, tone</li>
            <li><strong>Messaging Direction</strong> — one lead message + three supporting proof points</li>
          </ol>
        </Section>

        {/* Process */}
        <Section title="Process">
          <p style={{ fontSize: 14, lineHeight: 1.8, margin: 0 }}>
            A detailed brand audit will be delivered before strategic work begins. The client is entitled to one (1) round of revisions on the final strategy document.
          </p>
        </Section>

        {/* Investment */}
        <Section title="Investment">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <tbody>
              <InvestmentRow label="Total Investment (excl. VAT)" value="R11 000" />
              <InvestmentRow label="Deposit due on signature (60%)" value="R6 600" highlight />
              <InvestmentRow label="Balance due on delivery of final strategy" value="R4 400" last />
            </tbody>
          </table>
        </Section>

        {/* Banking */}
        <Section title="Banking Details">
          <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
            <tbody>
              {[
                ["Account Holder", "Miss LJ Thomas"],
                ["Bank", "Investec Bank Limited"],
                ["Branch", "Investec Bank Grayston Drive"],
                ["Account Number", "10012596596"],
                ["Branch Code", "580105"],
                ["SWIFT Code", "IVESZAJJXXX"],
                ["Payment Reference", "Use your brand name"],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <td style={{ padding: "8px 0", color: "#777", width: "45%" }}>{k}</td>
                  <td style={{ padding: "8px 0", fontWeight: 500, color: DARK }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Form */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 32, marginTop: 8 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: BURGUNDY, fontWeight: 600, marginBottom: 24 }}>
            Client Acceptance
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gap: 16, marginBottom: 16 }}>
              <Field label="Full Name *" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} required />
              <Field label="Name of Business *" value={form.company_name} onChange={(v) => setForm({ ...form, company_name: v })} required />
              <Field label="Registration Number" value={form.registration_number} onChange={(v) => setForm({ ...form, registration_number: v })} />
              <Field label="Email Address *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <Field label="Place of Acceptance" value={form.place_of_acceptance} onChange={(v) => setForm({ ...form, place_of_acceptance: v })} placeholder="e.g. Johannesburg, South Africa" />
            </div>
            <div style={{ backgroundColor: "rgba(92,31,46,0.04)", border: `1px solid ${BORDER}`, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#777" }}>
              <strong style={{ color: DARK }}>Time of Acceptance</strong> will be automatically recorded at the moment you submit.
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 28, fontSize: 14, lineHeight: 1.6 }}>
              <input
                type="checkbox"
                required
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                style={{ marginTop: 3, accentColor: BURGUNDY, width: 16, height: 16, flexShrink: 0 }}
              />
              <span style={{ color: DARK }}>
                I have read and accept the terms of this engagement as outlined above.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              style={{
                backgroundColor: submitting ? "#999" : BURGUNDY,
                color: "#fff",
                border: "none",
                padding: "14px 40px",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: submitting ? "not-allowed" : "pointer",
                width: "100%",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                transition: "opacity 0.2s",
              }}
            >
              {submitting ? "Submitting…" : "Accept & Confirm"}
            </button>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{ textAlign: "center", marginBottom: 40 }}>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "#5C1F2E", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>
        Laura Jane Thomas
      </h1>
      <p style={{ fontSize: 12, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>
        Brand & Marketing Strategy
      </p>
      <p style={{ fontSize: 12, color: "#C2858B", margin: 0 }}>laurajanethomas.biz</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5C1F2E", fontWeight: 600, marginBottom: 12, borderBottom: "1px solid #D6C4B0", paddingBottom: 6 }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function InvestmentRow({ label, value, highlight, last }) {
  return (
    <tr style={{ borderBottom: last ? "none" : "1px solid #D6C4B0", backgroundColor: highlight ? "rgba(194,133,139,0.08)" : "transparent" }}>
      <td style={{ padding: "10px 0", color: highlight ? "#2C2C2C" : "#555", fontWeight: highlight ? 600 : 400 }}>{label}</td>
      <td style={{ padding: "10px 0", textAlign: "right", fontWeight: 700, color: "#5C1F2E", fontFamily: "Georgia, serif", fontSize: 15 }}>{value}</td>
    </tr>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#777", marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder || ""}
        style={{
          width: "100%",
          padding: "11px 14px",
          border: "1px solid #D6C4B0",
          backgroundColor: "#fff",
          fontSize: 14,
          color: "#2C2C2C",
          outline: "none",
          fontFamily: "'Inter', sans-serif",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function Footer() {
  return (
    <p style={{ textAlign: "center", fontSize: 11, color: "#aaa", borderTop: "1px solid #D6C4B0", marginTop: 48, paddingTop: 20, letterSpacing: "0.05em" }}>
      This document is confidential and intended solely for the named recipient. laurajanethomas.biz
    </p>
  );
}