import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutIntro() {
  return (
    <section className="bg-ivory text-foreground py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-10"
        >
          — 01 / About
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <h2             className="font-serif text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5vw] leading-[0.95] tracking-tight">
              Most growth strategies fail because something underneath is <span className="italic font-normal">misaligned.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15 }}
            className="lg:col-span-5 lg:pt-16"
          >
            <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              <p>
                In a business, the misalignment is between the brand and the commercial reality. The brand says one thing. The numbers tell another. Marketing is busy but not compounding. The founder feels the gap before she can name it.
              </p>

              <p>
                In a leader, it's between the success she has built and the woman she has become inside it. She is competent. She is admired. She is also at a threshold she cannot quite name, where what got her here will not get her where she wants to go next.
              </p>

              <p>
                These two misalignments look different on the surface. They are the same problem.
              </p>

              <p>
                I have spent fifteen years working at the layer where this gets fixed.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-foreground/80 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-foreground hover:text-ivory transition-all duration-300 group"
            >
              Learn More About Me
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}