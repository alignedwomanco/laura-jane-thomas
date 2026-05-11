import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";

const RESULT_COLORS = {
  "The Clarity Sprint": "#7B3D4A",
  "The Aligned Woman Blueprint": "#A85A7C",
  "The Alignment Audit": "#9B6B56",
  "The Recalibration Intensive": "#6B2D5E",
  "The Senior Advisory": "#5C1F2E",
  "Business Consulting": "#3A1E2A",
};

function StatCard({ label, value, sub }) {
  return (
    <div
      className="p-6 md:p-8"
      style={{ backgroundColor: "rgba(92,31,46,0.05)", border: "1px solid rgba(92,31,46,0.12)" }}
    >
      <p className="text-[10px] tracking-[0.18em] uppercase mb-3" style={{ color: "rgba(26,10,14,0.4)", fontFamily: "'Inter', sans-serif" }}>
        {label}
      </p>
      <p className="font-serif text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: BURGUNDY }}>
        {value}
      </p>
      {sub && (
        <p className="text-[12px] mt-2" style={{ color: "rgba(26,10,14,0.45)", fontFamily: "'Inter', sans-serif" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function QuizAdmin() {
  const [events, setEvents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.QuizEvent.list("-created_date", 500),
      base44.entities.QuizSubmission.list("-created_date", 200),
    ]).then(([evts, subs]) => {
      setEvents(evts);
      setSubmissions(subs);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: CREAM, minHeight: "100vh" }} className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: BURGUNDY, borderTopColor: "transparent" }} />
      </div>
    );
  }

  // Compute stats
  const starts = events.filter((e) => e.eventType === "quiz_start").length;
  const completions = submissions.length;
  const completionRate = starts > 0 ? Math.round((completions / starts) * 100) : 0;

  // Result distribution
  const resultDist = {};
  submissions.forEach((s) => {
    if (s.primaryResult) {
      resultDist[s.primaryResult] = (resultDist[s.primaryResult] || 0) + 1;
    }
  });

  // CTA clicks
  const primaryClicks = events.filter((e) => e.eventType === "primary_cta_click").length;
  const secondaryClicks = events.filter((e) => e.eventType === "secondary_cta_click").length;
  const discoveryClicks = events.filter((e) => e.eventType === "discovery_call_click").length;
  const resultViews = events.filter((e) => e.eventType === "result_view").length;
  const primaryCtr = resultViews > 0 ? Math.round((primaryClicks / resultViews) * 100) : 0;

  // Drop-off by question
  const questionViews = {};
  for (let i = 1; i <= 8; i++) {
    questionViews[i] = events.filter((e) => e.eventType === "question_view" && e.questionNumber === i).length;
  }

  // Recent submissions
  const recent = submissions.slice(0, 10);

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] tracking-[0.22em] uppercase mb-4 font-semibold" style={{ color: BURGUNDY }}>
            Quiz Analytics
          </p>
          <h1 className="font-serif text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1A0A0E" }}>
            Quiz Dashboard
          </h1>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard label="Quiz Starts" value={starts} />
          <StatCard label="Completions" value={completions} />
          <StatCard label="Completion Rate" value={`${completionRate}%`} />
          <StatCard label="Primary CTA CTR" value={`${primaryCtr}%`} sub={`${primaryClicks} clicks / ${resultViews} views`} />
        </div>

        {/* CTA breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <StatCard label="Primary CTA Clicks" value={primaryClicks} />
          <StatCard label="Secondary CTA Clicks" value={secondaryClicks} />
          <StatCard label="Discovery Call Clicks" value={discoveryClicks} />
        </div>

        {/* Result distribution */}
        <div className="mb-14">
          <p className="text-[10px] tracking-[0.2em] uppercase mb-6 font-semibold" style={{ color: "rgba(26,10,14,0.4)" }}>
            Result Distribution
          </p>
          <div className="space-y-3">
            {Object.entries(resultDist)
              .sort(([, a], [, b]) => b - a)
              .map(([result, count]) => {
                const pct = completions > 0 ? Math.round((count / completions) * 100) : 0;
                return (
                  <div key={result}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[12px]" style={{ color: "#1A0A0E" }}>{result}</p>
                      <p className="text-[12px] font-semibold" style={{ color: BURGUNDY }}>{count} ({pct}%)</p>
                    </div>
                    <div style={{ height: "4px", backgroundColor: "rgba(92,31,46,0.1)", borderRadius: "2px" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ height: "4px", backgroundColor: RESULT_COLORS[result] || BURGUNDY, borderRadius: "2px" }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Drop-off by question */}
        <div className="mb-14">
          <p className="text-[10px] tracking-[0.2em] uppercase mb-6 font-semibold" style={{ color: "rgba(26,10,14,0.4)" }}>
            Question View Drop-off
          </p>
          <div className="space-y-3">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((qNum) => {
              const views = questionViews[qNum] || 0;
              const pct = starts > 0 ? Math.round((views / starts) * 100) : 0;
              return (
                <div key={qNum}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[12px]" style={{ color: "#1A0A0E" }}>Question {qNum}</p>
                    <p className="text-[12px] font-semibold" style={{ color: BURGUNDY }}>{views} views ({pct}%)</p>
                  </div>
                  <div style={{ height: "4px", backgroundColor: "rgba(92,31,46,0.1)", borderRadius: "2px" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: qNum * 0.05 }}
                      style={{ height: "4px", backgroundColor: DUSTY_ROSE, borderRadius: "2px" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent submissions */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase mb-6 font-semibold" style={{ color: "rgba(26,10,14,0.4)" }}>
            Recent Submissions
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(92,31,46,0.15)" }}>
                  {["Name", "Email", "Primary Result", "Secondary Result", "Submitted"].map((h) => (
                    <th
                      key={h}
                      className="text-left pb-3 pr-6 text-[10px] tracking-[0.15em] uppercase"
                      style={{ color: "rgba(26,10,14,0.4)", fontWeight: 500 }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((s, i) => (
                  <tr key={s.id || i} style={{ borderBottom: "1px solid rgba(92,31,46,0.08)" }}>
                    <td className="py-3 pr-6" style={{ color: "#1A0A0E" }}>{s.firstName}</td>
                    <td className="py-3 pr-6" style={{ color: "rgba(26,10,14,0.6)" }}>{s.email}</td>
                    <td className="py-3 pr-6" style={{ color: BURGUNDY, fontWeight: 500 }}>{s.primaryResult}</td>
                    <td className="py-3 pr-6" style={{ color: DUSTY_ROSE }}>{s.secondaryResult || "None"}</td>
                    <td className="py-3" style={{ color: "rgba(26,10,14,0.45)" }}>
                      {s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))}
                {recent.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center" style={{ color: "rgba(26,10,14,0.35)" }}>
                      No submissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}