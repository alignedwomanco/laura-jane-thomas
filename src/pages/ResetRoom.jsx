import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import TestimonialsSection from "@/components/shared/TestimonialsSection";

const BRAND = "#872D5B";

const aliveMethod = [
  { letter: "A", word: "Awareness",   desc: "See the patterns shaping your reality" },
  { letter: "L", word: "Liberation",  desc: "Release what is no longer serving you" },
  { letter: "I", word: "Intention",   desc: "Get clear on what you actually want" },
  { letter: "V", word: "Vision",      desc: "Build your next level" },
  { letter: "E", word: "Embodiment",  desc: "Become the woman who can hold it" },
];

const offers = [
  {
    title: "The Alignment Audit™",
    lines: [
      "You don't need another program.",
      "You need to see what is actually going on.",
      "This session identifies exactly where you are being drained and what needs to shift.",
      "You leave with clarity, direction, and next steps you can trust.",
    ],
    cta: "Book Your Alignment Audit",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/LauraJThomas24-11-2025-09-52-50-1.png",
    reverse: false,
    bg: "#F5F1EC",
  },
  {
    title: "1:1 Private Mentorship",
    lines: [
      "This is where we go deeper.",
      "We work through the patterns shaping your decisions, refine your offers and messaging, and build a business that supports your life.",
      "High level. Personalised. Transformational.",
    ],
    cta: "Apply for Private Mentorship",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/Group-48095914.png",
    reverse: true,
    bg: "#FFFFFF",
  },
  {
    title: "Recalibration Day",
    lines: [
      "Some decisions are too important to figure out slowly.",
      "This is a private intensive focused entirely on your business, your direction, and your next level.",
      "We identify what is not working, what needs to shift, and what actually matters.",
    ],
    cta: "Book Your Re-Calibration Day",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/room2.png",
    reverse: false,
    bg: "#EAE4DC",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ResetRoom() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center text-center px-6 pt-36 pb-28"
        style={{ backgroundColor: BRAND }}
      >
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/9c5ae9111_efca8aa6761e6e74544ba4e9681156c9.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.22 }}
          />
          {/* Grainy texture overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise3)' opacity='0.08'/%3E%3C/svg%3E")`,
            opacity: 0.7,
          }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <p className="text-[10px] tracking-editorial uppercase text-white/50 mb-8">— Senior Advisory and Coaching</p>
          <h1
            className="text-white leading-[1.0] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="block">Wildly successful.</span>
            <span className="block italic font-normal" style={{ opacity: 0.85 }}>Deeply aligned.</span>
            <span className="block">Built to last.</span>
          </h1>

          <p className="text-white/75 text-lg leading-relaxed mb-6 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
            For ambitious women building what's next. Whether that is leaving corporate, evolving the business you have built, or building the life your higher self would be proud of.
          </p>

          <div className="max-w-xl mx-auto mb-12">
            <p className="text-white/65 text-base leading-relaxed">
              I work with women ready to build what is next by working with the mind, the body, and the soul. Through The A.L.I.V.E. Method, the embodied methodology I have used with women globally, we build the next chapter with structure rather than guesswork.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-white/60 text-white px-12 py-4 text-[11px] tracking-editorial uppercase hover:bg-white transition-all duration-400 group btn-pulse"
            onMouseEnter={e => { e.currentTarget.style.color = BRAND; }}
            onMouseLeave={e => { e.currentTarget.style.color = "white"; }}
          >
            Apply For The Senior Advisory
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </section>

      {/* ── 2. DARK INTEGRATED ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#1A1A1A", minHeight: "80vh" }}>
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/4d61a4013_Extend_the_existing_image_hori_Nano_Banana_2_79564.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.45 }}
          />
          {/* Dark gradient overlay — heavier on right so text is readable */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,26,0.15) 0%, rgba(26,26,26,0.82) 55%, rgba(26,26,26,0.97) 100%)" }} />
          {/* Grainy texture overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            opacity: 0.6,
          }} />
        </div>

        {/* Content — centred */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-28 md:py-44 flex justify-center">
          <div className="w-full max-w-3xl text-center">
            <motion.p
              {...fadeUp(0)}
              className="text-white leading-[1.15] tracking-tight mb-10"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Most women aren't stuck.
              <br />
              <span className="italic" style={{ color: "rgba(255,255,255,0.6)" }}>They're misaligned.</span>
            </motion.p>

            <motion.div {...fadeUp(0.1)} className="space-y-6 text-white/65 text-base leading-relaxed">
              <p>
                I know what it feels like to look like you have it all and not feel the joy that is supposed to come with it.
              </p>
              <p>
                When the gap between who you are and who you want to be becomes too big, the cracks start to form. Quietly at first. Then everywhere. The schedule looks right and feels wrong. The success was built on a structure that was never honest about what you actually wanted. The capacity has outgrown the life around it.
              </p>
              <p>
                That gap is the misalignment. And the misalignment is what causes the burnout, the unhappiness, the confusion that does not have a clean name. It does not announce itself. It accumulates.
              </p>
              <p>
                The work I do is the work of seeing the misalignment clearly. And then rebuilding what comes next on a foundation that is honest. Not because the old life was wrong. Because the woman who built it has outgrown it.
              </p>
              <p className="text-white/80 italic" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}>
                This is the work I have done with women globally through The A.L.I.V.E. Method. Five stages. Embodied, structured, and built to last.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. IMAGE + TEXT ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-36" style={{ backgroundColor: "#F5F1EC" }}>
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/2287c0313_Screenshot2026-04-17at131145.png"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.18 }}
          />
          {/* Grainy texture overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)' opacity='0.07'/%3E%3C/svg%3E")`,
            opacity: 0.7,
          }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="aspect-[3/4] overflow-hidden"
          >
            <img
              src="https://laurajanethomas.biz/wp-content/uploads/2025/11/LauraJThomas24-11-2025-09-52-50-1.png"
              alt="Laura Jane Thomas"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15 }}
          >
            <div className="mb-10" style={{ width: 48, height: 2, backgroundColor: BRAND }} />
            <p
              className="leading-[1.15] tracking-tight mb-8"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", color: "#1A1A1A" }}
            >
              I've built the 7-figure businesses and hit the milestones.
              <br />
              <span className="italic" style={{ color: "rgba(26,26,26,0.65)" }}>I've created the success most people are chasing, and then I burnt out.</span>
            </p>
            <p
              className="leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", color: "rgba(26,26,26,0.70)" }}
            >
              Not slowly. Completely.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(26,26,26,0.60)" }}>
              The kind that forces you to stop and question everything. To rebuild from the ground up.
              <br /><br />
              What came next was the most painful and most defining chapter of my life. It forced me to redefine what success actually means.
              To understand what it looks like to build something that is not just successful but sustainable, aligned, and real.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(26,26,26,0.60)" }}>
              Now I do things differently. I build businesses that are powerful.
              Aligned. Profitable, but also grounded, joyful and actually enjoyable to live inside. And that is what I want for you. The kind of success that feels truly yours.
            </p>
            <p
              className="italic leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: "#1A1A1A" }}
            >
              I want you to become dangerously competent. Clear in your decisions,
              confident in your direction and deeply aligned in the way you build your life and business.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(26,26,26,0.60)" }}>
              You do not have to learn this the hard way. I did that for you already.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4. ALIVE METHOD ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp(0)} className="mb-20">
            <p className="text-[10px] tracking-editorial uppercase mb-6" style={{ color: BRAND }}>
              The Signature Framework
            </p>
            <h2
              className="text-white leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              The ALIVE Method™
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-xl">
              A proven method that helps women break through limiting beliefs, become deeply aware of what is holding them back,
              and create results that are both sustainable and aligned.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
            {aliveMethod.map((item, i) => (
              <motion.div
                key={item.letter}
                {...fadeUp(i * 0.08)}
                className="group p-8 md:p-10 transition-colors duration-500"
                style={{ backgroundColor: "#1A1A1A" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = BRAND; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#1A1A1A"; }}
              >
                <span
                  className="block leading-none italic mb-5 transition-colors duration-500"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "5rem", color: BRAND }}
                >
                  {item.letter}
                </span>
                <p className="text-white text-lg font-serif mb-3">{item.word}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. OFFERS ───────────────────────────────────────────────────── */}
      {offers.map((offer, i) => (
        <section key={offer.title} className="py-24 md:py-36" style={{ backgroundColor: offer.bg }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className={`grid lg:grid-cols-2 gap-16 lg:gap-28 items-center ${offer.reverse ? "direction-rtl" : ""}`}
              style={{ direction: offer.reverse ? "rtl" : "ltr" }}
            >
              <motion.div
                initial={{ opacity: 0, x: offer.reverse ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1 }}
                className="aspect-[3/4] overflow-hidden"
                style={{ direction: "ltr" }}
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1.4s]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: offer.reverse ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.15 }}
                style={{ direction: "ltr" }}
              >
                <div className="mb-8" style={{ width: 48, height: 2, backgroundColor: BRAND }} />
                <h2
                  className="leading-[0.95] tracking-tight mb-8"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 4vw, 4rem)", color: "#1A1A1A" }}
                >
                  {offer.title}
                </h2>
                <div className="space-y-4 mb-10">
                  {offer.lines.map((line, j) => (
                    <p
                      key={j}
                      className={j === 0 ? "text-xl italic" : "text-base leading-relaxed"}
                      style={{
                        fontFamily: j === 0 ? "var(--font-serif)" : "var(--font-sans)",
                        color: j === 0 ? "#1A1A1A" : "rgba(26,26,26,0.60)",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 border px-8 py-4 text-[11px] tracking-editorial uppercase transition-all duration-300 group"
                  style={{ borderColor: "#1A1A1A", color: "#1A1A1A" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1A1A1A"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1A1A1A"; }}
                >
                  {offer.cta}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* ── 6. FINAL CLOSE ──────────────────────────────────────────────── */}
      <section
        className="py-32 md:py-52 px-6 text-center"
        style={{ backgroundColor: BRAND }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto"
        >
          <p
            className="text-white leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            You already know something needs to change.
          </p>
          <p
            className="italic text-white/75 mb-10"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
          >
            You can feel it.
          </p>
          <div className="space-y-3 mb-16 text-white/65 text-base md:text-lg leading-relaxed">
            <p>The version of you that built this life</p>
            <p>is not the version that will take you further.</p>
            <p className="mt-5">The question is</p>
            <p>how much longer you stay where you are.</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-white/60 text-white px-12 py-5 text-[11px] tracking-editorial uppercase transition-all duration-300 group"
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = BRAND; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "white"; }}
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