import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    num: "01.",
    label: "For Businesses",
    title: "Fractional CMO and",
    italic: "Brand Advisor",
    suffix: "For founders, CEOs, and leadership teams",
    body: "Senior brand and marketing strategy for businesses that want commercial clarity and elevated brand expression in one partner. Productized 90-day engagements. Built on The Aligned Operating Model.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/42c135d0f_LauraThomas4-05-2026-15-52-36.jpg",
    buttonText: "Learn More",
  },
  {
    num: "02.",
    label: "For Women",
    title: "Senior Advisory and",
    italic: "Coaching",
    suffix: "For ambitious women building what's next",
    body: "Private advisory engagements for women at the threshold of their next chapter. Whether you're stepping out of corporate, evolving the business you've built, or building the life that finally matches your resources. Built on The A.L.I.V.E. Method.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/afc6226c6_89a312eb131a146172728691bff76edc.jpg",
    buttonText: "Explore the Advisory",
  },
  {
    num: "03.",
    label: "For Organisations",
    title: "Speaking and",
    italic: "Leadership Programs",
    suffix: "For corporates investing in their female pipeline",
    body: "Keynotes, half-day workshops, and multi-session leadership programs designed to develop and retain high-performing women. Built on The A.L.I.V.E. Method at organisational scale.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/61a51e44c_09d6406628841f576d2d27f8b1e4c78c-1.jpg",
    buttonText: "Explore Speaking",
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      className="text-ivory py-24 md:py-36 relative"
      style={{
        backgroundImage:
          "url(https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/ffd394de8_efca8aa6761e6e74544ba4e9681156c9.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-oxblood/85" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-12 md:mb-16">
          — 04 / What I Do
        </p>

        <div className="divide-y divide-ivory/15 border-y border-ivory/15">
          {services.map((s, i) => (
            <div key={s.num}>
              {/* Row header — clickable */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-6 md:py-7 group text-left"
              >
                <span className="text-[11px] md:text-xs tracking-editorial uppercase text-ivory/70 group-hover:text-ivory transition-colors">
                  {s.label}
                </span>
                <div className="flex items-center gap-6">
                  <span
                    className={`w-5 h-5 flex items-center justify-center border border-ivory/40 text-ivory/70 text-xs transition-transform duration-300 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>

              {/* Expanded panel */}
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-14 pt-2 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                      {/* Text */}
                      <div className="lg:col-span-7">
                        <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6">
                          <span className="block font-bold uppercase">{s.title}</span>
                          {s.italic && (
                            <span className="block italic font-normal">{s.italic}</span>
                          )}
                        </h3>
                        {s.suffix && (
                          <p className="font-serif italic text-lg text-ivory/70 mb-6">
                            {s.suffix}
                          </p>
                        )}
                        <div className="hairline w-16 mb-8 bg-ivory" />
                        <p className="text-sm md:text-base text-ivory/70 leading-relaxed max-w-xl mb-10">
                          {s.body}
                        </p>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-3 border border-ivory/70 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all duration-300 group"
                        >
                          {s.buttonText}
                          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>

                      {/* Image */}
                      <div className="lg:col-span-5">
                        <div className="aspect-[4/5] overflow-hidden">
                          <img
                            src={s.image}
                            alt={s.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}