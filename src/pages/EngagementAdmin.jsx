import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";
const DARK = "#2C2C2C";
const BORDER = "#D6C4B0";

export default function EngagementAdmin() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.EngagementAcceptance.list("-accepted_at", 100).then((data) => {
      setRecords(data);
      setLoading(false);
    });
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-ZA", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
      timeZone: "Africa/Johannesburg",
    });
  };

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: DARK }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: DUSTY_ROSE, marginBottom: 8 }}>Admin</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 30, color: BURGUNDY, margin: "0 0 6px" }}>Engagement Acceptances</h1>
          <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{records.length} acceptance{records.length !== 1 ? "s" : ""} on record</p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>Loading…</div>
        ) : records.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            No acceptances yet.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${BURGUNDY}` }}>
                  {["Full Name", "Business", "Reg. Number", "Email", "Place", "Date & Time"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px 10px 0", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontWeight: 600 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={r.id || i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <td style={{ padding: "14px 12px 14px 0", fontWeight: 600, color: DARK }}>{r.full_name || "—"}</td>
                    <td style={{ padding: "14px 12px 14px 0", color: DARK }}>{r.company_name || "—"}</td>
                    <td style={{ padding: "14px 12px 14px 0", color: "#666" }}>{r.registration_number || "—"}</td>
                    <td style={{ padding: "14px 12px 14px 0", color: DUSTY_ROSE }}>
                      <a href={`mailto:${r.email}`} style={{ color: DUSTY_ROSE, textDecoration: "none" }}>{r.email || "—"}</a>
                    </td>
                    <td style={{ padding: "14px 12px 14px 0", color: "#666" }}>{r.place_of_acceptance || "—"}</td>
                    <td style={{ padding: "14px 0", color: "#666", whiteSpace: "nowrap" }}>{formatDate(r.accepted_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}