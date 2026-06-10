import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PressMarquee from "./PressMarquee";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-oxblood text-ivory overflow-hidden pt-20 pb-40 md:pb-56">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        x-webkit-airplay="allow"
        data-wf-ignore="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ WebkitTransform: "translateZ(0)" }}
      >
        <source src="https://pub-7ae774d14f7545f5867330470de2d758.r2.dev/LauraThomas_HeroVideo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-oxblood/60 via-oxblood/50 to-oxblood" />

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
          className="font-serif leading-[1.1] tracking-tight max-w-5xl text-center mx-auto"
        >
          <span className="block text-4xl md:text-5xl lg:text-6xl font-medium">
            Strategy for businesses that want to grow,
          </span>
          <span className="block text-4xl md:text-5xl lg:text-6xl font-medium italic">
            and the leaders who want to last.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 md:mt-16 grid md:grid-cols-[1fr_auto_1fr] items-end gap-6 md:gap-10 text-center md:text-left"
        >
          <div className="flex items-center gap-5 justify-center md:justify-start">
            <span className="font-serif italic text-3xl md:text-4xl">15+</span>
            <span className="text-[10px] tracking-editorial uppercase text-ivory/70 max-w-[160px] leading-relaxed">
              Years scaling<br />global brands
            </span>
          </div>

          <Link
            to="/contact"
            className="mx-auto md:justify-self-center inline-flex items-center gap-3 bg-ivory text-oxblood px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory/90 transition-all duration-300 group"
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

      {/* Press Marquee at bottom of hero */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 w-full z-10 px-6 lg:px-12">
        <PressMarquee isDark={true} isInHero={true} />
      </div>
    </section>
  );
}