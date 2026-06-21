import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

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
  const [engagement, setEngagement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdminPreview, setIsAdminPreview] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adminEmail = urlParams.get("adminEmail");

    base44.auth.isAuthenticated().then(async (isAuth) => {
      if (!isAuth) {
        setLoading(false);
        return;
      }
      const me = await base44.auth.me();
      const lookupEmail = (adminEmail && me.role === "admin") ? adminEmail : me.email;
      if (adminEmail && me.role === "admin") setIsAdminPreview(true);

      const engs = await base44.entities.ClientEngagement.filter({ client_email: lookupEmail });
      if (engs.length > 0) {
        const sorted = engs.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        const eng = sorted[0];
        setEngagement(eng);
        setForm(f => ({
          ...f,
          full_name: eng.client_name ? eng.client_name.trim() : "",
          company_name: eng.company_name ? eng.company_name.trim() : "",
          email: lookupEmail,
        }));
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const accepted_at = new Date().toISOString();

    await base44.entities.EngagementAcceptance.create({
      ...form,
      accepted_at,
      status: "accepted",
    });

    // Generate invoice
    const existingInvoices = await base44.entities.Invoice.list();
    const seq = String(existingInvoices.length + 1).padStart(3, "0");
    const invoice_number = `INV-${new Date().getFullYear()}-${seq}`;
    const invoice = await base44.entities.Invoice.create({
      invoice_number,
      client_name: form.full_name,
      company_name: form.company_name,
      registration_number: form.registration_number || "",
      email: form.email,
      package_title: engagement?.package_title || "Engagement",
      subtotal: "R78 000",
      vat: "R11 700",
      total: "R89 700",
      issued_at: accepted_at,
      status: "issued",
    });

    const bankingDetails = `Account holder: Miss LJ Thomas\nAccount number: 10012596596\nBank: Investec Bank Limited\nBranch name: Investec Bank Grayston Drive\nSWIFT code: IVESZAJJXXX\nBranch code: 580105`;
    const acceptanceDetails = `Full Name: ${form.full_name}\nBusiness Name: ${form.company_name}\nRegistration Number: ${form.registration_number || "N/A"}\nEmail: ${form.email}\nPlace of Acceptance: ${form.place_of_acceptance || "N/A"}\nTime of Acceptance: ${new Date(accepted_at).toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" })}`;

    const pkgTitle = engagement?.package_title || "Engagement";
    const total = engagement?.total_investment || "—";
    const deposit = engagement?.deposit_amount || "—";

    // Email to Laura
    await base44.integrations.Core.SendEmail({
      to: "hello@laurajanethomas.biz",
      subject: `New Engagement Acceptance — ${form.full_name} (${form.company_name})`,
      body: `A new engagement has been accepted.\n\n${acceptanceDetails}\n\n---\n${pkgTitle}\nTotal: ${total} | Deposit due: ${deposit}\n\nInvoice ${invoice_number} has been generated.\nSubtotal: R78 000 + VAT\nTotal: R89 700`,
    });

    // Email to client
    await base44.integrations.Core.SendEmail({
      to: form.email,
      from_name: "Laura Jane Thomas",
      subject: "Your Engagement Acceptance — Laura Jane Thomas",
      body: `Dear ${form.full_name},\n\nThank you for accepting the terms of your engagement with Laura Jane Thomas.\n\nYour acceptance has been recorded with the following details:\n\n${acceptanceDetails}\n\nINVOICE ${invoice_number}\nSubtotal: R78 000 + VAT\nTotal: R89 700\n\nNEXT STEP — DEPOSIT PAYMENT\nPlease proceed with the deposit of ${deposit} using the banking details below. Use your brand name as the payment reference.\n\n${bankingDetails}\n\nIf you have any questions, please don't hesitate to reach out.\n\nKind regards,\nLaura Jane Thomas\nlaurajanethomas.biz`,
    });

    setConfirmation({ ...form, accepted_at, invoice });
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

  const downloadInvoice = (inv) => {
    if (!inv) return;
    const doc = new jsPDF();
    const left = 40;
    let y = 50;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(92, 31, 46);
    doc.text("Laura Jane Thomas", left, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("Brand & Marketing Strategy", left, y + 8);
    doc.text("laurajanethomas.biz", left, y + 14);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(92, 31, 46);
    doc.text("INVOICE", 160, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(44, 44, 44);
    doc.text(inv.invoice_number, 160, y + 8);
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Issued: ${formatDate(inv.issued_at)}`, 160, y + 14);

    y += 40;
    doc.setDrawColor(214, 196, 176);
    doc.line(left, y, 170, y);
    y += 14;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("BILL TO", left, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(44, 44, 44);
    doc.text(inv.client_name, left, y); y += 6;
    doc.text(inv.company_name, left, y); y += 6;
    if (inv.registration_number) { doc.text(`Reg: ${inv.registration_number}`, left, y); y += 6; }
    doc.text(inv.email, left, y);

    y += 16;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("DESCRIPTION", left, y);
    doc.text("AMOUNT", 150, y);
    y += 4;
    doc.line(left, y, 170, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(44, 44, 44);
    doc.text(inv.package_title || "Engagement", left, y);
    doc.text("R78 000", 150, y);
    y += 10;
    doc.text("VAT (15%)", left, y);
    doc.text("R11 700", 150, y);
    y += 6;
    doc.line(left, y, 170, y);
    y += 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(92, 31, 46);
    doc.text("TOTAL", left, y);
    doc.text("R89 700", 150, y);

    y += 30;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("Banking Details", left, y); y += 6;
    doc.text("Account holder: Miss LJ Thomas", left, y); y += 5;
    doc.text("Bank: Investec Bank Limited", left, y); y += 5;
    doc.text("Account number: 10012596596", left, y); y += 5;
    doc.text("Branch code: 580105  |  SWIFT: IVESZAJJXXX", left, y);

    doc.save(`${inv.invoice_number}.pdf`);
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: CREAM, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${BORDER}`, borderTopColor: BURGUNDY, animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (confirmation) {
    const deposit = engagement?.deposit_amount || "R6 600";
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

            {confirmation.invoice && (
              <div style={{ backgroundColor: "#fff", border: `1px solid ${BORDER}`, padding: "28px 32px", textAlign: "left", marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20, borderBottom: `1px solid ${BORDER}`, paddingBottom: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Invoice</p>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: DARK, margin: 0 }}>{confirmation.invoice.invoice_number}</p>
                </div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 20, lineHeight: 1.7 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: DARK }}>{confirmation.invoice.client_name}</p>
                  <p style={{ margin: 0 }}>{confirmation.invoice.company_name}</p>
                  {confirmation.invoice.registration_number && <p style={{ margin: 0 }}>Reg: {confirmation.invoice.registration_number}</p>}
                  <p style={{ margin: 0 }}>{confirmation.invoice.email}</p>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <td style={{ padding: "10px 0", color: "#666" }}>Subtotal</td>
                      <td style={{ padding: "10px 0", textAlign: "right", color: DARK }}>R78 000 + VAT</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <td style={{ padding: "10px 0", color: "#666" }}>VAT (15%)</td>
                      <td style={{ padding: "10px 0", textAlign: "right", color: DARK }}>R11 700</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "14px 0 4px", fontWeight: 700, color: BURGUNDY, fontFamily: "Georgia, serif", fontSize: 16 }}>Total</td>
                      <td style={{ padding: "14px 0 4px", textAlign: "right", fontWeight: 700, color: BURGUNDY, fontFamily: "Georgia, serif", fontSize: 18 }}>R89 700</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ backgroundColor: "#fff", border: `1px solid ${BORDER}`, padding: "28px 32px", textAlign: "left", borderLeft: `4px solid ${DUSTY_ROSE}` }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: BURGUNDY, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Next Step — Deposit Payment</p>
              <p style={{ fontSize: 14, color: DARK, lineHeight: 1.7, marginBottom: 16 }}>
                Please proceed with the deposit of <strong>{deposit}</strong> using the banking details below. Use your brand name as the payment reference.
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
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
              {confirmation.invoice && (
                <button
                  onClick={() => downloadInvoice(confirmation.invoice)}
                  style={{ backgroundColor: BURGUNDY, color: "#fff", border: "none", padding: "12px 28px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  Download Invoice
                </button>
              )}
              <button
                onClick={() => {
                  const subject = encodeURIComponent("Engagement Acceptance – Laura Jane Thomas");
                  const body = encodeURIComponent(
                    `Dear ${confirmation.full_name},\n\nThank you for accepting the engagement terms.\n\nYour acceptance was recorded on ${formatDate(confirmation.accepted_at)}.\n\nNEXT STEP — DEPOSIT PAYMENT\nPlease proceed with the deposit of ${deposit} using the banking details below. Use your brand name as the payment reference.\n\nAccount holder: Miss LJ Thomas\nAccount number: 10012596596\nBank: Investec Bank Limited\nBranch name: Investec Bank Grayston Drive\nSWIFT code: IVESZAJJXXX\nBranch code: 580105\n\nKind regards,\nLaura Jane Thomas\nlaurajanethomas.biz`
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

  if (!engagement) {
    return (
      <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: DARK }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 40px" }}>
          <Header />
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: BURGUNDY, marginBottom: 12 }}>No engagement agreement found</h2>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 28, maxWidth: 440, margin: "0 auto" }}>
              We couldn't find an engagement agreement linked to your account. If you believe this is an error, please contact Laura directly.
            </p>
            <a href="mailto:hello@laurajanethomas.biz" style={{ fontSize: 12, color: BURGUNDY, textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", borderBottom: `1px solid ${BURGUNDY}`, paddingBottom: 2, fontWeight: 600 }}>
              hello@laurajanethomas.biz
            </a>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const pkgTitle = engagement.package_title || "Engagement Letter";
  const scopeItems = engagement.scope_items || [];
  const processNotes = engagement.process_notes || "";
  const clauses = parseClauses(processNotes);

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: DARK }}>
      {isAdminPreview && (
        <div style={{ backgroundColor: BURGUNDY, color: "#fff", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
            Admin Preview — {new URLSearchParams(window.location.search).get("adminEmail")}
          </p>
          <Link to="/dashboard" style={{ fontSize: 10, color: "rgba(245,237,224,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid rgba(245,237,224,0.4)" }}>← Back to Dashboard</Link>
        </div>
      )}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 40px" }}>
        <Header />

        {/* Title */}
        <div style={{ borderTop: `2px solid ${BURGUNDY}`, borderBottom: `1px solid ${BORDER}`, padding: "28px 0", marginBottom: 36, textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 10 }}>Engagement Letter</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: BURGUNDY, margin: 0 }}>{pkgTitle}</h2>
          <p style={{ fontSize: 12, color: "#888", marginTop: 10, fontStyle: "italic" }}>
            Prepared for {engagement.client_name ? engagement.client_name.trim() : ""}{engagement.company_name ? `, ${engagement.company_name.trim()}` : ""}
          </p>
        </div>

        {/* Scope */}
        {scopeItems.length > 0 && (
          <Section title="Scope of Work">
            <div>
              {scopeItems.map((item, i) => {
                const isPhase = /^Phase\s+\d/i.test(item);
                if (isPhase) {
                  return (
                    <p key={i} style={{ fontWeight: 600, color: BURGUNDY, marginTop: i > 0 ? 24 : 0, marginBottom: 10, fontFamily: "Georgia, serif", fontSize: 15 }}>
                      {item}
                    </p>
                  );
                }
                return (
                  <p key={i} style={{ marginBottom: 10, paddingLeft: 14, borderLeft: `2px solid ${BORDER}`, fontSize: 14, lineHeight: 1.7, color: "#444" }}>
                    {item}
                  </p>
                );
              })}
            </div>
          </Section>
        )}

        {/* Agreement Terms */}
        {clauses.length > 0 && (
          <Section title="Agreement Terms">
            <div style={{ fontSize: 13, lineHeight: 1.8, color: "#444" }}>
              {clauses.map((c, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 600, color: DARK, margin: "0 0 4px" }}>{c.title}</p>
                  <p style={{ margin: 0 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Investment */}
        <Section title="Investment">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <tbody>
              <InvestmentRow label="Total Investment" value={engagement.total_investment || "—"} />
              <InvestmentRow label={`Deposit due on signature${engagement.deposit_percent ? ` (${engagement.deposit_percent})` : ""}`} value={engagement.deposit_amount || "—"} highlight />
              <InvestmentRow label="Balance due on delivery" value={engagement.balance_amount || "—"} last />
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

function parseClauses(text) {
  if (!text) return [];
  const lines = text.split("\n");
  const clauses = [];
  let current = null;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (match) {
      if (current) clauses.push(current);
      current = { title: `${match[1]}. ${match[2]}`, body: "" };
    } else if (current) {
      current.body = current.body ? `${current.body} ${trimmed}` : trimmed;
    }
  }
  if (current) clauses.push(current);
  return clauses;
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