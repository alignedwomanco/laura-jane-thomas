import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const pathways = [
  {
    title: "Executive-Level Strategy",
    prompt:
      "I need senior-level strategy and team guidance without the cost of a full-time CMO.",
    offer: "Fractional CMO partnerships & strategic consulting.",
  },
  {
    title: "Clarity & Creative Direction",
    prompt:
      "My brand has outgrown the business I'm trying to build.",
    offer: "Brand repositioning sprints with strategy and creative direction in one partner.",
  },
  {
    title: "Coaching & reset",
    prompt:
      "I need a safe space to recalibrate, rebuild, and get coaching that blends business with personal growth.",
    offer: "1:1 coaching, masterclasses & The Aligned Woman Co.",
  },
  {
    title: "Talks & thought leadership",
    prompt:
      "I need a speaker who can bring honesty, expertise, and inspiration to my stage or panel.",
    offer: "Keynotes, panels & thought-leadership talks.",
  },
];

export default function ChooseExperience() {
  return (
    <section className="bg-ivory text-foreground py-24 md:py-36 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="grid md:grid-cols-2 gap-px bg-foreground/15">
          {pathways.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="bg-ivory"
            >
              <Link
                to="/"
                className="group block h-full p-8 md:p-12 hover:bg-oxblood hover:text-ivory transition-colors duration-500"
              >
                <span className="block text-[10px] tracking-editorial uppercase text-muted-foreground group-hover:text-ivory/60 mb-5">
                  0{i + 1} — For those who say
                </span>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 tracking-tight">
                  {p.title}
                </h3>
                <p className="font-serif italic text-lg md:text-xl text-foreground/80 group-hover:text-ivory/80 leading-snug mb-8">
                  "{p.prompt}"
                </p>
                <div className="hairline w-12 mb-5 bg-current" />
                <p className="text-sm text-muted-foreground group-hover:text-ivory/70">
                  {p.offer}
                </p>
                <span className="mt-10 inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase">
                  Explore
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}