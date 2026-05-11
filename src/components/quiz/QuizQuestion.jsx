import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";

export default function QuizQuestion({ question, qIndex, total, selected, onAnswer, onNext, onBack }) {
  const toggle = (letter) => {
    const current = selected || [];
    if (current.includes(letter)) {
      onAnswer(current.filter((l) => l !== letter));
    } else {
      onAnswer([...current, letter]);
    }
  };

  const canNext = selected && selected.length > 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={qIndex}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: CREAM, minHeight: "100vh" }}
        className="flex flex-col"
      >
        {/* Top bar */}
        <div
          className="w-full px-6 py-6 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(92,31,46,0.12)" }}
        >
          <button
            onClick={onBack}
            className="text-[10px] tracking-[0.18em] uppercase transition-opacity hover:opacity-60"
            style={{ color: BURGUNDY, fontFamily: "'Inter', sans-serif" }}
          >
            &#8592; Back
          </button>
          <p
            className="text-[10px] tracking-[0.18em] uppercase"
            style={{ color: "rgba(26,10,14,0.35)", fontFamily: "'Inter', sans-serif" }}
          >
            {qIndex + 1} of {total}
          </p>
          {/* Thin progress line */}
          <div className="hidden" />
        </div>

        {/* Progress line */}
        <div style={{ height: "2px", backgroundColor: "rgba(92,31,46,0.10)" }}>
          <motion.div
            style={{ height: "2px", backgroundColor: BURGUNDY }}
            initial={{ width: `${((qIndex) / total) * 100}%` }}
            animate={{ width: `${((qIndex + 1) / total) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-xl">
            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-6"
              style={{ color: DUSTY_ROSE, fontFamily: "'Inter', sans-serif" }}
            >
              Question {qIndex + 1}
            </p>
            <h2
              className="font-serif leading-[1.1] tracking-tight mb-10"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                color: "#1A0A0E",
              }}
            >
              {question.question}
            </h2>

            <p
              className="text-[11px] mb-6 tracking-wide"
              style={{ color: "rgba(26,10,14,0.4)", fontFamily: "'Inter', sans-serif" }}
            >
              Select all that apply
            </p>

            <div className="space-y-3 mb-10">
              {question.options.map((opt) => {
                const isSelected = selected && selected.includes(opt.letter);
                return (
                  <button
                    key={opt.letter}
                    type="button"
                    onClick={() => toggle(opt.letter)}
                    className="w-full flex items-start gap-4 px-5 py-4 text-left transition-all duration-200"
                    style={{
                      border: `1.5px solid ${isSelected ? BURGUNDY : "rgba(92,31,46,0.2)"}`,
                      backgroundColor: isSelected ? "rgba(92,31,46,0.06)" : "transparent",
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center border transition-all"
                      style={{
                        borderColor: isSelected ? BURGUNDY : "rgba(92,31,46,0.3)",
                        backgroundColor: isSelected ? BURGUNDY : "transparent",
                      }}
                    >
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#F5EDE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span
                      className="text-[14px] leading-relaxed"
                      style={{
                        color: isSelected ? "#1A0A0E" : "rgba(26,10,14,0.7)",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: isSelected ? 500 : 400,
                      }}
                    >
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={onNext}
                disabled={!canNext}
                className="inline-flex items-center gap-3 px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all duration-300"
                style={{
                  backgroundColor: canNext ? BURGUNDY : "rgba(92,31,46,0.25)",
                  color: CREAM,
                  fontFamily: "'Inter', sans-serif",
                  cursor: canNext ? "pointer" : "not-allowed",
                }}
              >
                {qIndex < 7 ? "Next" : "See My Result"}
                <span>&#8594;</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}