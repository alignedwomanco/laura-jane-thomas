import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Link, useNavigate } from "react-router-dom";
import { generateAnswersPDF } from "@/lib/generateAnswersPDF";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";
const DARK = "#2C2C2C";
const BORDER = "#D6C4B0";

export default function ClientPortal() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [engagement, setEngagement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [isAdminPreview, setIsAdminPreview] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adminEmail = urlParams.get("adminEmail");

    base44.auth.isAuthenticated().then(async (isAuth) => {
      if (!isAuth) {
        setAuthed(false);
        setLoading(false);
        return;
      }
      setAuthed(true);
      const me = await base44.auth.me();
      setUser(me);

      // Admin preview: fetch data for the specified client email
      const lookupEmail = (adminEmail && me.role === "admin") ? adminEmail : me.email;
      if (adminEmail && me.role === "admin") setIsAdminPreview(true);

      // Fetch data matching the user's email
      const [subs, engs] = await Promise.all([
        base44.entities.BrandStrategySubmission.filter({ email: lookupEmail }),
        base44.entities.EngagementAcceptance.filter({ email: lookupEmail }),
      ]);

      // Most recent submission
      if (subs.length > 0) {
        const sorted = subs.sort((a, b) => new Date(b.submittedAt || b.created_date) - new Date(a.submittedAt || a.created_date));
        setSubmission(sorted[0]);
      }

      if (engs.length > 0) {
        setEngagement(engs[0]);
      }

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

  if (!authed) {
    return (
      <div style={{ backgroundColor: CREAM, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: 400, padding: "0 24px" }}>
          <Header />
          <p style={{ fontSize: 14, color: "rgba(44,44,44,0.6)", marginBottom: 32, lineHeight: 1.7 }}>
            Please sign in to access your client portal.
          </p>
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            style={{ backgroundColor: BURGUNDY, color: "#fff", border: "none", padding: "14px 40px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter',sans-serif", color: DARK }}>
      <style>{`
        @media (max-width: 640px) {
          .portal-admin-bar { flex-direction: column; align-items: flex-start; gap: 6px !important; }
          .portal-welcome-title { font-size: 24px !important; }
          .portal-card { padding: 18px 16px !important; }
          .portal-container { padding: 40px 16px 60px !important; }
          .portal-btn-row { width: 100%; }
          .portal-btn-row > * { flex: 1 1 100%; text-align: center; justify-content: center; }
          .portal-eng-row { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
      {isAdminPreview && (
        <div className="portal-admin-bar" style={{ backgroundColor: BURGUNDY, color: "#fff", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
            Admin Preview — {new URLSearchParams(window.location.search).get("adminEmail")}
          </p>
          <Link to="/dashboard" style={{ fontSize: 10, color: "rgba(245,237,224,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid rgba(245,237,224,0.4)" }}>← Back to Dashboard</Link>
        </div>
      )}
      {showCollabModal && (
        <CollabInviteModal
          user={user}
          engagement={engagement}
          onClose={() => setShowCollabModal(false)}
        />
      )}
      <div className="portal-container" style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px 80px" }}>
        <Header />

        {/* Welcome */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 8 }}>Welcome back</p>
          <h1 className="portal-welcome-title" style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 32, color: BURGUNDY, margin: "0 0 4px" }}>
            {user?.full_name || user?.email}
          </h1>
          <p style={{ fontSize: 12, color: "rgba(44,44,44,0.5)" }}>{user?.email}</p>
        </div>

        {/* Engagement Acceptance */}
        <Section title="Engagement Agreement">
          {engagement ? (
            <div>
              <div className="portal-eng-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 13, color: DARK, fontWeight: 600, marginBottom: 2 }}>{engagement.company_name}</p>
                  <p style={{ fontSize: 11, color: "rgba(44,44,44,0.5)" }}>
                    Accepted {engagement.accepted_at ? new Date(engagement.accepted_at).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" }) : "—"}
                    {engagement.place_of_acceptance && ` · ${engagement.place_of_acceptance}`}
                  </p>
                </div>
                <StatusBadge status={engagement.status || "accepted"} />
              </div>

              {/* Banking reminder */}
              <div style={{ backgroundColor: "rgba(92,31,46,0.04)", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${DUSTY_ROSE}`, padding: "16px 20px" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: BURGUNDY, fontWeight: 600, marginBottom: 8 }}>Deposit Payment Details</p>
                <table style={{ fontSize: 12, borderCollapse: "collapse" }}>
                  <tbody>
                    {[
                      ["Account holder", "Miss LJ Thomas"],
                      ["Account number", "10012596596"],
                      ["Bank", "Investec Bank Limited"],
                      ["Branch code", "580105"],
                      ["SWIFT", "IVESZAJJXXX"],
                      ["Reference", "Your brand name"],
                    ].map(([k, v]) => (
                      <tr key={k}>
                        <td style={{ padding: "3px 16px 3px 0", color: "rgba(44,44,44,0.5)" }}>{k}</td>
                        <td style={{ padding: "3px 0", color: DARK, fontWeight: 500 }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <EmptyState
              message="No engagement agreement on file yet."
              action={{ label: "View & Accept Engagement Terms →", href: isAdminPreview ? `/accept?adminEmail=${encodeURIComponent(new URLSearchParams(window.location.search).get("adminEmail"))}` : "/accept" }}
            />
          )}
        </Section>

        {/* Brand Strategy Questionnaire */}
        <Section title="Brand Strategy Diagnostic">
          {submission ? (
            <div>
              <div className="portal-eng-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 13, color: DARK, fontWeight: 600, marginBottom: 2 }}>
                    {submission.company || submission.fullName || "Your Submission"}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(44,44,44,0.5)" }}>
                    Submitted {submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" }) : "—"}
                  </p>
                </div>
                <StatusBadge status={submission.status || "complete"} />
              </div>
              <div className="portal-btn-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link
                  to={`/strategy-report/${submission.id}`}
                  style={{ backgroundColor: BURGUNDY, color: "#fff", textDecoration: "none", padding: "10px 24px", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}
                >
                  View Saved Answers →
                </Link>
                <button
                  onClick={() => generateAnswersPDF(submission)}
                  style={{ backgroundColor: "transparent", color: BURGUNDY, border: `1px solid ${BURGUNDY}`, padding: "10px 24px", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}
                >
                  Download PDF
                </button>
                <button
                  onClick={() => setShowCollabModal(true)}
                  style={{ backgroundColor: "transparent", color: "rgba(44,44,44,0.5)", border: `1px solid ${BORDER}`, padding: "10px 24px", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}
                >
                  Invite a Partner
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 13, color: "rgba(44,44,44,0.6)", lineHeight: 1.7, marginBottom: 20 }}>
                Once your deposit is received, please complete the Brand Strategy Diagnostic. Your answers form the foundation of your brand strategy work with Laura.
              </p>
              <div className="portal-btn-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => {
                    if (engagement) {
                      const prefill = {
                        fullName: engagement.full_name || "",
                        company: engagement.company_name || "",
                        email: engagement.email || "",
                      };
                      try { localStorage.setItem("bsd_prefill", JSON.stringify(prefill)); } catch {}
                    }
                    navigate("/questionnaire");
                  }}
                  style={{ backgroundColor: BURGUNDY, color: "#fff", border: "none", padding: "12px 28px", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}
                >
                  Complete the Questionnaire →
                </button>
                <button
                  onClick={() => setShowCollabModal(true)}
                  style={{ backgroundColor: "transparent", color: BURGUNDY, border: `1px solid ${BURGUNDY}`, padding: "12px 28px", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}
                >
                  Invite a Partner to Collab
                </button>
              </div>
            </div>
          )}
        </Section>

        {/* Contact */}
        <Section title="Need Help?">
          <p style={{ fontSize: 13, color: "rgba(44,44,44,0.6)", lineHeight: 1.7, marginBottom: 16 }}>
            Reach out to Laura directly with any questions about your project.
          </p>
          <a
            href="mailto:hello@laurajanethomas.biz"
            style={{ fontSize: 12, color: BURGUNDY, textDecoration: "none", borderBottom: `1px solid ${BURGUNDY}`, paddingBottom: 2 }}
          >
            hello@laurajanethomas.biz
          </a>
        </Section>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => base44.auth.logout("/")}
            style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, color: BURGUNDY, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>
        Laura Jane Thomas
      </h1>
      <p style={{ fontSize: 11, color: DUSTY_ROSE, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>Client Portal</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)", fontWeight: 600, marginBottom: 16, paddingBottom: 10, borderBottom: `1px solid ${BORDER}`, fontFamily: "'Inter',sans-serif" }}>
        {title}
      </p>
      <div className="portal-card" style={{ backgroundColor: "#fff", border: `1px solid ${BORDER}`, padding: "24px 28px" }}>
        {children}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    accepted: { bg: "rgba(92,31,46,0.08)", color: BURGUNDY },
    complete: { bg: "rgba(92,31,46,0.08)", color: BURGUNDY },
    processing: { bg: "rgba(194,133,139,0.15)", color: DUSTY_ROSE },
    pending: { bg: "rgba(194,133,139,0.15)", color: DUSTY_ROSE },
    error: { bg: "rgba(180,50,50,0.08)", color: "#B43232" },
  };
  const s = colors[status] || { bg: "rgba(44,44,44,0.05)", color: DARK };
  return (
    <span style={{ ...s, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>
      {status}
    </span>
  );
}

function EmptyState({ message, action }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <p style={{ fontSize: 13, color: "rgba(44,44,44,0.4)", marginBottom: 16 }}>{message}</p>
      {action && (
        <Link
          to={action.href}
          style={{ fontSize: 10, color: BURGUNDY, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: `1px solid ${BURGUNDY}`, paddingBottom: 2, fontWeight: 600 }}
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

function CollabInviteModal({ user, engagement, onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!email.trim()) return;
    setSending(true);
    setError("");
    const portalUrl = `${window.location.origin}/portal`;
    const from = user?.full_name || user?.email || "your colleague";
    const company = engagement?.company_name || "";

    await base44.integrations.Core.SendEmail({
      to: email.trim(),
      from_name: "Laura Jane Thomas",
      subject: `${from} has invited you to collaborate${company ? ` on ${company}` : ""}`,
      body: `Hi${name ? ` ${name}` : ""},\n\n${from} has invited you to collaborate on the brand strategy project${company ? ` for ${company}` : ""} with Laura Jane Thomas.\n\nYou can access the shared client portal here:\n${portalUrl}\n\nYou'll need to sign in or create an account to get started.\n\nLooking forward to working with you.\n\nLaura Jane Thomas\nlaurajanethomas.biz`,
    });

    setSent(true);
    setSending(false);
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", border: `1px solid ${BORDER}`,
    backgroundColor: "#fff", fontSize: 13, color: DARK, outline: "none",
    fontFamily: "'Inter',sans-serif", boxSizing: "border-box",
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ backgroundColor: CREAM, width: "100%", maxWidth: 440, fontFamily: "'Inter',sans-serif" }}>
        <div style={{ padding: "24px 28px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 4 }}>Collaboration</p>
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: BURGUNDY, margin: 0 }}>Invite a Partner</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: "rgba(44,44,44,0.4)", cursor: "pointer" }}>×</button>
        </div>

        <div style={{ padding: "28px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: DUSTY_ROSE, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ fontSize: 14, color: DARK, marginBottom: 6 }}>Invite sent to <strong>{email}</strong></p>
              <p style={{ fontSize: 12, color: "rgba(44,44,44,0.5)", marginBottom: 24 }}>They'll receive a link to the client portal.</p>
              <button onClick={onClose} style={{ backgroundColor: BURGUNDY, color: "#fff", border: "none", padding: "10px 28px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>Done</button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 14 }}>
              <p style={{ fontSize: 13, color: "rgba(44,44,44,0.6)", lineHeight: 1.7, marginBottom: 4 }}>
                Send a collaborator a link to this portal so they can contribute to the questionnaire.
              </p>
              <div>
                <label style={{ display: "block", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(44,44,44,0.5)", marginBottom: 5 }}>Their Name</label>
                <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sarah" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(44,44,44,0.5)", marginBottom: 5 }}>Their Email *</label>
                <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="partner@company.com" />
              </div>
              {error && <p style={{ fontSize: 12, color: "#B43232" }}>{error}</p>}
              <button
                onClick={handleSend}
                disabled={sending || !email.trim()}
                style={{ backgroundColor: sending || !email.trim() ? BORDER : BURGUNDY, color: "#fff", border: "none", padding: "12px 28px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: sending || !email.trim() ? "not-allowed" : "pointer", fontWeight: 600, fontFamily: "'Inter',sans-serif", marginTop: 4 }}
              >
                {sending ? "Sending…" : "Send Invite →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}