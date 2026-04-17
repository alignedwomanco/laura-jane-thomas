import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import NavbarMinimal from "@/components/site/NavbarMinimal";
import FooterMinimal from "@/components/site/FooterMinimal";
import ReportContent from "@/components/report/ReportContent";
import { generateBrandStrategyPDF } from "@/lib/generatePDF";
import { generateAnswersPDF } from "@/lib/generateAnswersPDF";

const ACCENT = "#4A3728";

export default function StrategyReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
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
      // Fetch the specific record by ID
      const all = await base44.entities.BrandStrategySubmission.list();
      const found = all.find(r => r.id === id);

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

      // If report already exists, show it
      if (found.generatedReport) {
        setReport(found);
        setLoading(false);
        return;
      }

      // No report yet — trigger generation from the existing saved answers
      setLoading(false);
      setGenerating(true);
      const res = await base44.functions.invoke("generateReportFromExisting", { recordId: found.id });
      const genDebug = res.data?.debug;
      if (genDebug) setDebug(prev => ({ ...prev, ...genDebug }));

      // Re-fetch the record now that it should have the report
      const all2 = await base44.entities.BrandStrategySubmission.list();
      const updated = all2.find(r => r.id === found.id);
      if (updated?.generatedReport) {
        setReport(updated);
      } else {
        setError("Report generation ran but generatedReport is still empty. The questionnaire data in this record may be missing — please submit the questionnaire again.");
      }
      setGenerating(false);
    } catch (e) {
      setError("Failed: " + e.message);
      setLoading(false);
      setGenerating(false);
    }
  }

  const handlePrint = () => window.print();
  const handleDownloadPDF = () => generateBrandStrategyPDF(report);
  const handleDownloadAnswers = () => generateAnswersPDF(report);

  // ── Loading ────────────────────────────────────────────────────────
  if (loading || generating) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavbarMinimal />
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <div className="text-center max-w-lg">
            <div className="w-12 h-12 border-2 border-[#ece8e3] rounded-full mx-auto mb-8" style={{ borderTopColor: ACCENT, animation: "spin 1.2s linear infinite" }} />
            <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-4" style={{ color: ACCENT }}>Brand Strategy Diagnostic</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#141414] leading-tight mb-3">
              {generating ? "Generating your strategy report…" : "Loading your report…"}<br />
              <span className="italic font-normal">This takes about 30 seconds.</span>
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

          {/* Debug banner */}
          {debug && (
            <div className="mb-6 p-3 bg-[#ece8e3] text-xs font-mono text-[#141414]/60 space-y-1 print:hidden">
              <p>Record ID: {debug.recordId}</p>
              <p>businessFoundation has data: {String(debug.hasBusinessFoundation)}</p>
              <p>generatedReport: {debug.hasGeneratedReport ? `✓ ${debug.reportLength} chars` : "❌ empty"}</p>
              <p>emailSummary: {debug.hasEmailSummary ? `✓ ${debug.summaryLength} chars` : "❌ empty"}</p>
            </div>
          )}

          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-14 print:mb-8">
            <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-4 print:hidden" style={{ color: ACCENT }}>
              Brand Strategy Diagnostic
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#141414] leading-[0.95] tracking-tight mb-4">
              {report.firstName ? `${report.firstName}'s` : "Your"}{" "}
              <span className="italic font-normal">Brand Strategy Report</span>
            </h1>
            {report.company && <p className="text-[#141414]/50 text-sm font-sans">{report.company}</p>}
            {report.submittedAt && (
              <p className="text-[#141414]/35 text-xs font-sans mt-2">
                {new Date(report.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
            <div className="mt-8 h-px bg-[#ece8e3]" />
          </motion.div>

          {/* Key insights summary */}
          {report.emailSummary && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
              className="mb-14 p-8 bg-[#141414] print:border print:border-[#ece8e3] print:bg-white"
            >
              <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-5" style={{ color: "#d0cac4" }}>
                Key Strategic Insights
              </p>
              <div className="space-y-3">
                {report.emailSummary.split("\n").filter(l => l.trim()).map((line, i) => (
                  <p key={i} className="text-white print:text-[#141414] text-sm font-sans leading-relaxed">
                    {line.startsWith("•") ? line : `• ${line}`}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Full report content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
            <ReportContent content={report.generatedReport} />
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-20 pt-12 border-t border-[#ece8e3] print:hidden"
          >
            <p className="font-serif text-2xl md:text-3xl text-[#141414] leading-tight mb-3">Ready to act on this?</p>
            <p className="text-[#141414]/55 text-sm font-sans mb-8 max-w-md">
              Book a strategy session with Laura to walk through these findings and map your next move.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://laurajanethomas.biz/contact-us/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans text-white transition-all duration-300"
                style={{ backgroundColor: ACCENT }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                Book a Strategy Session →
              </a>
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans border border-[#d0cac4] text-[#141414] hover:border-[#141414] transition-all duration-300"
              >
                Download Report PDF
              </button>
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
          @page { margin: 2cm; }
        }
      `}</style>

      <div className="print:hidden">
        <FooterMinimal />
      </div>
    </div>
  );
}