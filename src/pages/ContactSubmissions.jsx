import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import NavbarMinimal from "@/components/site/NavbarMinimal";
import FooterMinimal from "@/components/site/FooterMinimal";

const ACCENT = "#4A3728";

const STATUS_STYLES = {
  new: "bg-blue-100 text-blue-800",
  read: "bg-gray-100 text-gray-600",
  replied: "bg-green-100 text-green-800",
  archived: "bg-yellow-100 text-yellow-800",
};

const ALL_STATUSES = ["new", "read", "replied", "archived"];

function StatusBadge({ status }) {
  return (
    <span className={`text-[10px] uppercase tracking-wide px-2 py-1 font-sans ${STATUS_STYLES[status] || STATUS_STYLES.new}`}>
      {status || "new"}
    </span>
  );
}

function SubmissionModal({ submission, onClose, onStatusUpdate }) {
  const [status, setStatus] = useState(submission.status || "new");
  const [saving, setSaving] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setSaving(true);
    await base44.entities.ContactSubmission.update(submission.id, { status: newStatus });
    setStatus(newStatus);
    onStatusUpdate(submission.id, newStatus);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-16 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl shadow-xl" style={{ borderTop: `3px solid ${ACCENT}` }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece8e3]">
          <div>
            <p className="font-sans font-medium text-[#141414]">
              {submission.firstName} {submission.lastName}
            </p>
            <p className="text-xs text-[#141414]/50">{submission.email}</p>
          </div>
          <button onClick={onClose} className="text-[#141414]/40 hover:text-[#141414]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {submission.phone && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#141414]/40 mb-1">Phone</p>
                <p className="text-[#141414]">{submission.phone}</p>
              </div>
            )}
            {submission.subject && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#141414]/40 mb-1">Subject</p>
                <p className="text-[#141414]">{submission.subject}</p>
              </div>
            )}
            {submission.source && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#141414]/40 mb-1">Source</p>
                <p className="text-[#141414]">{submission.source}</p>
              </div>
            )}
            {submission.submittedAt && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#141414]/40 mb-1">Submitted</p>
                <p className="text-[#141414]">
                  {new Date(submission.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            )}
          </div>

          {/* Message */}
          {submission.message && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#141414]/40 mb-2">Message</p>
              <p className="text-sm text-[#141414] leading-relaxed whitespace-pre-wrap bg-[#FAF8F5] p-4">
                {submission.message}
              </p>
            </div>
          )}

          {/* Status update */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#141414]/40 mb-2">Update Status</p>
            <div className="flex gap-2 flex-wrap">
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  disabled={saving || status === s}
                  className={`px-4 py-2 text-[11px] uppercase tracking-wide border transition-all ${
                    status === s
                      ? "border-[#4A3728] bg-[#4A3728] text-white"
                      : "border-[#d0cac4] text-[#141414] hover:border-[#4A3728]"
                  } disabled:opacity-50`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    base44.entities.ContactSubmission.list("-created_date", 200).then((data) => {
      setSubmissions(data);
      setLoading(false);
    });
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status: newStatus } : s));
    if (selected?.id === id) setSelected((prev) => ({ ...prev, status: newStatus }));
  };

  const filtered = filterStatus === "all"
    ? submissions
    : submissions.filter((s) => (s.status || "new") === filterStatus);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <NavbarMinimal />
      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/submissions" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#141414]/45 hover:text-[#141414] mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> All Submissions
          </Link>

          <p className="text-[11px] tracking-[0.2em] uppercase font-sans mb-4" style={{ color: ACCENT }}>Admin</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#141414] leading-tight mb-2">
            Contact <span className="italic font-normal">Submissions</span>
          </h1>
          <p className="text-[#141414]/45 text-sm font-sans mb-8">
            All contact form enquiries. Click a row to view and update status.
          </p>

          {/* Filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            {["all", ...ALL_STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-wide border transition-all ${
                  filterStatus === s
                    ? "border-[#4A3728] bg-[#4A3728] text-white"
                    : "border-[#d0cac4] text-[#141414] hover:border-[#4A3728]"
                }`}
              >
                {s}
                {s !== "all" && (
                  <span className="ml-1.5 opacity-60">
                    ({submissions.filter((x) => (x.status || "new") === s).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="h-px bg-[#ece8e3] mb-6" />

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-[#ece8e3] rounded-full animate-spin" style={{ borderTopColor: ACCENT }} />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-[#141414]/40 text-sm font-sans text-center py-24">No submissions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans border-collapse">
                <thead>
                  <tr className="border-b border-[#ece8e3]">
                    {["Name", "Email", "Phone", "Subject", "Status", "Submitted"].map((h) => (
                      <th key={h} className="text-left pb-3 pr-4 text-[10px] uppercase tracking-widest text-[#141414]/40 font-normal whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub) => (
                    <tr
                      key={sub.id}
                      onClick={() => setSelected(sub)}
                      className="border-b border-[#ece8e3] hover:bg-white cursor-pointer transition-colors"
                    >
                      <td className="py-3 pr-4 font-medium text-[#141414] whitespace-nowrap">
                        {sub.firstName} {sub.lastName}
                      </td>
                      <td className="py-3 pr-4 text-[#141414]/65">{sub.email}</td>
                      <td className="py-3 pr-4 text-[#141414]/55">{sub.phone || "—"}</td>
                      <td className="py-3 pr-4 text-[#141414]/65 max-w-[180px] truncate">{sub.subject || "—"}</td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={sub.status} />
                      </td>
                      <td className="py-3 text-[#141414]/45 whitespace-nowrap">
                        {sub.submittedAt
                          ? new Date(sub.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <FooterMinimal />

      {selected && (
        <SubmissionModal
          submission={selected}
          onClose={() => setSelected(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}