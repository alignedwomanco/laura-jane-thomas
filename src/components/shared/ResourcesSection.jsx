import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const resources = [
  {
    number: "01",
    label: "E-BOOK · FREE",
    title: "The Burnout Prevention",
    titleHighlight: "E-book.",
    description: "For every successful woman quietly unraveling — the five tools that saved me, and a path back to a life that feels as good as it looks.",
    specs: "",
    cta: "Download",
    bg: "linear-gradient(135deg, #A85A7C 0%, #6B2D5E 100%)",
  },
  {
    number: "02",
    label: "BODY-LED WORK",
    title: "Nervous System",
    titleHighlight: "Reset.",
    description: "Rebuild your energy, focus, and sense of safety from the inside out. A guided practice for the woman who can think her way through anything — and is tired of having to.",
    specs: "",
    cta: "BEGIN",
    bg: "linear-gradient(135deg, #9B6B56 0%, #6B3E4D 100%)",
  },
  {
    number: "03",
    label: "SIGNATURE COURSE",
    title: "The Aligned Woman",
    titleHighlight: "Blueprint.",
    description: "The full A.L.I.V.E. Method, structured into a self-paced course. Five stages to rebuild what comes next on a foundation that is honest.",
    specs: "",
    cta: "ENROL",
    bg: "linear-gradient(135deg, #935170 0%, #7B4A6B 100%)",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ResourcesSection() {
  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-20">
          <div className="flex items-baseline justify-between gap-8 mb-8 pb-8 border-b border-foreground/20">
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight">
              Resources<span className="text-accent">.</span>
            </h2>
            <p className="font-serif italic text-base md:text-lg text-muted-foreground text-right max-w-xs flex-shrink-0">
              The tools, frameworks, and reading I return to most.
            </p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, idx) => (
            <motion.div
              key={idx}
              {...fadeUp(idx * 0.1)}
              className="flex flex-col h-full"
            >
              {/* Card Container */}
              <div
                className="flex-1 rounded-lg p-8 md:p-10 flex flex-col text-white overflow-hidden relative"
                style={{ background: resource.bg }}
              >
                {/* Number Badge */}
                <div className="mb-auto">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white text-[11px] font-semibold mb-6">
                    {resource.number}
                  </span>
                  <p className="text-[10px] tracking-editorial uppercase text-white/70 mb-6">
                    {resource.label}
                  </p>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-3xl leading-[1.1] mb-6">
                  {resource.title}{" "}
                  <span className="italic font-normal">{resource.titleHighlight}</span>
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/85 mb-8 flex-grow">
                  {resource.description}
                </p>
              </div>

              {/* Footer - Specs and CTA */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] tracking-editorial uppercase text-foreground/60">
                  {resource.specs}
                </span>
                {idx === 0 ? (
                  <a
                    href="https://media.base44.com/files/public/69e1e7f05d39205bc001ea00/847f6fdb1_The-5-Tools-That-Saved-Me-eBook-LJT-1.pdf"
                    download
                    className="text-[11px] tracking-editorial uppercase border-b border-foreground hover:text-accent transition-colors"
                  >
                    {resource.cta} →
                  </a>
                ) : idx === 1 ? (
                  <a
                    href="https://media.base44.com/files/public/69e1e7f05d39205bc001ea00/a7e23f2df_LJT-Nervous-System-Doc_compressed.pdf"
                    download
                    className="text-[11px] tracking-editorial uppercase border-b border-foreground hover:text-accent transition-colors"
                  >
                    {resource.cta} →
                  </a>
                ) : (
                  <a
                    href="https://alignedwomanco.com/blueprint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-editorial uppercase border-b border-foreground hover:text-accent transition-colors"
                  >
                    {resource.cta} →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}