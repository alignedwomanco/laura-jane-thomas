import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    num: "01.",
    label: "— For Businesses",
    title: "Fractional CMO and",
    italic: "Brand Advisor",
    suffix: "For founders, CEOs, and leadership teams",
    body:
      "Senior brand and marketing strategy for businesses that want commercial clarity and elevated brand expression in one partner. Productized 90-day engagements. Built on The Aligned Operating Model.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/42c135d0f_LauraThomas4-05-2026-15-52-36.jpg",
  },
  {
    num: "02.",
    label: "— For Women",
    title: "Senior Advisory and",
    italic: "Coaching",
    suffix: "For ambitious women building what's next",
    body:
      "Private advisory engagements for women at the threshold of their next chapter. Whether you're stepping out of corporate, evolving the business you've built, or building the life that finally matches your resources. Built on The A.L.I.V.E. Method.",
    buttonText: "Explore the Advisory",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/afc6226c6_89a312eb131a146172728691bff76edc.jpg",
  },
  {
    num: "03.",
    label: "— For Organisations",
    title: "Speaking and",
    italic: "Leadership Programs",
    suffix: "For corporates investing in their female pipeline",
    body:
      "Keynotes, half-day workshops, and multi-session leadership programs designed to develop and retain high-performing women. Built on The A.L.I.V.E. Method at organisational scale.",
    buttonText: "Explore Speaking",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/61a51e44c_09d6406628841f576d2d27f8b1e4c78c-1.jpg",
  },
];

export default function Services() {
  return (
    <section className="text-ivory py-24 md:py-36 relative" style={{
      backgroundImage: 'url(https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/ffd394de8_efca8aa6761e6e74544ba4e9681156c9.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="absolute inset-0 bg-oxblood/85" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-16 md:mb-24">
          — 04 / What I Do
        </p>

        <div className="space-y-24 md:space-y-32">
          {services.map((s, i) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:[&>.img]:order-2" : ""
              }`}
            >
              <div className="img lg:col-span-5 relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105 opacity-70 hover:opacity-100"
                  />
                </div>
                <span className="absolute -top-6 -left-2 font-serif text-8xl md:text-9xl italic text-ivory/25 pointer-events-none">
                  {s.num}
                </span>
              </div>

              <div className="lg:col-span-7 lg:pl-8">
               <span className="block text-[11px] tracking-editorial uppercase text-ivory/50 mb-8">
                 {s.label || s.num}
               </span>
               <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
                 <span className="block">{s.title}</span>
                 {s.italic && <span className="block italic">{s.italic}</span>}
               </h3>

               {s.suffix && <p className="font-serif italic text-lg md:text-xl text-ivory/80 mb-6">{s.suffix}</p>}

               <div className="hairline w-16 mb-8 bg-ivory" />

               <p className="text-sm md:text-base text-ivory/70 leading-relaxed max-w-2xl mb-12">
                 {s.body}
               </p>

                <Link
                  to={s.href}
                  className="inline-flex items-center gap-3 border border-ivory/70 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all duration-300 group"
                >
                  {s.buttonText || "Learn More"}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}