import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";
const DARK = "#2C2C2C";
const BORDER = "#D6C4B0";

const TABS = ["Overview", "Brand Strategy", "Engagements", "Contact Messages"];

function StatCard({ label, value, color = BURGUNDY }) {
  return (
    <div style={{ backgroundColor: "rgba(92,31,46,0.05)", border: `1px solid ${BORDER}`, padding: "24px 28px" }}>
      <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(44,44,44,0.45)", marginBottom: 8, fontFamily: "'Inter',sans-serif" }}>{label}</p>
      <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 40, color, lineHeight: 1 }}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    accepted: { bg: "rgba(92,31,46,0.08)", color: BURGUNDY },
    pending: { bg: "rgba(194,133,139,0.15)", color: DUSTY_ROSE },
    complete: { bg: "rgba(92,31,46,0.08)", color: BURGUNDY },
    processing: { bg: "rgba(194,133,139,0.15)", color: DUSTY_ROSE },
    error: { bg: "rgba(180,50,50,0.08)", color: "#B43232" },
    new: { bg: "rgba(194,133,139,0.15)", color: DUSTY_ROSE },
    read: { bg: "rgba(92,31,46,0.08)", color: BURGUNDY },
    replied: { bg: "rgba(44,44,44,0.08)", color: DARK },
    archived: { bg: "rgba(44,44,44,0.05)", color: "rgba(44,44,44,0.4)" },
  };
  const s = colors[status] || { bg: "rgba(44,44,44,0.05)", color: DARK };
  return (
    <span style={{ ...s, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>
      {status}
    </span>
  );
}

function SectionHeader({ title }) {
  return (
    <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)", fontWeight: 600, marginBottom: 16, fontFamily: "'Inter',sans-serif" }}>
      {title}
    </p>
  );
}

function TableRow({ cells, highlight }) {
  return (
    <tr style={{ borderBottom: `1px solid rgba(214,196,176,0.5)`, backgroundColor: highlight ? "rgba(92,31,46,0.02)" : "transparent" }}>
      {cells.map((cell, i) => (
        <td key={i} style={{ padding: "12px 16px 12px 0", fontSize: 12, color: i === 0 ? DARK : "rgba(44,44,44,0.6)", fontFamily: "'Inter',sans-serif", verticalAlign: "top" }}>
          {cell}
        </td>
      ))}
    </tr>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const [engagements, setEngagements] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.BrandStrategySubmission.list("-created_date", 100),
      base44.entities.EngagementAcceptance.list("-created_date", 100),
      base44.entities.ContactSubmission.list("-created_date", 100),
    ]).then(([subs, engs, cons]) => {
      setSubmissions(subs);
      setEngagements(engs);
      setContacts(cons);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: CREAM, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${BORDER}`, borderTopColor: BURGUNDY, animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const newContacts = contacts.filter(c => c.status === "new").length;

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter',sans-serif", color: DARK }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 8 }}>Laura Jane Thomas</p>
              <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 36, color: BURGUNDY, margin: 0 }}>Client Dashboard</h1>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Link to="/quiz-admin" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: BURGUNDY, borderBottom: `1px solid ${BURGUNDY}`, textDecoration: "none", paddingBottom: 2, fontWeight: 600 }}>Quiz Analytics →</Link>
              <Link to="/submissions" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: DUSTY_ROSE, borderBottom: `1px solid ${DUSTY_ROSE}`, textDecoration: "none", paddingBottom: 2, fontWeight: 600 }}>Strategy Reports →</Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, marginBottom: 40, display: "flex", gap: 0 }}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "12px 20px",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: activeTab === i ? 600 : 400,
                color: activeTab === i ? BURGUNDY : "rgba(44,44,44,0.4)",
                background: "none",
                border: "none",
                borderBottom: activeTab === i ? `2px solid ${BURGUNDY}` : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "'Inter',sans-serif",
                position: "relative",
                marginBottom: -1,
              }}
            >
              {tab}
              {tab === "Contact Messages" && newContacts > 0 && (
                <span style={{ marginLeft: 6, backgroundColor: DUSTY_ROSE, color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 9, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{newContacts}</span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
              <StatCard label="Brand Strategy Submissions" value={submissions.length} />
              <StatCard label="Engagement Acceptances" value={engagements.length} />
              <StatCard label="Contact Messages" value={contacts.length} />
              <StatCard label="New Messages" value={newContacts} color={DUSTY_ROSE} />
            </div>

            {/* Recent Activity */}
            <SectionHeader title="Recent Activity" />
            <div style={{ border: `1px solid ${BORDER}`, backgroundColor: "#fff" }}>
              {[
                ...submissions.slice(0, 3).map(s => ({ type: "Brand Strategy", name: s.fullName || s.firstName || s.email, detail: s.company || "", date: s.submittedAt || s.created_date, status: s.status || "pending" })),
                ...engagements.slice(0, 3).map(e => ({ type: "Engagement", name: e.full_name, detail: e.company_name, date: e.accepted_at, status: e.status || "accepted" })),
                ...contacts.slice(0, 3).map(c => ({ type: "Contact", name: `${c.firstName || ""} ${c.lastName || ""}`.trim() || c.email, detail: c.subject || "", date: c.submittedAt || c.created_date, status: c.status || "new" })),
              ]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 8)
                .map((item, i) => (
                  <div key={i} style={{ padding: "14px 20px", borderBottom: `1px solid rgba(214,196,176,0.4)`, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: DUSTY_ROSE, fontWeight: 600, minWidth: 100 }}>{item.type}</span>
                    <span style={{ fontSize: 13, color: DARK, flex: 1 }}>{item.name} {item.detail && <span style={{ color: "rgba(44,44,44,0.5)" }}>— {item.detail}</span>}</span>
                    <StatusBadge status={item.status} />
                    <span style={{ fontSize: 11, color: "rgba(44,44,44,0.4)", whiteSpace: "nowrap" }}>{item.date ? new Date(item.date).toLocaleDateString("en-ZA") : "—"}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Brand Strategy Tab */}
        {activeTab === 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <SectionHeader title={`${submissions.length} Submissions`} />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${BORDER}` }}>
                    {["Name", "Company", "Email", "Submitted", "Status", ""].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 16px 8px 0", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)", fontWeight: 500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, i) => (
                    <TableRow key={s.id || i} cells={[
                      s.fullName || s.firstName || "—",
                      s.company || "—",
                      s.email,
                      s.submittedAt ? new Date(s.submittedAt).toLocaleDateString("en-ZA") : "—",
                      <StatusBadge status={s.status || "pending"} />,
                      s.id ? <Link to={`/strategy-report/${s.id}`} style={{ fontSize: 10, color: BURGUNDY, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: `1px solid ${BURGUNDY}` }}>View →</Link> : null,
                    ]} />
                  ))}
                  {submissions.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: "40px 0", textAlign: "center", color: "rgba(44,44,44,0.35)", fontSize: 13 }}>No submissions yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Engagements Tab */}
        {activeTab === 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <SectionHeader title={`${engagements.length} Acceptances`} />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${BORDER}` }}>
                    {["Full Name", "Business", "Reg. Number", "Email", "Place", "Accepted At", "Status"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 16px 8px 0", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)", fontWeight: 500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {engagements.map((e, i) => (
                    <TableRow key={e.id || i} cells={[
                      e.full_name,
                      e.company_name,
                      e.registration_number || "—",
                      e.email,
                      e.place_of_acceptance || "—",
                      e.accepted_at ? new Date(e.accepted_at).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" }) : "—",
                      <StatusBadge status={e.status || "accepted"} />,
                    ]} />
                  ))}
                  {engagements.length === 0 && (
                    <tr><td colSpan={7} style={{ padding: "40px 0", textAlign: "center", color: "rgba(44,44,44,0.35)", fontSize: 13 }}>No engagements yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Contact Messages Tab */}
        {activeTab === 3 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <SectionHeader title={`${contacts.length} Messages`} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {contacts.map((c, i) => (
                <ContactCard key={c.id || i} contact={c} onUpdate={(updated) => setContacts(prev => prev.map(x => x.id === updated.id ? updated : x))} />
              ))}
              {contacts.length === 0 && (
                <p style={{ textAlign: "center", color: "rgba(44,44,44,0.35)", fontSize: 13, padding: "40px 0" }}>No messages yet.</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ContactCard({ contact: c, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (status) => {
    setUpdating(true);
    const updated = await base44.entities.ContactSubmission.update(c.id, { status });
    onUpdate(updated);
    setUpdating(false);
  };

  return (
    <div style={{ border: `1px solid ${BORDER}`, backgroundColor: c.status === "new" ? "#fff" : "transparent" }}>
      <div
        onClick={() => setExpanded(e => !e)}
        style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontSize: 13, color: DARK, fontWeight: c.status === "new" ? 600 : 400, marginBottom: 2 }}>
            {`${c.firstName || ""} ${c.lastName || ""}`.trim() || c.email}
          </p>
          <p style={{ fontSize: 11, color: "rgba(44,44,44,0.5)" }}>{c.email}</p>
        </div>
        <p style={{ fontSize: 12, color: "rgba(44,44,44,0.6)", flex: 2 }}>{c.subject || "No subject"}</p>
        <StatusBadge status={c.status || "new"} />
        <p style={{ fontSize: 11, color: "rgba(44,44,44,0.4)", whiteSpace: "nowrap" }}>
          {c.submittedAt ? new Date(c.submittedAt).toLocaleDateString("en-ZA") : "—"}
        </p>
      </div>

      {expanded && (
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid rgba(214,196,176,0.5)` }}>
          <p style={{ fontSize: 13, color: DARK, lineHeight: 1.7, marginTop: 16, marginBottom: 20 }}>{c.message}</p>
          {c.phone && <p style={{ fontSize: 12, color: "rgba(44,44,44,0.5)", marginBottom: 16 }}>Phone: {c.phone}</p>}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["new", "read", "replied", "archived"].map(s => (
              <button
                key={s}
                disabled={updating || c.status === s}
                onClick={() => updateStatus(s)}
                style={{
                  padding: "6px 14px", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                  border: `1px solid ${c.status === s ? BURGUNDY : BORDER}`,
                  backgroundColor: c.status === s ? BURGUNDY : "transparent",
                  color: c.status === s ? "#fff" : DARK,
                  cursor: c.status === s ? "default" : "pointer",
                  fontFamily: "'Inter',sans-serif", fontWeight: 600,
                  opacity: updating ? 0.5 : 1,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}