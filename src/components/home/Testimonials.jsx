import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    headline: "Laura has an extraordinary gift for translating messy ideas into clear, compelling vision.",
    quote:
      "She doesn't just 'get' what's in your head, she elevates it beyond what you thought was possible. Her blend of strategic insight, creative brilliance, and intuition is unmatched. I can't recommend her highly enough.",
    name: "Wendy Mahoney",
    company: "Newmella Holdings",
  },
  {
    headline: "We have never experienced such rapid and consistent elevation of our brand.",
    quote:
      "Their strategic alignment of both our internal and external communications, coupled with their ability to manage high-level partnerships, has redefined what is possible.",
    name: "Ubank Leadership",
    company: "Ubank",
  },
  {
    headline: "A strategic partner who truly understands what it means to build a brand with purpose.",
    quote:
      "Laura brought clarity to our positioning and helped us communicate our value in a way that finally resonated. The results spoke for themselves.",
    name: "Client",
    company: "Confidential",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const total = testimonials.length;

  const next = () => setI((prev) => (prev + 1) % total);
  const prev = () => setI((prev) => (prev - 1 + total) % total);

  const getIndex = (offset) => (i + offset + total) % total;

  return (
    <section className="bg-ivory text-foreground py-24 md:py-40 border-t border-foreground/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-20">
          — Client Love
        </p>

        {/* Scrolling carousel */}
        <div className="relative flex items-start justify-center gap-8 md:gap-16">
          {/* Previous */}
          <div
            className="hidden md:block flex-1 text-left cursor-pointer select-none transition-opacity duration-500"
            style={{ opacity: 0.4 }}
            onClick={prev}
          >
            <h2 className="font-serif font-bold text-2xl md:text-3xl leading-[1.05] tracking-tight uppercase mb-4">
              "{testimonials[getIndex(-1)].headline}"
            </h2>
            <p className="text-[10px] tracking-widest uppercase text-foreground/70 leading-relaxed mb-4">
              "{testimonials[getIndex(-1)].quote}"
            </p>
            <p className="font-serif italic text-base text-foreground/80">
              — {testimonials[getIndex(-1)].name}
            </p>
          </div>

          {/* Active */}
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-full md:w-[44%] text-center"
            >
              <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight uppercase mb-8">
                "{testimonials[i].headline}"
              </h2>
              <p className="text-[11px] md:text-xs tracking-widest uppercase text-foreground/70 leading-relaxed max-w-xl mx-auto mb-8">
                "{testimonials[i].quote}"
              </p>
              <p className="font-serif italic text-xl text-foreground/80">
                — {testimonials[i].name}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          <div
            className="hidden md:block flex-1 text-right cursor-pointer select-none transition-opacity duration-500"
            style={{ opacity: 0.4 }}
            onClick={next}
          >
            <h2 className="font-serif font-bold text-2xl md:text-3xl leading-[1.05] tracking-tight uppercase mb-4">
              "{testimonials[getIndex(1)].headline}"
            </h2>
            <p className="text-[10px] tracking-widest uppercase text-foreground/70 leading-relaxed mb-4">
              "{testimonials[getIndex(1)].quote}"
            </p>
            <p className="font-serif italic text-base text-foreground/80">
              — {testimonials[getIndex(1)].name}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 border border-foreground/30 flex items-center justify-center hover:bg-foreground hover:text-ivory transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] tracking-editorial uppercase text-muted-foreground">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={next}
            aria-label="Next"
            className="w-10 h-10 border border-foreground/30 flex items-center justify-center hover:bg-foreground hover:text-ivory transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-20">
          Laura Jane Thomas
        </p>
      </div>
    </section>
  );
}