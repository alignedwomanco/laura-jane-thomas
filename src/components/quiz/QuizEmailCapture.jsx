import React, { useState } from "react";
import { motion } from "framer-motion";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";

export default function QuizEmailCapture({ onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ firstName, email });
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: `1.5px solid rgba(92,31,46,0.3)`,
    padding: "12px 0",
    fontSize: "15px",
    color: "#1A0A0E",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
  };

  return (
    <div
      style={{ backgroundColor: CREAM, minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <p
          className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-8"
          style={{ color: DUSTY_ROSE, fontFamily: "'Inter', sans-serif" }}
        >
          Your Path Is Ready
        </p>

        <h2
          className="font-serif leading-[1.05] tracking-tight mb-6"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            color: "#1A0A0E",
          }}
        >
          Your aligned path is ready.{" "}
          <span className="italic" style={{ color: DUSTY_ROSE }}>
            Where should I send it?
          </span>
        </h2>

        <p
          className="text-[14px] leading-relaxed mb-10"
          style={{ color: "rgba(26,10,14,0.55)", fontFamily: "'Inter', sans-serif" }}
        >
          You will see your result on the next screen. I will also send it to your inbox with the next steps.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-[10px] tracking-[0.18em] uppercase mb-3"
              style={{ color: "rgba(26,10,14,0.5)", fontFamily: "'Inter', sans-serif" }}
            >
              First Name *
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="block text-[10px] tracking-[0.18em] uppercase mb-3"
              style={{ color: "rgba(26,10,14,0.5)", fontFamily: "'Inter', sans-serif" }}
            >
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={inputStyle}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: BURGUNDY,
                color: CREAM,
                fontFamily: "'Inter', sans-serif",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Loading..." : "Show My Result"}
              {!loading && <span>&#8594;</span>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}