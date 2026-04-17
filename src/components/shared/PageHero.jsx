import React from "react";
import { motion } from "framer-motion";

export default function PageHero({ label, titleLine1, titleLine2, titleLine3, subtitle, bgDark = false }) {
  return (
    <section className={`${bgDark ? "bg-oxblood text-ivory" : "bg-ivory text-foreground"} pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`text-[10px] tracking-editorial uppercase mb-10 ${bgDark ? "text-ivory/60" : "text-muted-foreground"}`}
          >
            — {label}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif leading-[0.92] tracking-tight"
        >
          {titleLine1 && <span className="block text-[13vw] md:text-[9vw] lg:text-[8vw] font-medium">{titleLine1}</span>}
          {titleLine2 && <span className="block text-[13vw] md:text-[9vw] lg:text-[8vw] italic font-normal">{titleLine2}</span>}
          {titleLine3 && <span className="block text-[8vw] md:text-[5.5vw] lg:text-[4.5vw] font-light mt-2">{titleLine3}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className={`mt-8 text-lg md:text-xl max-w-xl leading-relaxed ${bgDark ? "text-ivory/75" : "text-muted-foreground"}`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}