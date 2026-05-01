import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-oxblood text-ivory overflow-hidden pt-20">
      {/* Portrait image layered behind */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/876ade75f_generated_0f1e065f.png"
          alt="Laura Jane Thomas portrait"
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-oxblood/60 via-oxblood/50 to-oxblood" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] md:text-[11px] tracking-editorial uppercase text-ivory/70 mb-8 md:mb-12"
        >
          — Award-Winning · 15+ Years · Global Brands
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif leading-[1.1] tracking-tight max-w-5xl"
        >
          <span className="block text-6xl md:text-7xl lg:text-8xl font-medium">
            Strategy for businesses that want to grow,
          </span>
          <span className="block text-6xl md:text-7xl lg:text-8xl font-medium italic">
            and the leaders who want to last.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 md:mt-16 grid md:grid-cols-[1fr_auto_1fr] items-end gap-6 md:gap-10"
        >
          <div className="flex items-center gap-5">
            <span className="font-serif italic text-3xl md:text-4xl">15+</span>
            <span className="text-[10px] tracking-editorial uppercase text-ivory/70 max-w-[160px] leading-relaxed">
              Years scaling<br />global brands
            </span>
          </div>

          <Link
            to="/contact"
            className="justify-self-start md:justify-self-center inline-flex items-center gap-3 bg-ivory text-oxblood px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory/90 transition-all duration-300 group"
          >
            Apply To Work With Me
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>

          <div className="md:justify-self-end md:text-right">
            <span className="text-[10px] tracking-editorial uppercase text-ivory/70">
              London · Cape Town
            </span>
          </div>
        </motion.div>
      </div>

      {/* Running marquee name strip */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden border-t border-ivory/20 py-5 bg-oxblood-deep/40">
        <div className="marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 pr-10 font-serif text-2xl md:text-3xl">
              {Array.from({ length: 8 }).map((__, j) => (
                <span key={j} className="flex items-center gap-10">
                  LAURA JANE THOMAS
                  <span className="w-2 h-2 rounded-full bg-ivory/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}