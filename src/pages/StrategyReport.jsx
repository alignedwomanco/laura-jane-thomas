import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import NavbarMinimal from "@/components/site/NavbarMinimal";
import FooterMinimal from "@/components/site/FooterMinimal";
import ReportContent from "@/components/report/ReportContent";

const ACCENT = "#4A3728";

export default function StrategyReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) { setError("No report ID in URL."); setLoading(false); return; }
    load();
  }, [id]);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      // Fetch by record ID using the SDK's list with a filter on id
      const records = await base44.entities.BrandStrategySubmission.list();
      const found = records.find(r => r.id === id);
      if (!found) {
        setError("Record not found for ID: " + id);
      } else {
        setReport(found);
      }
    } catch (e) {
      setError("Failed to load report: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  const handlePrint = () => window.print();

  // ── Loading ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavbarMinimal />
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <div className="text-center max-w-lg">
            <div className="w-12 h-12 border-2 border-[#ece8e3] rounded-full mx-auto mb-8" style={{ borderTopColor: ACCENT, animation: "spin 1.2s linear infinite" }} />
            <p className="text-[11px] tracking-editorial uppercase font-sans mb-4" style={{ color: ACCENT, letterSpacing: "0.2em" }}>Brand Strategy Diagnostic</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#141414] leading-tight mb-3">
              We are analyzing your responses<br />
              <span className="italic font-normal">and building your strategy.</span>
            </h2>
            <p className="text-[#141414]/45 text-sm font-sans">This takes about 30 seconds.</p>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error / Not found ──────────────────────────────────────────────
  if (error || !report) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavbarMinimal />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="font-serif text-2xl text-[#141414] mb-3">Your report is still processing.</p>
            <p className="text-sm font-sans text-[#141414]/55 mb-6">Please refresh in a moment.</p>
            <button
              onClick={load}
              className="px-6 py-3 text-[11px] tracking-editorial uppercase font-sans text-white mr-4"
              style={{ backgroundColor: ACCENT }}
            >
              Refresh
            </button>
            <Link to="/" className="text-sm font-sans underline" style={{ color: ACCENT }}>Return home</Link>
            {/* Debug info */}
            <div className="mt-8 p-4 bg-[#faf8f5] text-left text-xs font-mono text-[#141414]/50 space-y-1">
              <p>Record ID: {id}</p>
              <p>Error: {error || "none"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Report with empty generatedReport (still processing) ──────────
  if (!report.generatedReport) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavbarMinimal />
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <div className="text-center max-w-md">
            <div className="w-12 h-12 border-2 border-[#ece8e3] rounded-full mx-auto mb-8" style={{ borderTopColor: ACCENT, animation: "spin 1.2s linear infinite" }} />
            <p className="font-serif text-2xl text-[#141414] mb-3">Your report is still processing.</p>
            <p className="text-sm font-sans text-[#141414]/55 mb-6">Please refresh in a moment.</p>
            <button
              onClick={load}
              className="px-6 py-3 text-[11px] tracking-editorial uppercase font-sans text-white"
              style={{ backgroundColor: ACCENT }}
            >
              Refresh
            </button>
            {/* Debug info */}
            <div className="mt-8 p-4 bg-[#faf8f5] text-left text-xs font-mono text-[#141414]/50 space-y-1">
              <p>Record ID: {report.id}</p>
              <p>Status: {report.status}</p>
              <p>generatedReport: {report.generatedReport ? `✓ (${report.generatedReport.length} chars)` : "empty"}</p>
              <p>emailSummary: {report.emailSummary ? `✓ (${report.emailSummary.length} chars)` : "empty"}</p>
            </div>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Full report ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <div className="print:hidden">
        <NavbarMinimal />
      </div>

      {/* Print header */}
      <div className="hidden print:block pt-8 pb-4 px-12 border-b border-[#ece8e3]">
        <p className="font-serif text-2xl text-[#141414]">laurajane<span className="italic">thomas</span></p>
        <p className="text-[10px] tracking-widest uppercase text-[#141414]/50 mt-1">Brand Strategy Report</p>
      </div>

      <main className="flex-1 pt-32 pb-24 px-6 print:pt-8">
        <div className="max-w-3xl mx-auto">

          {/* Debug banner */}
          <div className="mb-6 p-3 bg-[#ece8e3] text-xs font-mono text-[#141414]/60 space-y-1 print:hidden">
            <p>Record ID: {report.id}</p>
            <p>Status: {report.status}</p>
            <p>generatedReport: {report.generatedReport ? `✓ ${report.generatedReport.length} chars` : "❌ empty"}</p>
            <p>emailSummary: {report.emailSummary ? `✓ ${report.emailSummary.length} chars` : "❌ empty"}</p>
          </div>

          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-14 print:mb-8">
            <p className="text-[11px] tracking-editorial uppercase font-sans mb-4 print:hidden" style={{ color: ACCENT, letterSpacing: "0.2em" }}>
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
              <p className="text-[11px] tracking-editorial uppercase font-sans mb-5" style={{ color: "#d0cac4" }}>
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
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-editorial uppercase font-sans text-white transition-all duration-300"
                style={{ backgroundColor: ACCENT }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                Book a Strategy Session →
              </Link>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-editorial uppercase font-sans border border-[#d0cac4] text-[#141414] hover:border-[#141414] transition-all duration-300"
              >
                Download Report
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