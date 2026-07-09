import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { OAE_QUESTIONS, OAE_SECTIONS } from "@/lib/oaeQuestionData";
import { formatAnswer } from "@/lib/oaeCSVExport";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";
const BORDER = "#D6C4B0";
const DARK = "#2C2C2C";

export default function OAECard({ sub }) {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async (e) => {
    e.stopPropagation();
    setDownloading(true);
    try {
      const res = await base44.functions.invoke("downloadOAESubmissionPDF", { submissionId: sub.id });
      if (res.data?.file_url) {
        window.open(res.data.file_url, "_blank");
      } else {
        alert("Failed to generate PDF.");
      }
    } catch {
      alert("Failed to generate PDF.");
    }
    setDownloading(false);
  };

  return (
    <div style={{ border: `1px solid ${BORDER}`, backgroundColor: "#fff", marginBottom: 8 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
      >
        <div style={{ flex: 1, minWidth: 180 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 2, fontFamily: "'Playfair Display',Georgia,serif" }}>
            {sub.respondent_name || "Anonymous"}
          </p>
          <p style={{ fontSize: 11, color: "rgba(44,44,44,0.5)" }}>{sub.respondent_role || "—"}</p>
        </div>
        <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", backgroundColor: sub.status === "submitted" ? "rgba(92,31,46,0.08)" : "rgba(194,133,139,0.15)", color: sub.status === "submitted" ? BURGUNDY : DUSTY_ROSE, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>
          {sub.status || "draft"}
        </span>
        <p style={{ fontSize: 11, color: "rgba(44,44,44,0.4)", minWidth: 80 }}>
          {sub.submitted_at ? new Date(sub.submitted_at).toLocaleDateString("en-ZA") : "—"}
        </p>
        <button
          onClick={downloadPDF}
          disabled={downloading}
          style={{
            padding: "6px 12px",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            backgroundColor: BURGUNDY,
            color: "#fff",
            border: "none",
            cursor: downloading ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'Inter',sans-serif",
            fontWeight: 600,
            opacity: downloading ? 0.6 : 1,
          }}
        >
          <Download size={12} /> {downloading ? "Generating..." : "PDF"}
        </button>
        {open ? <ChevronUp size={16} color={BURGUNDY} /> : <ChevronDown size={16} color={BURGUNDY} />}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
            <div style={{ padding: "4px 20px 20px", borderTop: `1px solid rgba(214,196,176,0.5)` }}>
              {OAE_SECTIONS.map(section => {
                const questions = OAE_QUESTIONS.filter(q => q.section === section.number);
                const hasContent = questions.some(q => {
                  const val = sub[q.id];
                  return val !== null && val !== undefined && val !== "" && !(Array.isArray(val) && val.length === 0);
                });
                if (!hasContent) return null;
                return (
                  <div key={section.number} style={{ marginTop: 16 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: BURGUNDY, fontFamily: "'Playfair Display',Georgia,serif", marginBottom: 8, paddingBottom: 4, borderBottom: `1px solid rgba(92,31,46,0.15)` }}>
                      Section {section.number} · {section.title}
                    </p>
                    {questions.map(q => {
                      const val = sub[q.id];
                      const answer = formatAnswer(q, val);
                      if (!answer || answer === "—") return null;
                      return (
                        <div key={q.id} style={{ padding: "8px 0", borderBottom: "1px solid rgba(214,196,176,0.3)" }}>
                          <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)", marginBottom: 2 }}>{q.number}</p>
                          <p style={{ fontSize: 12, color: DARK, fontWeight: 500, marginBottom: 4 }}>{q.label}</p>
                          <p style={{ fontSize: 13, color: DARK, lineHeight: 1.6, whiteSpace: "pre-wrap", paddingLeft: 12, borderLeft: `2px solid ${BORDER}` }}>{answer}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}