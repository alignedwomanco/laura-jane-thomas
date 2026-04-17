import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const paragraphs = [
  "For more than 15 years, I've built, scaled, and advised brands across every stage of growth. I founded and ran a multi seven figure creative agency, consulting to some of the world's largest brands while helping ambitious founders sharpen their positioning and scale with precision.",
  "Today, I work across strategy, consulting, and speaking. I partner with growth driven brands and ambitious leaders who want more than visibility. They want influence, commercial clarity and positioning that actually performs.",
  "As a keynote speaker, I bring lived experience from the boardroom, entrepreneurship, and personal reinvention to conversations around leadership, identity and burnout.",
  "Alongside my corporate and brand strategy work, I founded The Aligned Woman Co, an education platform redefining how ambitious women learn, lead, and build in today's world. What began as lived experience evolved into a mission to close the gap between high performance and personal sustainability.",
  "Whether you are building a global brand, scaling your next chapter, or stepping onto a bigger stage, my work sits at the intersection of identity, strategy, and leadership. The result is growth that is commercially sharp, personally aligned, and built to last.",
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
                  src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/0ac2985c5_Work_with_LauraJaneThomas.jpg"
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
              to="/contact"
              className="mt-12 inline-flex items-center gap-3 bg-foreground text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 group"
            >
              Apply To Work With Me
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}