import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import TestimonialsSection from "@/components/shared/TestimonialsSection";

// ─── Data ────────────────────────────────────────────────────────────────────

const aliveMethod = [
  {
    letter: "A",
    word: "Awareness",
    desc: "See the patterns, behaviours, and decisions shaping your reality",
  },
  {
    letter: "L",
    word: "Liberation",
    desc: "Release what's no longer serving you",
  },
  {
    letter: "I",
    word: "Intention",
    desc: "Get clear on what you actually want",
  },
  {
    letter: "V",
    word: "Vision",
    desc: "Build a business and life aligned to your next level",
  },
  {
    letter: "E",
    word: "Embodiment",
    desc: "Become the woman who can hold it",
  },
];

const offers = [
  {
    title: "The Alignment Audit™",
    body: [
      "Most women are operating from patterns they haven't learned to see yet.",
      "This session is designed to identify exactly where you are being drained and what needs to shift.",
      "You'll leave with clarity, direction, and immediate next steps you can actually trust.",
    ],
    cta: "Book Your Alignment Audit",
    href: "/contact",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/LauraJThomas24-11-2025-09-52-50-1.png",
    reverse: false,
    bg: "bg-[#F5F1EC]",
  },
  {
    title: "1:1 Private Mentorship",
    body: [
      "This is where we go deeper.",
      "We work through the patterns shaping your decisions, refine your offers and messaging, and build a business that supports your life, not drains it.",
      "This is high-level, personalised work for women ready to operate differently.",
    ],
    cta: "Apply for Private Mentorship",
    href: "/contact",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/Group-48095914.png",
    reverse: true,
    bg: "bg-white",
  },
  {
    title: "The Reset Room",
    body: [
      "A space for high-performing women to recalibrate.",
      "To rebuild their energy, identity, and direction without burning out in the process.",
      "Less noise.\nMore clarity.\nReal alignment.",
    ],
    cta: "Enter The Reset Room",
    href: "/contact",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/room2.png",
    reverse: false,
    bg: "bg-[#EDEAE4]",
  },
];

const truthLines = [
  "Most women aren't stuck.",
  "They're being drained.",
  "",
  "Drained of energy.",
  "Drained of money.",
  "Drained of power.",
  "",
  "And most of the time",
  "they don't even realise where it's coming from.",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResetRoom() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center text-center pt-32 pb-24 md:pt-40 md:pb-36 px-6"
        style={{ backgroundColor: "#872D5B" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-[13vw] md:text-[8vw] lg:text-[7vw] leading-[1.0] tracking-tight text-white mb-10">
            <span className="block">Wildly successful.</span>
            <span className="block italic font-normal">Deeply aligned.</span>
            <span className="block">Finally.</span>
          </h1>

          <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-14 font-sans">
            I work with ambitious women ready to become wildly successful and deeply aligned
            by working with the mind, body, and soul.
            <br /><br />
            Through my signature ALIVE Method™, I've helped hundreds of women globally
            move through internal blocks, refine their offers and messaging,
            and build businesses their higher self would be proud of.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-white/70 text-white px-10 py-4 text-[11px] tracking-editorial uppercase hover:bg-white hover:text-[#872D5B] transition-all duration-300 group"
          >
            Work With Me
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </section>

      {/* ── SECTION 2: THE TRUTH ─────────────────────────────────────────── */}
      <section className="bg-[#111111] text-white py-28 md:py-44 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {truthLines.map((line, i) =>
            line === "" ? (
              <div key={i} className="h-6" />
            ) : (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.4] tracking-tight"
              >
                {line}
              </motion.p>
            )
          )}
        </div>
      </section>

      {/* ── SECTION 3: EDITORIAL SPLIT ───────────────────────────────────── */}
      <section className="bg-[#F5F1EC] py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://laurajanethomas.biz/wp-content/uploads/2025/11/LauraJThomas24-11-2025-09-52-50-1.png"
              alt="Laura Jane Thomas"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <div className="hairline w-12 mb-10 bg-foreground/40" style={{ height: 1, backgroundColor: "#1a1a1a", opacity: 0.3 }} />
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.35] tracking-tight text-foreground">
              It doesn't look obvious.
            </p>
            <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-foreground/70 mt-8">
              It looks like overthinking every decision.<br />
              Second guessing your pricing.<br />
              Saying yes when you should be setting boundaries.<br />
              Building a business that technically works<br />
              but quietly exhausts you.
            </p>
            <p className="font-serif text-2xl md:text-3xl leading-[1.3] tracking-tight text-foreground mt-10">
              You don't need more strategy.
            </p>
            <p className="font-serif italic text-xl md:text-2xl text-foreground/70 mt-4">
              You need to see what's actually driving it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: POSITIONING ───────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-36 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-serif text-xl md:text-2xl leading-[1.7] text-foreground/80">
            I help women identify where they are losing energy, money, and power —
            often without even realising it.
          </p>
          <p className="font-serif text-xl md:text-2xl leading-[1.7] text-foreground/80 mt-8">
            We uncover what's really holding you back
            and rebuild your business and life in a way that actually supports you.
          </p>
          <p className="font-serif text-xl md:text-2xl leading-[1.7] text-foreground/80 mt-8">
            Through my signature ALIVE Method™, I combine NLP techniques, Human Design,
            and 15+ years of leading global brands
          </p>
          <p className="font-serif italic text-2xl md:text-3xl text-foreground mt-6">
            to create results that are both strategic and deeply aligned.
          </p>
        </motion.div>
      </section>

      {/* ── SECTION 5: ALIVE METHOD™ ─────────────────────────────────────── */}
      <section className="bg-[#F5F1EC] py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-4">— The Method</p>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight">
              The ALIVE Method™
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aliveMethod.map((item, i) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-white p-8 md:p-10 group hover:bg-[#872D5B] hover:text-white transition-colors duration-500"
              >
                <span className="block font-serif text-7xl md:text-8xl leading-none italic text-[#872D5B] group-hover:text-white/30 transition-colors duration-500 mb-4">
                  {item.letter}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl mb-3 tracking-tight">{item.word}</h3>
                <p className="text-sm md:text-base text-foreground/60 group-hover:text-white/70 leading-relaxed transition-colors duration-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}

            {/* Closing statement card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="md:col-span-2 lg:col-span-1 bg-[#111111] text-white p-8 md:p-10 flex items-center justify-center"
            >
              <p className="font-serif italic text-xl md:text-2xl text-center leading-relaxed">
                This is where everything starts to make sense.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: OFFERS ────────────────────────────────────────────── */}
      {offers.map((offer, i) => (
        <section key={offer.title} className={`${offer.bg} py-24 md:py-36`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${offer.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: offer.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="aspect-[4/5] overflow-hidden"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] hover:scale-[1.03]"
                />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: offer.reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15 }}
              >
                <div style={{ height: 1, backgroundColor: "#1a1a1a", opacity: 0.2, width: 48, marginBottom: 32 }} />
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-8">
                  {offer.title}
                </h2>
                {offer.body.map((para, j) => (
                  <p key={j} className={`leading-relaxed mb-5 ${j === 0 ? "font-serif italic text-xl md:text-2xl text-foreground/80" : "text-[15px] text-muted-foreground whitespace-pre-line"}`}>
                    {para}
                  </p>
                ))}
                <Link
                  to={offer.href}
                  className="mt-6 inline-flex items-center gap-3 border border-foreground/80 px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-foreground hover:text-white transition-all duration-300 group"
                >
                  {offer.cta}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* ── SECTION 7: FINAL CLOSE ───────────────────────────────────────── */}
      <section
        className="py-28 md:py-44 px-6 text-center"
        style={{ backgroundColor: "#872D5B" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="max-w-3xl mx-auto"
        >
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.3] text-white mb-6">
            You already know something needs to change.
          </p>
          <p className="font-serif italic text-2xl md:text-3xl text-white/80 mb-10">
            You can feel it.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-6">
            The version of you that got you here
            is not the version that will take you where you want to go.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-16">
            The question is
            how much longer you stay where you are.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-white/70 text-white px-12 py-5 text-[11px] tracking-editorial uppercase hover:bg-white hover:text-[#872D5B] transition-all duration-300 group"
          >
            I'm Ready To Do This Differently
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </section>

      <TestimonialsSection />
      <Footer />
    </div>
  );
}