import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    num: "01.",
    title: "— For Businesses",
    italic: "Fractional CMO and Brand Advisor",
    suffix: "For founders, CEOs, and leadership teams",
    lead: "Senior brand and marketing strategy for businesses that want commercial clarity and elevated brand expression in one partner.",
    body:
      "Productized 90-day engagements. Built on The Aligned Operating Model.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/953937053_c8a5c449f76180ff39af1e8a255f498b.jpg",
  },
  {
    num: "02.",
    title: "Talks that",
    italic: "spark change",
    suffix: "",
    lead: "From global summits to intimate panels,",
    body:
      "I bring raw honesty, strategy & soul to conversations on branding, burnout & bold leadership.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/61a51e44c_09d6406628841f576d2d27f8b1e4c78c-1.jpg",
  },
  {
    num: "03.",
    title: "",
    italic: "Coaching, courses",
    suffix: "& community",
    lead: "For ambitious women ready to rewrite the rules.",
    body:
      "A space for coaching, masterclasses & programs designed to help you thrive without burning out.",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/afc6226c6_89a312eb131a146172728691bff76edc.jpg",
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
          — 02 / What I Do
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
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                </div>
                <span className="absolute -top-6 -left-2 font-serif text-8xl md:text-9xl italic text-ivory/25 pointer-events-none">
                  {s.num}
                </span>
              </div>

              <div className="lg:col-span-7 lg:pl-8">
                <span className="block text-[11px] tracking-editorial uppercase text-ivory/50 mb-6">
                  {s.num}
                </span>
                <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
                  <span className="block">{s.title}</span>
                  <span className="block italic">{s.italic}</span>
                  {s.suffix && <span className="block">{s.suffix}</span>}
                </h3>

                <div className="hairline w-16 mb-6 bg-ivory" />

                <p className="font-serif italic text-xl md:text-2xl text-ivory/90 mb-4">
                  {s.lead}
                </p>
                <p className="text-sm md:text-base text-ivory/70 leading-relaxed max-w-lg mb-8">
                  {s.body}
                </p>

                <Link
                  to={s.href}
                  className="inline-flex items-center gap-3 border border-ivory/70 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all duration-300 group"
                >
                  Learn More
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