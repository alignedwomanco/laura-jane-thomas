import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const paragraphs = [
  "For fifteen years I have worked at the intersection of three things most people separate: creative direction, team leadership, and commercial analytics. Brand strategy that actually moves revenue. Creative work that the numbers can defend. Teams that can execute on both.",
  "What I learned the hard way is that any growth without internal alignment isn't sustainable, in business or in life. When the brand, the strategy, and the execution align, businesses last. When the woman, the work, and the life align, she lasts.",
  "Today, that conviction shapes everything I do. I advise founders, CEOs, and senior teams as a Fractional CMO and Brand Advisor. I work privately with ambitious women building what's next. And I built The Aligned Woman Co. to scale the same methodology to women everywhere.",
];

export default function MeetLaura() {
  return (
    <section className="bg-ivory text-foreground py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-10">
          — 03 / Nice to meet you
        </p>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          {/* Image + headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 lg:sticky lg:top-28 self-start"
          >
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/e48554bf4_LJT_17-04-2026-21-30-39.jpg"
                  alt="Laura Jane Thomas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-ivory px-4 py-3 border border-foreground/20">
                <span className="block text-[10px] tracking-editorial uppercase text-muted-foreground">
                  Nice to meet you
                </span>
                <span className="block font-serif italic text-2xl mt-1">— Laura</span>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <h2 className="font-serif leading-[0.9] tracking-tight mb-12">
              <span className="block text-6xl md:text-8xl lg:text-9xl">Hi,</span>
              <span className="block text-6xl md:text-8xl lg:text-9xl italic">
                I'm laura
              </span>
            </h2>

            <div className="space-y-6 max-w-xl">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${
                    i === 0
                      ? "font-serif text-xl md:text-2xl text-foreground"
                      : "text-[15px] text-muted-foreground"
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>

            <Link
              to="/about"
              className="mt-12 inline-flex items-center gap-3 bg-foreground text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 group"
            >
              Read More About Me
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}