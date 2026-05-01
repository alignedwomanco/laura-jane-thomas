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
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  const next = () => setI((i + 1) % testimonials.length);
  const prev = () => setI((i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-ivory text-foreground py-24 md:py-40 border-t border-foreground/10">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-20">
          — Client Love
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight uppercase mb-8">
              "{t.headline}"
            </h2>

            <p className="text-[11px] md:text-xs tracking-widest uppercase text-foreground/70 leading-relaxed max-w-xl mx-auto mb-8">
              "{t.quote}"
            </p>

            <p className="font-serif italic text-xl text-foreground/80">
              — {t.name}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-16">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 border border-foreground/30 flex items-center justify-center hover:bg-foreground hover:text-ivory transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] tracking-editorial uppercase text-muted-foreground">
            {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
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