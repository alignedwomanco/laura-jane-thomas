import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Download, ArrowLeft } from "lucide-react";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";
const BORDER = "#D6C4B0";
const DARK = "#2C2C2C";

// Quiz question text lookup
const QUIZ_QUESTIONS = [
  "What are you working on right now?",
  "Where are you in your journey?",
  "What do you need most right now?",
  "How much time can you realistically commit?",
  "What have you tried before?",
  "What are you ready to invest in right now?",
  "What is the question you most want answered right now?",
  "What outcome would make this work feel worth it?",
];

const QUIZ_OPTIONS = {
  q0: { A: "My career or my life direction", B: "A business I am building, scaling, or repositioning", C: "My identity and who I am becoming", D: "The relationships and structures around me", E: "I am between things and not sure what is next" },
  q1: { A: "Starting out. Building something new or starting over after a major change", B: "Building. I have something going and I need to figure out the next stage", C: "Repositioning. What I have built no longer fits, and I need to figure out what's next", D: "At a threshold. I have built something significant and I am ready for the next major chapter", E: "Established. My business is running and I need senior strategic and brand direction", F: "Returning. I have been through a major life event and I need to find myself again" },
  q2: { A: "Clarity. I am stuck and cannot see the path forward", B: "Depth. I know what is broken and I need someone to help me work through it properly", C: "Senior partnership. I have a real chapter ahead and I need someone to walk it with me", D: "The methodology. I want to do this work in my own time", E: "Business strategy and brand direction. The foundation of my business is what needs work", F: "A diagnosis. I am not sure what is actually wrong, and I want a senior look before I decide anything" },
  q3: { A: "One focused session, then I want to know what to do next", B: "One full day of concentrated work", C: "Four weeks, with structured calls and written outputs", D: "Three months of sustained engagement", E: "Six months or more of strategic partnership", F: "My own time, at my own pace, alongside other commitments" },
  q4: { A: "Books, podcasts, self-reflection, journaling", B: "Therapy or counselling", C: "Previous coaching that did not stick", D: "Multiple modalities. Some helped, none fully landed", E: "Strategic consultants or business advisors for my company", F: "Nothing structured yet" },
  q5: { A: "Something accessible and structured to start", B: "A senior engagement that matches the chapter I am stepping into", C: "Self-paced work I can do in my own time", D: "Strategic work for my business", E: "A diagnostic first, then I will decide what's next", F: "Concentrated time on one specific thing" },
  q6: { A: "What am I actually doing with my life and what is next", B: "How do I build my business in a way that does not break me", C: "Who am I becoming, and how do I build a life that fits her", D: "What is actually costing me right now, and what should I do about it", E: "How do I scale or reposition my business properly", F: "How do I integrate the work into my life on my own terms" },
  q7: { A: "A clear plan I can execute, in four weeks", B: "Diagnosed clarity on what is actually happening, fast", C: "One concentrated day that breaks me out of where I am stuck", D: "Sustained senior partnership through a real chapter transition", E: "A senior brain that helps me build the business properly", F: "The methodology, integrated into my life, on my own time" },
};

const BRAND_SECTIONS = [
  { key: "businessFoundation", label: "Business Foundation", questions: ["What are you actually selling — not the category, but the outcome?", "If someone paid you tomorrow, what exactly would they receive?", "What would someone Google to find you, honestly?", "What problem are you solving that people are already paying to fix?", "Where does your business make money first, and where does it scale later?", "If this business worked perfectly, how would it generate revenue?", "If you could not sell your current offer, what would you sell instead?"] },
  { key: "audienceInsight", label: "Audience Insight", questions: ["Who frustrates you the most in your audience and why?", "Who do you want more of?", "What do your best clients have in common?", "What does your audience say they want vs. what they actually need?", "What are they tired of hearing in your industry?", "If your audience was in a room, what would they be too embarrassed to admit?"] },
  { key: "positioning", label: "Positioning & Differentiation", questions: ["What do you do that others technically do, but not like you?", "What do you believe your industry gets wrong?", "Where are you playing small to stay palatable?", "If you removed 80% of your offer, what would remain?", "What are you over-explaining that should be obvious?", "If a competitor copied you, what could they never replicate?"] },
  { key: "brandTruth", label: "Brand Truth", questions: ["What part of your brand is performative?", "Where are you trying to sound like someone else?", "What are you afraid to say publicly?", "What would your brand say if it had nothing to lose?", "What do people misunderstand about your brand?", "If your business became wildly successful overnight, what would you lose?"] },
  { key: "brandEssence", label: "Brand Essence", questions: ["If your brand were a character or guide, who would it be?", "What deeper truth does your brand stand for?", "What do you want people to feel when they interact with your brand?"] },
  { key: "visionGrowth", label: "Vision & Growth", questions: ["What future are you building through this brand?", "What needs to change to get there?", "What opportunities are you not pursuing but should be?"] },
  { key: "legacyValues", label: "Legacy & Values", questions: ["What would people say about your brand if you were not in the room?", "What do you want to be known for in 10 years?", "What would make your brand irreplaceable?", "What would matter most if you had to teach this business to someone else?", "What does your brand protect?"] },
];

function downloadCSV(filename, rows) {
  const csv = rows.map(r => r.map(c => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadAllQuizCSV(submissions) {
  const header = ["Name", "Email", "Submitted", "Primary Result", "Secondary Result", ...QUIZ_QUESTIONS];
  const rows = submissions.map(s => {
    const answers = s.answers || {};
    const qAnswers = Object.keys(answers).sort().map(qKey => {
      const opts = QUIZ_OPTIONS[qKey] || {};
      const selected = answers[qKey] || [];
      return selected.map(l => opts[l] || l).join("; ");
    });
    return [
      s.firstName || "",
      s.email || "",
      s.submittedAt ? new Date(s.submittedAt).toLocaleDateString("en-ZA") : "",
      s.primaryResult || "",
      s.secondaryResult || "",
      ...qAnswers,
    ];
  });
  downloadCSV("quiz-submissions.csv", [header, ...rows]);
}

function downloadAllBrandCSV(submissions) {
  const qHeaders = BRAND_SECTIONS.flatMap(s => s.questions.map(q => `[${s.label}] ${q}`));
  const header = ["Full Name", "Email", "Company", "Position", "Phone", "Submitted", "Status", ...qHeaders];
  const rows = submissions.map(s => {
    const qAnswers = BRAND_SECTIONS.flatMap(sec => {
      const data = s[sec.key] || {};
      return sec.questions.map((_, i) => data[`q${i}`] || "");
    });
    return [
      s.fullName || s.firstName || "",
      s.email || "",
      s.company || "",
      s.position || "",
      s.phone || "",
      s.submittedAt ? new Date(s.submittedAt).toLocaleDateString("en-ZA") : "",
      s.status || "",
      ...qAnswers,
    ];
  });
  downloadCSV("brand-strategy-submissions.csv", [header, ...rows]);
}

// --- Quiz Submission Card ---
function QuizCard({ sub }) {
  const [open, setOpen] = useState(false);
  const answers = sub.answers || {};

  const downloadOne = () => {
    const rows = [
      ["Question", "Answer"],
      ...QUIZ_QUESTIONS.map((q, i) => {
        const qKey = `q${i}`;
        const opts = QUIZ_OPTIONS[qKey] || {};
        const selected = answers[qKey] || [];
        return [q, selected.map(l => opts[l] || l).join("; ")];
      }),
    ];
    downloadCSV(`quiz-${sub.firstName || sub.email}-${sub.id}.csv`, [
      ["Name", sub.firstName || ""], ["Email", sub.email || ""], ["Submitted", sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString("en-ZA") : ""], ["Primary Result", sub.primaryResult || ""], ["Secondary Result", sub.secondaryResult || ""], [],
      ...rows,
    ]);
  };

  return (
    <div style={{ border: `1px solid ${BORDER}`, backgroundColor: "#fff", marginBottom: 8 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
      >
        <div style={{ flex: 1, minWidth: 180 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 2, fontFamily: "'Playfair Display',Georgia,serif" }}>{sub.firstName || "—"}</p>
          <p style={{ fontSize: 11, color: "rgba(44,44,44,0.5)" }}>{sub.email}</p>
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <p style={{ fontSize: 11, color: BURGUNDY, fontWeight: 600 }}>{sub.primaryResult}</p>
          {sub.secondaryResult && <p style={{ fontSize: 10, color: DUSTY_ROSE }}>+ {sub.secondaryResult}</p>}
        </div>
        <p style={{ fontSize: 11, color: "rgba(44,44,44,0.4)", minWidth: 80 }}>{sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString("en-ZA") : "—"}</p>
        <button
          onClick={e => { e.stopPropagation(); downloadOne(); }}
          style={{ padding: "6px 12px", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: "transparent", border: `1px solid ${BORDER}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: BURGUNDY, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}
        >
          <Download size={12} /> CSV
        </button>
        {open ? <ChevronUp size={16} color={BURGUNDY} /> : <ChevronDown size={16} color={BURGUNDY} />}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
            <div style={{ padding: "4px 20px 20px", borderTop: `1px solid rgba(214,196,176,0.5)` }}>
              {QUIZ_QUESTIONS.map((q, i) => {
                const qKey = `q${i}`;
                const opts = QUIZ_OPTIONS[qKey] || {};
                const selected = answers[qKey] || [];
                const answerText = selected.map(l => opts[l] || l).join("; ");
                return (
                  <div key={qKey} style={{ padding: "12px 0", borderBottom: "1px solid rgba(214,196,176,0.3)" }}>
                    <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)", marginBottom: 4 }}>Q{i + 1}</p>
                    <p style={{ fontSize: 13, color: DARK, fontWeight: 500, marginBottom: 4 }}>{q}</p>
                    <p style={{ fontSize: 13, color: BURGUNDY }}>{answerText || <span style={{ color: "rgba(44,44,44,0.3)", fontStyle: "italic" }}>No answer</span>}</p>
                  </div>
                );
              })}
              <div style={{ marginTop: 16, display: "flex", gap: 24 }}>
                <div>
                  <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(44,44,44,0.4)", marginBottom: 4 }}>Primary CTA Clicked</p>
                  <p style={{ fontSize: 13, color: sub.primaryCtaClicked ? BURGUNDY : "rgba(44,44,44,0.4)" }}>{sub.primaryCtaClicked ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(44,44,44,0.4)", marginBottom: 4 }}>Discovery Call Clicked</p>
                  <p style={{ fontSize: 13, color: sub.discoveryCallCtaClicked ? BURGUNDY : "rgba(44,44,44,0.4)" }}>{sub.discoveryCallCtaClicked ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Brand Strategy Card ---
function BrandCard({ sub }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const downloadOne = () => {
    const rows = [
      ["Full Name", sub.fullName || sub.firstName || ""],
      ["Email", sub.email || ""],
      ["Company", sub.company || ""],
      ["Position", sub.position || ""],
      ["Phone", sub.phone || ""],
      ["Submitted", sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString("en-ZA") : ""],
      [],
      ...BRAND_SECTIONS.flatMap(sec => {
        const data = sub[sec.key] || {};
        return [
          [`--- ${sec.label} ---`, ""],
          ...sec.questions.map((q, i) => [q, data[`q${i}`] || ""]),
        ];
      }),
    ];
    downloadCSV(`brand-strategy-${sub.fullName || sub.email}-${sub.id}.csv`, rows);
  };

  return (
    <div style={{ border: `1px solid ${BORDER}`, backgroundColor: "#fff", marginBottom: 8 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
      >
        <div style={{ flex: 1, minWidth: 180 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 2, fontFamily: "'Playfair Display',Georgia,serif" }}>{sub.fullName || sub.firstName || "—"}</p>
          <p style={{ fontSize: 11, color: "rgba(44,44,44,0.5)" }}>{sub.email}</p>
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <p style={{ fontSize: 12, color: "rgba(44,44,44,0.6)" }}>{sub.company || "—"}</p>
          <p style={{ fontSize: 11, color: "rgba(44,44,44,0.4)" }}>{sub.position || ""}</p>
        </div>
        <p style={{ fontSize: 11, color: "rgba(44,44,44,0.4)", minWidth: 80 }}>{sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString("en-ZA") : "—"}</p>
        <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", backgroundColor: sub.status === "complete" ? "rgba(92,31,46,0.08)" : "rgba(194,133,139,0.15)", color: sub.status === "complete" ? BURGUNDY : DUSTY_ROSE, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{sub.status || "pending"}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={e => { e.stopPropagation(); downloadOne(); }}
            style={{ padding: "6px 12px", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: "transparent", border: `1px solid ${BORDER}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: BURGUNDY, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}
          >
            <Download size={12} /> CSV
          </button>
          {sub.id && (
            <Link
              to={`/strategy-report/${sub.id}`}
              onClick={e => e.stopPropagation()}
              style={{ padding: "6px 12px", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: BURGUNDY, color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}
            >
              Report →
            </Link>
          )}
        </div>
        {open ? <ChevronUp size={16} color={BURGUNDY} /> : <ChevronDown size={16} color={BURGUNDY} />}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
            <div style={{ borderTop: `1px solid rgba(214,196,176,0.5)` }}>
              {/* Section tabs */}
              <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${BORDER}`, overflowX: "auto" }}>
                {BRAND_SECTIONS.map((sec, i) => (
                  <button
                    key={sec.key}
                    onClick={() => setActiveSection(i)}
                    style={{
                      padding: "10px 16px",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      border: "none",
                      borderBottom: activeSection === i ? `2px solid ${BURGUNDY}` : "2px solid transparent",
                      background: "none",
                      cursor: "pointer",
                      fontWeight: activeSection === i ? 600 : 400,
                      color: activeSection === i ? BURGUNDY : "rgba(44,44,44,0.45)",
                      fontFamily: "'Inter',sans-serif",
                    }}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
              {/* Section answers */}
              <div style={{ padding: "16px 20px 20px" }}>
                {(() => {
                  const sec = BRAND_SECTIONS[activeSection];
                  const data = sub[sec.key] || {};
                  return sec.questions.map((q, i) => {
                    const answer = data[`q${i}`];
                    return (
                      <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid rgba(214,196,176,0.3)" }}>
                        <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)", marginBottom: 4 }}>Q{i + 1}</p>
                        <p style={{ fontSize: 13, color: DARK, fontWeight: 500, marginBottom: 4 }}>{q}</p>
                        <p style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{answer || <span style={{ color: "rgba(44,44,44,0.3)", fontStyle: "italic" }}>No answer provided</span>}</p>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SubmissionsDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [quizSubs, setQuizSubs] = useState([]);
  const [brandSubs, setBrandSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.QuizSubmission.list("-created_date", 200),
      base44.entities.BrandStrategySubmission.list("-created_date", 200),
    ]).then(([quiz, brand]) => {
      setQuizSubs(quiz);
      setBrandSubs(brand);
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

  const TABS = [`Quiz Submissions (${quizSubs.length})`, `Brand Strategy Questionnaires (${brandSubs.length})`];

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter',sans-serif", color: DARK }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <Link to="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: DUSTY_ROSE, textDecoration: "none", fontWeight: 600, marginBottom: 24 }}>
            <ArrowLeft size={12} /> Back to Dashboard
          </Link>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 8 }}>Laura Jane Thomas</p>
              <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 36, color: BURGUNDY, margin: 0 }}>Submissions Dashboard</h1>
            </div>
            <div>
              {activeTab === 0 && (
                <button
                  onClick={() => downloadAllQuizCSV(quizSubs)}
                  style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: BURGUNDY, color: "#fff", border: "none", padding: "10px 20px", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}
                >
                  <Download size={14} /> Export All Quiz CSV
                </button>
              )}
              {activeTab === 1 && (
                <button
                  onClick={() => downloadAllBrandCSV(brandSubs)}
                  style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: BURGUNDY, color: "#fff", border: "none", padding: "10px 20px", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}
                >
                  <Download size={14} /> Export All Brand CSV
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
          {[
            { label: "Quiz Submissions", value: quizSubs.length },
            { label: "Brand Strategy Questionnaires", value: brandSubs.length },
            { label: "Quiz Primary CTA Clicks", value: quizSubs.filter(s => s.primaryCtaClicked).length },
            { label: "Discovery Call Clicks", value: quizSubs.filter(s => s.discoveryCallCtaClicked).length },
          ].map(({ label, value }) => (
            <div key={label} style={{ backgroundColor: "rgba(92,31,46,0.05)", border: `1px solid ${BORDER}`, padding: "24px 28px" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(44,44,44,0.45)", marginBottom: 8, fontFamily: "'Inter',sans-serif" }}>{label}</p>
              <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 40, color: BURGUNDY, lineHeight: 1 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, marginBottom: 32, display: "flex", gap: 0 }}>
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
                fontFamily: "'Inter',sans-serif",
                marginBottom: -1,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Quiz tab */}
        {activeTab === 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {quizSubs.length === 0 ? (
              <p style={{ textAlign: "center", color: "rgba(44,44,44,0.35)", fontSize: 13, padding: "60px 0" }}>No quiz submissions yet.</p>
            ) : (
              quizSubs.map(s => <QuizCard key={s.id} sub={s} />)
            )}
          </motion.div>
        )}

        {/* Brand Strategy tab */}
        {activeTab === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {brandSubs.length === 0 ? (
              <p style={{ textAlign: "center", color: "rgba(44,44,44,0.35)", fontSize: 13, padding: "60px 0" }}>No brand strategy questionnaires yet.</p>
            ) : (
              brandSubs.map(s => <BrandCard key={s.id} sub={s} />)
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}