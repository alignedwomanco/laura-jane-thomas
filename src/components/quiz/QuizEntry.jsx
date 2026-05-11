import React from "react";
import { motion } from "framer-motion";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";

export default function QuizEntry({ onBegin }) {
  return (
    <div
      style={{ backgroundColor: CREAM, minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full text-center"
      >
        <p
          className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-8"
          style={{ color: BURGUNDY }}
        >
          Find Your Path
        </p>

        <h1
          className="font-serif leading-[1.0] tracking-tight mb-8"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            color: "#1A0A0E",
          }}
        >
          Find Out How We Should<br />
          <span className="italic">Work Together</span>
        </h1>

        <p
          className="text-base md:text-lg leading-relaxed mb-6"
          style={{ color: "rgba(26,10,14,0.65)", fontFamily: "'Inter', sans-serif" }}
        >
          There are six ways to work with me. Each one is built for a specific moment in a woman's journey, and some women need more than one.
        </p>

        <p
          className="text-[14px] leading-relaxed mb-12"
          style={{ color: "rgba(26,10,14,0.55)", fontFamily: "'Inter', sans-serif", maxWidth: "560px", margin: "0 auto 3rem" }}
        >
          This quiz takes about 3 minutes. You can select more than one answer per question, because real life is not always single-option. At the end, I will show you your aligned path forward, which may be one offer or a sequence of two depending on where you actually are.
        </p>

        <button
          onClick={onBegin}
          className="inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:opacity-90"
          style={{
            backgroundColor: BURGUNDY,
            color: CREAM,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Begin Quiz
          <span className="inline-block transition-transform group-hover:translate-x-1">&#8594;</span>
        </button>
      </motion.div>
    </div>
  );
}