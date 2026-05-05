import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CtaBanner({ headline, sub, cta = "Apply To Work With Me", href = "/contact", dark = false }) {
  return (
    <section className={`${dark ? "bg-oxblood text-ivory" : "bg-foreground text-ivory"} py-24 md:py-36 overflow-hidden relative`}>
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/e2710ea5b_89a312eb131a146172728691bff76edc.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-5xl md:text-7xl lg:text-[90px] leading-[0.92] tracking-tight mb-10"
        >
          {headline}
        </motion.h2>
        {sub && (
          <p className="text-ivory/70 text-lg max-w-xl mx-auto mb-12 leading-relaxed">{sub}</p>
        )}
        <Link
          to={href}
          className="inline-flex items-center gap-3 border border-ivory/70 px-10 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-foreground transition-all duration-300 group btn-pulse"
        >
          {cta}
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}