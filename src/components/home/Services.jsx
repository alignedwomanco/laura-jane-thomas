import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    num: "01",
    label: "For Businesses",
    title: "Fractional CMO",
    italic: "& Brand Advisor",
    suffix: "For founders, CEOs, and leadership teams",
    body: "Senior brand and marketing strategy for businesses that want commercial clarity and elevated brand expression in one partner. Productized 90-day engagements. Built on The Aligned Operating Model.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/42c135d0f_LauraThomas4-05-2026-15-52-36.jpg",
    buttonText: "Learn More",
    href: "/consulting",
  },
  {
    num: "02",
    label: "For Women",
    title: "Senior Advisory",
    italic: "& Coaching",
    suffix: "For ambitious women building what's next",
    body: "Private advisory engagements for women at the threshold of their next chapter. Whether you're stepping out of corporate, evolving the business you've built, or building the life that finally matches your resources. Built on The A.L.I.V.E. Method.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/afc6226c6_89a312eb131a146172728691bff76edc.jpg",
    buttonText: "Explore the Advisory",
    href: "/consulting",
  },
  {
    num: "03",
    label: "For Organisations",
    title: "Speaking",
    italic: "& Leadership Programs",
    suffix: "For corporates investing in their female pipeline",
    body: "Keynotes, half-day workshops, and multi-session leadership programs designed to develop and retain high-performing women. Built on The A.L.I.V.E. Method at organisational scale.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/61a51e44c_09d6406628841f576d2d27f8b1e4c78c-1.jpg",
    buttonText: "Explore Speaking",
    href: "/speaking",
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
      <div className="absolute inset-0 bg-oxblood/88" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-12 md:mb-16">
          — 04 / What I Do
        </p>

        <div className="border-t border-ivory/20">
          {services.map((s, i) => (
            <div key={s.num} className="border-b border-ivory/20">
              {/* Collapsed row */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-7 md:py-8 group text-left hover:opacity-80 transition-opacity"
              >
                <span className="font-sans text-[11px] md:text-xs tracking-editorial uppercase text-ivory/80 group-hover:text-ivory transition-colors">
                  {s.label}
                </span>
                <div className="flex items-center gap-6">
                  <span
                    className={`text-ivory/60 text-xl font-light transition-transform duration-300 leading-none ${
                      openIndex === i ? "rotate-45" : ""
                    } inline-block`}
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
                    <div className="pb-16 pt-4 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                      {/* Text left */}
                      <div className="lg:col-span-7">
                        <h3 className="font-serif leading-[0.95] tracking-tight mb-8">
                          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold uppercase">{s.title}</span>
                          {s.italic && (
                            <span className="block text-5xl md:text-7xl lg:text-8xl italic font-normal">{s.italic}</span>
                          )}
                        </h3>

                        {s.suffix && (
                          <p className="font-serif italic text-base text-ivory/60 mb-6">{s.suffix}</p>
                        )}

                        <p className="text-sm md:text-[15px] text-ivory/70 leading-relaxed max-w-xl mb-10">
                          {s.body}
                        </p>

                        <Link
                          to={s.href}
                          className="inline-flex items-center gap-3 border border-ivory/50 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all duration-300 group"
                        >
                          {s.buttonText}
                          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>

                      {/* Image right */}
                      <div className="lg:col-span-5">
                        <div className="aspect-[4/5] overflow-hidden">
                          <img
                            src={s.image}
                            alt={s.title}
                            className="w-full h-full object-cover"
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