import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import NavbarMinimal from "@/components/site/NavbarMinimal";
import FooterMinimal from "@/components/site/FooterMinimal";
import { generateAnswersPDF } from "@/lib/generateAnswersPDF";

const ACCENT = "#4A3728";

const SECTIONS_MAP = [
  { key: "businessFoundation", title: "Business Foundation", questions: [
    "What are you actually selling — not the category, but the outcome?",
    "If someone paid you tomorrow, what exactly would they receive?",
    "What would someone Google to find you, honestly?",
    "What problem are you solving that people are already paying to fix?",
    "Where does your business make money first, and where does it scale later?",
    "If this business worked perfectly, how would it generate revenue?",
    "If you could not sell your current offer, what would you sell instead?",
  ]},
  { key: "audienceInsight", title: "Audience Insight", questions: [
    "Who frustrates you the most in your audience and why?",
    "Who do you want more of?",
    "What do your best clients have in common?",
    "What does your audience say they want vs. what they actually need?",
    "What are they tired of hearing in your industry?",
    "If your audience was in a room, what would they be too embarrassed to admit?",
  ]},
  { key: "positioning", title: "Positioning & Differentiation", questions: [
    "What do you do that others technically do, but not like you?",
    "What do you believe your industry gets wrong?",
    "Where are you playing small to stay palatable?",
    "If you removed 80% of your offer, what would remain?",
    "What are you over-explaining that should be obvious?",
    "If a competitor copied you, what could they never replicate?",
  ]},
  { key: "brandTruth", title: "Brand Truth", questions: [
    "What part of your brand is performative?",
    "Where are you trying to sound like someone else?",
    "What are you afraid to say publicly?",
    "What would your brand say if it had nothing to lose?",
    "What do people misunderstand about your brand?",
    "If your business became wildly successful overnight, what would you lose?",
  ]},
  { key: "brandEssence", title: "Brand Essence", questions: [
    "If your brand were a character or guide, who would it be?",
    "What deeper truth does your brand stand for?",
    "What do you want people to feel when they interact with your brand?",
  ]},
  { key: "visionGrowth", title: "Vision & Growth", questions: [
    "What future are you building through this brand?",
    "What needs to change to get there?",
    "What opportunities are you not pursuing but should be?",
  ]},
  { key: "legacyValues", title: "Legacy & Values", questions: [
    "What would people say about your brand if you were not in the room?",
    "What do you want to be known for in 10 years?",
    "What would make your brand irreplaceable?",
    "What would matter most if you had to teach this business to someone else?",
    "What does your brand protect?",
  ]},
];

function AnswersSummary({ report }) {
  return (
    <div className="space-y-12">
      {/* Operations snapshot */}
      {report.operationsBudget && Object.keys(report.operationsBudget).length > 0 && (
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-6 pb-3 border-b border-[#ece8e3]" style={{ color: ACCENT }}>
            Operations & Budget
          </p>
          <div className="space-y-4">
            {report.operationsBudget.budget && <AnswerItem q="Budget" a={report.operationsBudget.budget} />}
            {report.operationsBudget.support?.length > 0 && <AnswerItem q="Support needed" a={report.operationsBudget.support.join(", ")} />}
            {report.operationsBudget.workingModel && <AnswerItem q="Working model" a={report.operationsBudget.workingModel} />}
            {report.operationsBudget.agencyExp && <AnswerItem q="Past agency experience" a={report.operationsBudget.agencyExp} />}
            {report.operationsBudget.different && <AnswerItem q="What needs to be different" a={report.operationsBudget.different} />}
          </div>
        </div>
      )}

      {SECTIONS_MAP.map(({ key, title, questions }) => {
        const data = report[key];
        if (!data) return null;
        const hasAnswers = questions.some((_, i) => data[`q${i}`]?.trim());
        if (!hasAnswers) return null;
        return (
          <div key={key}>
            <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-6 pb-3 border-b border-[#ece8e3]" style={{ color: ACCENT }}>
              {title}
            </p>
            <div className="space-y-6">
              {questions.map((q, i) => {
                const answer = data[`q${i}`];
                if (!answer?.trim()) return null;
                return <AnswerItem key={i} q={q} a={answer} />;
              })}
            </div>
          </div>
        );
      })}

      {/* Core values */}
      {report.legacyValues?.values?.length > 0 && (
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-4 pb-3 border-b border-[#ece8e3]" style={{ color: ACCENT }}>
            Core Values
          </p>
          <div className="flex flex-wrap gap-2">
            {report.legacyValues.values.map(v => (
              <span key={v} className="px-4 py-2 text-sm font-sans border border-[#d0cac4] text-[#141414]">{v}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnswerItem({ q, a }) {
  return (
    <div>
      <p className="text-sm font-sans text-[#141414]/50 mb-1 italic">{q}</p>
      <p className="text-base font-sans text-[#141414] leading-relaxed">{a}</p>
    </div>
  );
}

export default function StrategyReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState(null);

  useEffect(() => {
    if (!id) { setError("No report ID in URL."); setLoading(false); return; }
    loadReport();
  }, [id]);

  async function loadReport() {
    setLoading(true);
    setError(null);
    try {
      // Fetch the specific record by ID via backend function (bypasses login requirement)
      const res = await base44.functions.invoke("getBrandStrategyReport", { id });
      const found = res.data?.record;

      if (!found) {
        setError("Record not found for ID: " + id);
        setLoading(false);
        return;
      }

      setDebug({
        recordId: found.id,
        status: found.status,
        hasBusinessFoundation: Object.keys(found.businessFoundation || {}).length > 0,
        hasGeneratedReport: !!found.generatedReport,
        reportLength: found.generatedReport?.length || 0,
        hasEmailSummary: !!found.emailSummary,
        summaryLength: found.emailSummary?.length || 0,
      });

      setReport(found);
      setLoading(false);
    } catch (e) {
      setError("Failed: " + e.message);
      setLoading(false);
    }
  }

  const handlePrint = () => window.print();
  const handleDownloadAnswers = () => generateAnswersPDF(report);

  // ── Loading ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavbarMinimal />
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <div className="text-center max-w-lg">
            <div className="w-12 h-12 border-2 border-[#ece8e3] rounded-full mx-auto mb-8" style={{ borderTopColor: ACCENT, animation: "spin 1.2s linear infinite" }} />
            <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-4" style={{ color: ACCENT }}>Brand Strategy Diagnostic</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#141414] leading-tight mb-3">
              Loading your answers…
            </h2>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────
  if (error || !report) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavbarMinimal />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="font-serif text-2xl text-[#141414] mb-3">Something went wrong.</p>
            <p className="text-sm font-sans text-[#141414]/55 mb-6">{error}</p>
            <button
              onClick={loadReport}
              className="px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-sans text-white mr-4"
              style={{ backgroundColor: ACCENT }}
            >
              Try Again
            </button>
            <Link to="/" className="text-sm font-sans underline" style={{ color: ACCENT }}>Return home</Link>

            {debug && (
              <div className="mt-8 p-4 bg-[#faf8f5] text-left text-xs font-mono text-[#141414]/50 space-y-1">
                <p>Record ID: {debug.recordId || id}</p>
                <p>Status: {debug.status}</p>
                <p>businessFoundation has data: {String(debug.hasBusinessFoundation)}</p>
                <p>generatedReport: {debug.hasGeneratedReport ? `✓ (${debug.reportLength} chars)` : "❌ empty"}</p>
                <p>emailSummary: {debug.hasEmailSummary ? `✓ (${debug.summaryLength} chars)` : "❌ empty"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Full report ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <div className="print:hidden">
        <NavbarMinimal />
      </div>

      <div className="hidden print:block pt-8 pb-4 px-12 border-b border-[#ece8e3]">
        <p className="font-serif text-2xl text-[#141414]">laurajane<span className="italic">thomas</span></p>
        <p className="text-[10px] tracking-widest uppercase text-[#141414]/50 mt-1">Brand Strategy Report</p>
      </div>

      <main className="flex-1 pt-32 pb-24 px-6 print:pt-8">
        <div className="max-w-3xl mx-auto">



          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-14 print:mb-8" data-print-header>
            <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-4 print:hidden" style={{ color: ACCENT }}>
              Brand Strategy Diagnostic
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#141414] leading-[0.95] tracking-tight mb-4 print:text-3xl print:mb-2">
              {report.firstName ? `${report.firstName}'s` : "Your"}{" "}
              <span className="italic font-normal">Brand Strategy Report</span>
            </h1>
            {report.company && <p className="text-[#141414]/50 text-sm font-sans print:text-xs print:mb-1">{report.company}</p>}
            {report.submittedAt && (
              <p className="text-[#141414]/35 text-xs font-sans mt-2 print:mt-1">
                {new Date(report.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
            <div className="mt-8 h-px bg-[#ece8e3] print:mt-4" />
          </motion.div>

          {/* Answers Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            <AnswersSummary report={report} />
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-20 pt-12 border-t border-[#ece8e3] print:hidden"
          >
            <p className="font-serif text-2xl md:text-3xl text-[#141414] leading-tight mb-3">Ready to act on this?</p>
            <p className="text-[#141414]/55 text-sm font-sans mb-8 max-w-md">
              Book a strategy session with Laura to walk through these findings and map your next move.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://laurajanethomas.biz/contact"
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans text-white transition-all duration-300"
                style={{ backgroundColor: ACCENT }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                Book a Strategy Session →
              </a>
              <button
                onClick={handleDownloadAnswers}
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans border border-[#d0cac4] text-[#141414] hover:border-[#141414] transition-all duration-300"
              >
                Download All Answers
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          @page { 
            size: A4; 
            margin: 1.5cm 2cm; 
            orphans: 3; 
            widows: 3; 
          }
          
          html, body { 
            height: auto !important; 
            background: white !important;
          }
          
          main { 
            padding-top: 0 !important; 
            padding-bottom: 0 !important; 
            max-width: 100% !important;
            padding-left: 0.5cm !important;
            padding-right: 0.5cm !important;
          }
          
          .max-w-3xl {
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          /* Section spacing optimization */
          [data-report-section] {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 0.6cm !important;
          }
          
          /* Keep insights box compact */
          [data-insights] {
            margin-bottom: 0.8cm !important;
            padding: 0.8cm !important;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          [data-insights] p {
            margin-bottom: 0.3cm !important;
          }
          
          /* Prevent orphaned headings */
          h1, h2, h3 {
            page-break-after: avoid;
            orphans: 3;
          }
          
          /* Paragraph spacing */
          p {
            margin-bottom: 0.3cm !important;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Allow lists to flow naturally */
          ul, ol {
            margin-bottom: 0.4cm !important;
            page-break-inside: auto;
            break-inside: auto;
          }
          
          li {
            margin-bottom: 0.2cm !important;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Prevent excessive spacing around motion elements */
          [class*="motion"] {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Remove animations and transitions in print */
          * {
            animation: none !important;
            transition: none !important;
          }
          
          /* Header/footer optimization */
          [data-print-header] {
            margin-bottom: 0.8cm !important;
            padding-bottom: 0.6cm !important;
            border-bottom: 0.5pt solid #ece8e3 !important;
          }
          
          /* Divider spacing */
          .mt-8 { margin-top: 0.4cm !important; }
          .mb-4 { margin-bottom: 0.2cm !important; }
          .mb-6 { margin-bottom: 0.4cm !important; }
          .mb-8 { margin-bottom: 0.5cm !important; }
          .mb-14 { margin-bottom: 0.8cm !important; }
          .space-y-3 > * + * { margin-top: 0.2cm !important; }
          .space-y-6 > * + * { margin-top: 0.4cm !important; }
        }
      `}</style>

      <div className="print:hidden">
        <FooterMinimal />
      </div>
    </div>
  );
}