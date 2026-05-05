import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function KeynoteTopic({ topic, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="border border-foreground/15 rounded-lg overflow-hidden"
    >
      {/* Tab Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-8 py-8 flex items-start justify-between gap-6 hover:bg-foreground/2 transition-colors duration-300"
      >
        <div className="flex-1 text-left">
          <span className="font-serif italic text-3xl md:text-4xl text-oxblood/40 mb-3 block">{topic.num}</span>
          <h3 className="font-serif text-2xl md:text-3xl leading-[1.05] tracking-tight mb-2">{topic.title}</h3>
          <p className="font-serif italic text-lg text-muted-foreground">{topic.subtitle}</p>
        </div>
        <ChevronDown
          className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-2 transition-transform duration-300"
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Expandable Content */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-t border-foreground/15"
      >
        <div className="px-8 py-8 space-y-4">
          {topic.body.split("\n\n").map((p, j) => (
            <p key={j} className="text-[14px] text-muted-foreground leading-relaxed">
              {p}
            </p>
          ))}
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-foreground/50 px-7 py-3 text-[11px] tracking-editorial uppercase hover:bg-foreground hover:text-ivory transition-all group btn-pulse"
            >
              Book Me To Speak
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}