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
            <h2 className="font-serif text-[18vw] md:text-[12vw] lg:text-[9vw] leading-[0.9] tracking-tight">
              About <span className="italic font-normal">me</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15 }}
            className="lg:col-span-5 lg:pt-16"
          >
            <p className="font-serif text-2xl md:text-3xl leading-[1.3] mb-8">
              I work with ambitious leaders and growth-driven brands to turn{" "}
              <span className="italic">identity into strategy</span>, strategy into{" "}
              <span className="italic">growth</span>, and leadership into{" "}
              <span className="italic">lasting influence</span>.
            </p>

            <div className="hairline mb-8 w-full" />

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-md">
              I bring 15+ years of experience as an award-winning Brand Strategist.
            </p>

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