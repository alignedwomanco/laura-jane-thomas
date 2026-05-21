import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";
const DARK = "#2C2C2C";
const BORDER = "#D6C4B0";

const PACKAGE_TEMPLATES = {
  "Option S: Foundations Strategy": {
    package_title: "Option S: Foundations Strategy",
    scope_items: [
      "Brand Direction Clarity — positioning diagnosis",
      "Core Customer Snapshot — one focused customer profile",
      "Competitive Snapshot — light review of key competitors",
      "Brand Narrative Essentials — positioning statement, summary, elevator pitch, tone",
      "Messaging Direction — one lead message + three supporting proof points",
    ],
    total_investment: "R11 000",
    deposit_amount: "R6 600",
    balance_amount: "R4 400",
    deposit_percent: "60%",
    process_notes: "A detailed brand audit will be delivered before strategic work begins. The client is entitled to one (1) round of revisions on the final strategy document.",
  },
  "The Clarity Sprint": {
    package_title: "The Clarity Sprint",
    scope_items: [
      "Four-week intensive coaching engagement",
      "Weekly 1:1 strategy sessions",
      "The A.L.I.V.E. Method framework",
      "Personal brand positioning",
      "Actionable 90-day growth plan",
    ],
    total_investment: "R18 000",
    deposit_amount: "R9 000",
    balance_amount: "R9 000",
    deposit_percent: "50%",
    process_notes: "",
  },
  "Custom": {
    package_title: "",
    scope_items: [""],
    total_investment: "",
    deposit_amount: "",
    balance_amount: "",
    deposit_percent: "60%",
    process_notes: "",
  },
};

export default function NewClientEngagementModal({ onClose, onCreated }) {
  const [step, setStep] = useState(1); // 1 = client details, 2 = package, 3 = review & send
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [createdId, setCreatedId] = useState(null);
  const [done, setDone] = useState(false);

  const [client, setClient] = useState({ name: "", email: "", company: "" });
  const [selectedTemplate, setSelectedTemplate] = useState("Option S: Foundations Strategy");
  const [pkg, setPkg] = useState({ ...PACKAGE_TEMPLATES["Option S: Foundations Strategy"] });
  const [includeQuestionnaire, setIncludeQuestionnaire] = useState(true);
  const [notes, setNotes] = useState("");

  const selectTemplate = (t) => {
    setSelectedTemplate(t);
    setPkg({ ...PACKAGE_TEMPLATES[t] });
  };

  const updateScopeItem = (i, val) => {
    const updated = [...pkg.scope_items];
    updated[i] = val;
    setPkg({ ...pkg, scope_items: updated });
  };

  const addScopeItem = () => setPkg({ ...pkg, scope_items: [...pkg.scope_items, ""] });
  const removeScopeItem = (i) => setPkg({ ...pkg, scope_items: pkg.scope_items.filter((_, idx) => idx !== i) });

  const handleSave = async () => {
    setSaving(true);
    const record = {
      client_name: client.name,
      client_email: client.email,
      company_name: client.company,
      package_template: selectedTemplate,
      package_title: pkg.package_title,
      scope_items: pkg.scope_items.filter(s => s.trim()),
      total_investment: pkg.total_investment,
      deposit_amount: pkg.deposit_amount,
      balance_amount: pkg.balance_amount,
      deposit_percent: pkg.deposit_percent,
      process_notes: pkg.process_notes,
      include_questionnaire: includeQuestionnaire,
      notes,
      status: "draft",
      invite_sent: false,
    };
    const saved = await base44.entities.ClientEngagement.create(record);
    setCreatedId(saved.id);
    setSaving(false);
    setStep(3);
  };

  const handleSendInvite = async () => {
    setSending(true);
    await base44.functions.invoke("sendClientInvite", { engagementId: createdId });
    setSending(false);
    setDone(true);
    onCreated && onCreated();
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", border: `1px solid ${BORDER}`,
    backgroundColor: "#fff", fontSize: 13, color: DARK, outline: "none",
    fontFamily: "'Inter',sans-serif", boxSizing: "border-box",
  };
  const labelStyle = { display: "block", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(44,44,44,0.5)", marginBottom: 5, fontFamily: "'Inter',sans-serif" };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", overflowY: "auto" }}>
      <div style={{ backgroundColor: CREAM, width: "100%", maxWidth: 640, fontFamily: "'Inter',sans-serif", color: DARK, position: "relative" }}>
        
        {/* Modal header */}
        <div style={{ padding: "24px 32px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 4 }}>New Client Engagement</p>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, color: BURGUNDY, margin: 0 }}>
              {step === 1 ? "Client Details" : step === 2 ? "Package & Scope" : "Review & Send"}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: "rgba(44,44,44,0.4)", cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>

        {/* Step indicators */}
        <div style={{ padding: "16px 32px", borderBottom: `1px solid ${BORDER}`, display: "flex", gap: 0 }}>
          {["Client", "Package", "Send"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
                backgroundColor: step > i + 1 ? BURGUNDY : step === i + 1 ? BURGUNDY : BORDER,
                color: step >= i + 1 ? "#fff" : DARK,
              }}>{i + 1}</div>
              <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: step === i + 1 ? BURGUNDY : "rgba(44,44,44,0.4)", fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
              {i < 2 && <div style={{ width: 32, height: 1, backgroundColor: BORDER, margin: "0 8px" }} />}
            </div>
          ))}
        </div>

        <div style={{ padding: "32px" }}>

          {/* ── Step 1: Client Details ── */}
          {step === 1 && (
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={labelStyle}>Client Full Name *</label>
                <input style={inputStyle} value={client.name} onChange={e => setClient({ ...client, name: e.target.value })} placeholder="e.g. Jane Smith" />
              </div>
              <div>
                <label style={labelStyle}>Client Email *</label>
                <input style={inputStyle} type="email" value={client.email} onChange={e => setClient({ ...client, email: e.target.value })} placeholder="jane@company.com" />
              </div>
              <div>
                <label style={labelStyle}>Company / Brand Name *</label>
                <input style={inputStyle} value={client.company} onChange={e => setClient({ ...client, company: e.target.value })} placeholder="e.g. Ooze Studio" />
              </div>
              <div>
                <label style={labelStyle}>Internal Notes (not sent to client)</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 72 }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any internal context..." />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
                <button
                  onClick={() => setStep(2)}
                  disabled={!client.name || !client.email || !client.company}
                  style={{ backgroundColor: client.name && client.email && client.company ? BURGUNDY : BORDER, color: "#fff", border: "none", padding: "12px 32px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}
                >
                  Next: Package →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Package ── */}
          {step === 2 && (
            <div>
              {/* Template picker */}
              <label style={labelStyle}>Select a Template</label>
              <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
                {Object.keys(PACKAGE_TEMPLATES).map(t => (
                  <button
                    key={t}
                    onClick={() => selectTemplate(t)}
                    style={{
                      textAlign: "left", padding: "12px 16px", border: `1px solid ${selectedTemplate === t ? BURGUNDY : BORDER}`,
                      backgroundColor: selectedTemplate === t ? "rgba(92,31,46,0.05)" : "#fff",
                      color: DARK, cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 13,
                      fontWeight: selectedTemplate === t ? 600 : 400,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Editable package fields */}
              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Package Title</label>
                  <input style={inputStyle} value={pkg.package_title} onChange={e => setPkg({ ...pkg, package_title: e.target.value })} />
                </div>

                <div>
                  <label style={labelStyle}>Scope / Deliverables</label>
                  {pkg.scope_items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <input style={{ ...inputStyle, flex: 1 }} value={item} onChange={e => updateScopeItem(i, e.target.value)} placeholder={`Deliverable ${i + 1}`} />
                      <button onClick={() => removeScopeItem(i)} style={{ background: "none", border: `1px solid ${BORDER}`, color: "rgba(44,44,44,0.4)", cursor: "pointer", padding: "0 10px", fontSize: 16 }}>×</button>
                    </div>
                  ))}
                  <button onClick={addScopeItem} style={{ fontSize: 11, color: BURGUNDY, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 0", fontWeight: 600 }}>+ Add Item</button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={labelStyle}>Total Investment</label>
                    <input style={inputStyle} value={pkg.total_investment} onChange={e => setPkg({ ...pkg, total_investment: e.target.value })} placeholder="R11 000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Deposit ({pkg.deposit_percent})</label>
                    <input style={inputStyle} value={pkg.deposit_amount} onChange={e => setPkg({ ...pkg, deposit_amount: e.target.value })} placeholder="R6 600" />
                  </div>
                  <div>
                    <label style={labelStyle}>Balance</label>
                    <input style={inputStyle} value={pkg.balance_amount} onChange={e => setPkg({ ...pkg, balance_amount: e.target.value })} placeholder="R4 400" />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Process / Delivery Notes</label>
                  <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 72 }} value={pkg.process_notes} onChange={e => setPkg({ ...pkg, process_notes: e.target.value })} />
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13 }}>
                  <input type="checkbox" checked={includeQuestionnaire} onChange={e => setIncludeQuestionnaire(e.target.checked)} style={{ accentColor: BURGUNDY, width: 15, height: 15 }} />
                  Include Brand Strategy Diagnostic (questionnaire)
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24 }}>
                <button onClick={() => setStep(1)} style={{ fontSize: 11, color: BURGUNDY, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>← Back</button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{ backgroundColor: saving ? BORDER : BURGUNDY, color: "#fff", border: "none", padding: "12px 32px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer", fontWeight: 600 }}
                >
                  {saving ? "Saving…" : "Save & Review →"}
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Review & Send ── */}
          {step === 3 && (
            <div>
              {done ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: DUSTY_ROSE, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, color: BURGUNDY, marginBottom: 8 }}>Invite Sent!</h3>
                  <p style={{ fontSize: 13, color: "rgba(44,44,44,0.6)", marginBottom: 28 }}>
                    {client.name} ({client.email}) has been invited to the portal.
                  </p>
                  <button onClick={onClose} style={{ backgroundColor: BURGUNDY, color: "#fff", border: "none", padding: "12px 32px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}>Close</button>
                </div>
              ) : (
                <div>
                  {/* Summary */}
                  <div style={{ backgroundColor: "#fff", border: `1px solid ${BORDER}`, padding: "20px 24px", marginBottom: 24 }}>
                    <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 12, fontWeight: 600 }}>Engagement Summary</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 4 }}>{client.name} — {client.company}</p>
                    <p style={{ fontSize: 12, color: "rgba(44,44,44,0.5)", marginBottom: 12 }}>{client.email}</p>
                    <p style={{ fontSize: 13, color: BURGUNDY, fontWeight: 600, marginBottom: 8 }}>{pkg.package_title || selectedTemplate}</p>
                    {pkg.total_investment && <p style={{ fontSize: 13, color: DARK }}>Investment: <strong>{pkg.total_investment}</strong> — Deposit: <strong>{pkg.deposit_amount}</strong></p>}
                    {includeQuestionnaire && <p style={{ fontSize: 12, color: "rgba(44,44,44,0.5)", marginTop: 8 }}>✓ Brand Strategy Diagnostic included</p>}
                  </div>

                  <div style={{ backgroundColor: "rgba(92,31,46,0.04)", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${DUSTY_ROSE}`, padding: "14px 18px", marginBottom: 28, fontSize: 13, color: "rgba(44,44,44,0.7)", lineHeight: 1.7 }}>
                    An email will be sent to <strong style={{ color: DARK }}>{client.email}</strong> with a link to the client portal, their engagement summary, and banking details.
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button onClick={() => setStep(2)} style={{ fontSize: 11, color: BURGUNDY, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>← Back</button>
                    <button
                      onClick={handleSendInvite}
                      disabled={sending}
                      style={{ backgroundColor: sending ? BORDER : BURGUNDY, color: "#fff", border: "none", padding: "14px 36px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: sending ? "not-allowed" : "pointer", fontWeight: 600 }}
                    >
                      {sending ? "Sending…" : "Send Portal Invite →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}