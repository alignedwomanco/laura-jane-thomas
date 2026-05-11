import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import Navbar from "@/components/site/Navbar";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";

const STATUS_STYLES = {
  scheduled: { bg: "rgba(194,133,139,0.15)", color: DUSTY_ROSE, label: "Scheduled" },
  sent: { bg: "rgba(34,100,54,0.1)", color: "#226436", label: "Sent" },
  failed: { bg: "rgba(180,30,30,0.1)", color: "#b41e1e", label: "Failed" },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.scheduled;
  return (
    <span style={{ background: s.bg, color: s.color, fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", padding: "3px 10px", fontWeight: 600 }}>
      {s.label}
    </span>
  );
}

export default function ScheduledEmailAdmin() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [resending, setResending] = useState(null);
  const [previewEmail, setPreviewEmail] = useState(null);

  const load = async () => {
    setLoading(true);
    const all = await base44.entities.ScheduledEmail.list("-scheduledAt", 200);
    setEmails(all);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? emails : emails.filter(e => e.status === filter);

  const handleResend = async (email) => {
    setResending(email.id);
    try {
      // Reset to scheduled so the processor picks it up immediately
      await base44.entities.ScheduledEmail.update(email.id, {
        status: "scheduled",
        scheduledAt: new Date().toISOString(),
        errorMessage: null,
        sentAt: null,
      });
      await load();
    } catch (err) {
      alert("Failed to reset: " + err.message);
    }
    setResending(null);
  };

  const stats = {
    total: emails.length,
    scheduled: emails.filter(e => e.status === "scheduled").length,
    sent: emails.filter(e => e.status === "sent").length,
    failed: emails.filter(e => e.status === "failed").length,
  };

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter',Arial,sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 10 }}>Admin</p>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#1A0A0E", margin: 0 }}>
            Nurture Email Queue
          </h1>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { label: "Total", value: stats.total, color: "#1A0A0E" },
            { label: "Scheduled", value: stats.scheduled, color: DUSTY_ROSE },
            { label: "Sent", value: stats.sent, color: "#226436" },
            { label: "Failed", value: stats.failed, color: "#b41e1e" },
          ].map(s => (
            <div key={s.label} style={{ border: "1px solid rgba(92,31,46,0.15)", padding: "20px 24px" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,10,14,0.4)", margin: "0 0 8px" }}>{s.label}</p>
              <p style={{ fontSize: 32, fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter + refresh */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center", flexWrap: "wrap" }}>
          {["all", "scheduled", "sent", "failed"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: "8px 18px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 600, cursor: "pointer", border: `1px solid ${filter === f ? BURGUNDY : "rgba(92,31,46,0.25)"}`,
                backgroundColor: filter === f ? BURGUNDY : "transparent", color: filter === f ? CREAM : BURGUNDY,
                fontFamily: "'Inter',sans-serif",
              }}>
              {f}
            </button>
          ))}
          <button onClick={load} style={{ marginLeft: "auto", padding: "8px 18px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", border: `1px solid rgba(92,31,46,0.25)`, backgroundColor: "transparent", color: BURGUNDY, fontFamily: "'Inter',sans-serif" }}>
            Refresh
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "rgba(26,10,14,0.4)", fontSize: 13 }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "rgba(26,10,14,0.4)", fontSize: 13 }}>No emails found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid rgba(92,31,46,0.2)` }}>
                  {["Recipient", "Sequence", "#", "Subject", "Scheduled At", "Sent At", "Status", "Actions"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,10,14,0.4)", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(email => (
                  <tr key={email.id} style={{ borderBottom: "1px solid rgba(92,31,46,0.08)" }}>
                    <td style={{ padding: "12px 12px", verticalAlign: "top" }}>
                      <div style={{ fontWeight: 500, color: "#1A0A0E" }}>{email.firstName || "-"}</div>
                      <div style={{ fontSize: 11, color: "rgba(26,10,14,0.5)" }}>{email.toEmail}</div>
                    </td>
                    <td style={{ padding: "12px 12px", verticalAlign: "top", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: DUSTY_ROSE }}>
                        {(email.sequence || "").replace(/_/g, " ")}
                      </span>
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "center", verticalAlign: "top", color: BURGUNDY, fontWeight: 700 }}>
                      {email.emailNumber}
                    </td>
                    <td style={{ padding: "12px 12px", verticalAlign: "top", maxWidth: 220 }}>
                      <span style={{ color: "#1A0A0E" }}>{email.subject}</span>
                    </td>
                    <td style={{ padding: "12px 12px", verticalAlign: "top", whiteSpace: "nowrap", fontSize: 11, color: "rgba(26,10,14,0.55)" }}>
                      {email.scheduledAt ? new Date(email.scheduledAt).toLocaleString() : "-"}
                    </td>
                    <td style={{ padding: "12px 12px", verticalAlign: "top", whiteSpace: "nowrap", fontSize: 11, color: "rgba(26,10,14,0.55)" }}>
                      {email.sentAt ? new Date(email.sentAt).toLocaleString() : "-"}
                    </td>
                    <td style={{ padding: "12px 12px", verticalAlign: "top" }}>
                      <StatusBadge status={email.status} />
                      {email.errorMessage && (
                        <div style={{ fontSize: 10, color: "#b41e1e", marginTop: 4, maxWidth: 160, wordBreak: "break-word" }}>{email.errorMessage}</div>
                      )}
                    </td>
                    <td style={{ padding: "12px 12px", verticalAlign: "top", whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => setPreviewEmail(email)}
                        style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: BURGUNDY, background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600, marginRight: 10 }}
                      >
                        Preview
                      </button>
                      {email.status === "failed" && (
                        <button
                          onClick={() => handleResend(email)}
                          disabled={resending === email.id}
                          style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#226436", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}
                        >
                          {resending === email.id ? "..." : "Retry"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: 40 }}>
          <Link to="/quiz-admin" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: BURGUNDY, borderBottom: `1px solid ${BURGUNDY}`, textDecoration: "none", paddingBottom: 2 }}>
            Back to Quiz Admin
          </Link>
        </div>
      </div>

      {/* Preview modal */}
      {previewEmail && (
        <div
          onClick={() => setPreviewEmail(null)}
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "#fff", width: "100%", maxWidth: 680, maxHeight: "85vh", overflow: "auto", padding: 0, position: "relative" }}
          >
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: "#999", letterSpacing: "0.14em", textTransform: "uppercase" }}>Email Preview</p>
                <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 600, color: "#333" }}>{previewEmail.subject}</p>
              </div>
              <button onClick={() => setPreviewEmail(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#999" }}>x</button>
            </div>
            <iframe
              srcDoc={previewEmail.htmlBody}
              title="Email Preview"
              style={{ width: "100%", height: 600, border: "none" }}
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  );
}