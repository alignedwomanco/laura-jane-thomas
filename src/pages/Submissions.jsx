import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { generateBrandStrategyPDF } from "@/lib/generatePDF";
import { Link } from "react-router-dom";
import { Download, ExternalLink, FileText, Mail } from "lucide-react";
import NavbarMinimal from "@/components/site/NavbarMinimal";
import FooterMinimal from "@/components/site/FooterMinimal";

const ACCENT = "#4A3728";

const STATUS_STYLES = {
  complete: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  pending: "bg-gray-100 text-gray-600",
  error: "bg-red-100 text-red-700",
};

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    base44.entities.BrandStrategySubmission.list("-created_date", 100).then(data => {
      setSubmissions(data);
      setLoading(false);
    });
  }, []);

  const handleDownload = (submission) => {
    setDownloading(submission.id);
    try {
      generateBrandStrategyPDF(submission);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <NavbarMinimal />
      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-4" style={{ color: ACCENT }}>Admin</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#141414] leading-tight mb-2">
            Brand Strategy <span className="italic font-normal">Submissions</span>
          </h1>
          <p className="text-[#141414]/45 text-sm font-sans mb-8">All questionnaire submissions. Download individual PDF reports below.</p>

          {/* Section links */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link to="/quiz-admin" className="flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-wide border border-[#d0cac4] text-[#141414] hover:border-[#4A3728] transition-colors font-sans">
              <FileText className="w-3.5 h-3.5" /> Quiz Submissions
            </Link>
            <Link to="/contact-submissions" className="flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-wide border border-[#d0cac4] text-[#141414] hover:border-[#4A3728] transition-colors font-sans">
              <Mail className="w-3.5 h-3.5" /> Contact Submissions
            </Link>
            <Link to="/quiz-admin/emails" className="flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-wide border border-[#d0cac4] text-[#141414] hover:border-[#4A3728] transition-colors font-sans">
              <FileText className="w-3.5 h-3.5" /> Email Queue
            </Link>
          </div>

          <div className="h-px bg-[#ece8e3] mb-10" />

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-[#ece8e3] rounded-full" style={{ borderTopColor: ACCENT, animation: "spin 1.2s linear infinite" }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : submissions.length === 0 ? (
            <p className="text-[#141414]/40 text-sm font-sans text-center py-24">No submissions yet.</p>
          ) : (
            <div className="space-y-3">
              {submissions.map(sub => (
                <div key={sub.id} className="bg-white border border-[#ece8e3] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <FileText className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                    <div>
                      <p className="font-sans font-medium text-[#141414] text-sm">
                        {sub.fullName || sub.firstName || "—"}
                        {sub.company && <span className="text-[#141414]/45 font-normal"> · {sub.company}</span>}
                      </p>
                      <p className="text-xs font-sans text-[#141414]/40 mt-0.5">{sub.email}</p>
                      {sub.submittedAt && (
                        <p className="text-xs font-sans text-[#141414]/35 mt-0.5">
                          {new Date(sub.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[10px] uppercase tracking-wide px-2 py-1 font-sans ${STATUS_STYLES[sub.status] || STATUS_STYLES.pending}`}>
                      {sub.status || "pending"}
                    </span>

                    {sub.generatedReport && (
                      <Link
                        to={`/strategy-report/${sub.id}`}
                        target="_blank"
                        className="flex items-center gap-1.5 px-4 py-2 text-[11px] tracking-wide uppercase font-sans border border-[#d0cac4] text-[#141414] hover:border-[#141414] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View
                      </Link>
                    )}

                    <button
                      onClick={() => handleDownload(sub)}
                      disabled={!sub.generatedReport || downloading === sub.id}
                      className="flex items-center gap-1.5 px-4 py-2 text-[11px] tracking-wide uppercase font-sans text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ backgroundColor: ACCENT }}
                      title={!sub.generatedReport ? "Report not yet generated" : "Download PDF"}
                    >
                      <Download className="w-3.5 h-3.5" />
                      {downloading === sub.id ? "…" : "PDF"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <FooterMinimal />
    </div>
  );
}