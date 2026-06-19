import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function ContactSuccess() {
  return (
    <div className="bg-ivory min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-40 px-6">
        <div className="max-w-2xl w-full text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-10"
          >
            — Thank you
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif leading-[1.0] tracking-tight mb-8"
          >
            <span className="block text-5xl md:text-7xl font-medium">Message received.</span>
            <span className="block text-4xl md:text-6xl italic font-light text-oxblood mt-2">I'll be in touch.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-10 space-y-4"
          >
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-lg mx-auto">
              I personally read every message that comes through. Expect to hear from me within one to two business days.
            </p>
            <p className="font-serif italic text-foreground/60 text-[15px]">
              In the meantime, feel free to explore the rest of the site.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-foreground text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 group"
            >
              Back to home
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/fractional-cmo"
              className="inline-flex items-center gap-3 border border-foreground/40 text-foreground px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-foreground hover:text-ivory transition-all duration-300 group"
            >
              Explore consulting
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 pt-10 border-t border-foreground/10"
          >
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/40">
              "Every collaboration starts with a conversation."
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}