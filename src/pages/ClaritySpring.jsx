import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, X, Plus, Minus } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ResourcesSection from "@/components/shared/ResourcesSection";
import PressMarquee from "@/components/home/PressMarquee";

const BRAND = "#26030F";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] },
});

const weeks = [
  {
    letter: "1",
    week: "SESSION 1",
    label: "POSITION",
    sub: "What you are really building, and who it is for.",
    body: "The gap only you can own, and the message that makes you the obvious choice. If you are established, we pressure-test a position that may have gone fuzzy.",
    leave: "a written positioning and opportunity diagnostic.",
  },
  {
    letter: "2",
    week: "SESSION 2",
    label: "OFFER AND MODEL",
    sub: "How it actually makes money, and where it is leaking.",
    body: "Your core offer, your pricing, where the revenue comes from. If you are starting, we build the model. If you are established, we find the money you are leaving on the table.",
    leave: "your offer and revenue model on a page.",
  },
  {
    letter: "3",
    week: "SESSION 3",
    label: "BRAND AND MARKET",
    sub: "Why people choose you, and how they find you.",
    body: "We sharpen the story and the way you show up, then build how you reach your people, on terms you can live with.",
    leave: "your brand and messaging direction, and a go-to-market plan built around you.",
  },
  {
    letter: "4",
    week: "SESSION 4",
    label: "ENGINE AND PLAN",
    sub: "How it grows without consuming you, and what you do next.",
    body: "What to systemise, simplify, or hand off, then everything pulled into a sequenced 90-day plan.",
    leave: "a simple operating model, and a written 90-day growth plan you can run without me.",
  },
];

const coreItems = [
  { title: "4 Strategic Coaching Calls", value: "R20,000", desc: "Three 60-minute sessions plus one 90-minute final session with me directly. Conducted online, scheduled around your real life. Recorded so you can revisit them." },
  { title: "The A.L.I.V.E. Method Workbook", value: "R3,500", desc: "A structured 40-page workbook that runs alongside the four weeks. Pre-call prompts to make our time together sharper, post-call exercises to embed what we work on." },
  { title: "Written Diagnostic and 30-Day Action Plan", value: "R7,500", desc: "At the end of Week 1, a written diagnostic of your current state. At the end of Week 3, a written 30-day action plan calibrated to your actual capacity. These are working documents you keep, not session notes." },
  { title: "Voxer Access Between Sessions", value: "R5,000", desc: "Voice and text support between our weekly calls, Monday to Friday. For the moments you need a sounding board, a reframe, or a steady voice before you make a decision." },
  { title: "Vision and Alignment Document", value: "R4,000", desc: "At the close of Week 4, a written vision document anchoring the work we have done and the practices that will keep you on track once the engagement ends." },
];

const bonuses = [
  { title: "Tailored Resource Pack", value: "R3,500", desc: "Curated reading, exercises, and frameworks pulled from fifteen years of practice and matched to what you are actually working on. No generic resource library. The right tools for your situation." },
  { title: "30-Day Recalibration Call", value: "R3,500", desc: "Thirty days after the engagement ends, a 30-minute call to review progress and recalibrate if needed. Most coaches end the relationship at the close. I do not. This call is built in." },
  { title: "The Aligned Woman Blueprint", value: "R116,000", desc: "One full year of access to The Aligned Woman Blueprint, the complete course built on The A.L.I.V.E. Method. The methodology, the practices, the full toolkit, every module, every resource. A year to use, integrate, and apply long after the Clarity Sprint ends." },
];

const objections = [
  {
    q: '"I have tried coaching before and it did not work for me."',
    a: "I understand. Most coaching does not work, and the reason is structural. Generic coaching is open-ended. You go in with a vague problem, you talk it through, you leave feeling slightly better, nothing changes in your life. That is not a coaching problem. That is a strategy problem.\n\nThe Clarity Sprint is structured differently. Four weeks. Four sessions with a defined methodology. Written diagnostics. A 30-day plan you walk away with. You are not paying for unlimited talking. You are paying for senior strategic clarity delivered in a format that produces an outcome.\n\nIf you have tried coaching that did not work, this is not the same thing.",
  },
  {
    q: '"R12,500 is a lot of money for me right now."',
    a: "It is. I know it is. And I am not going to tell you to put it on a credit card or trust the universe.\n\nHere is the honest answer. The Clarity Sprint is calibrated for women earlier in their journey, but it is still a senior engagement. If R12,500 is a stretch you cannot make right now, the right move is to wait until it is not a stretch, or start with my free resources at The Aligned Woman Co. There is a free path into this work and you should take it if the paid path is not the right one for you yet.\n\nIf R12,500 is a stretch but a possible one, here is what I would say. The cost of staying stuck for another six months is almost always higher than the cost of getting clear in four weeks. But you have to make that calculation honestly, not as a way to convince yourself.",
  },
  {
    q: '"I do not have time for another commitment."',
    a: "Then you are exactly the woman this is built for.\n\nFour sessions over four weeks. Three of them are 60 minutes. One is 90 minutes. Total time commitment from you is about five and a half hours over a month, plus the workbook (which is structured to take 20 minutes a week, not hours).\n\nThe women who feel they do not have time for the Clarity Sprint are the women who cannot afford not to take it. Time pressure is usually the symptom of strategic misalignment, not the reason to avoid working on it.",
  },
  {
    q: '"How do I know this will actually work for me?"',
    a: "I cannot promise it will. Anyone who promises you a guaranteed outcome from coaching is either lying or has not done this work seriously.\n\nWhat I can tell you is this. Every woman who has done The A.L.I.V.E. Method in any tier of my work has left with more clarity than she came in with. Every Clarity Sprint client to date has walked away with a written 30-day plan she is still using. The methodology produces results because it is structured, not because of magic.\n\nWhat I can also tell you is that the women for whom this does not work are usually the women who book it without being ready to do the work. If you are reading this page hoping someone will fix you, this is not the right offer. If you are reading this page knowing you have to do something and looking for the right structure to do it inside, this is built for you.",
  },
  {
    q: '"What if I want to keep working with you after the four weeks?"',
    a: "You can. The Clarity Sprint is designed as a complete engagement, but many women move into the Senior Advisory after they finish. The Clarity Sprint fee is credited toward any Senior Advisory engagement booked within 60 days of the sprint closing.\n\nThat is not a hook. It is a structural way to make the Clarity Sprint a genuine on-ramp rather than a trap.",
  },
];

const sprintTestimonials = [
  {
    headline: "FOR THE FIRST TIME IN MY BUSINESS, EVERYTHING FEELS ALIGNED.",
    quote: "I came to Laura overwhelmed and unclear about how to position my brand. Within a matter of weeks, she helped me articulate exactly what I do, who I do it for, and how to confidently show up as a leader. For the first time in my business, everything feels aligned, and the results speak for themselves.",
    name: "Tasha Berrings",
    company: "Founder, Clean Beauty Startup",
  },
  {
    headline: "LAURA PROVIDES ACTIONABLE SUPPORT TO HELP YOU THRIVE.",
    quote: "Laura provides actionable support to help you thrive. If you're considering her for consulting or coaching, I can hands down say you're getting your money's worth. You leave with valuable insights and practical techniques to help navigate and reconnect with what truly drives you, all while protecting your energy so you don't end up overworked and burnt out. One session and Laura will leave you feeling empowered. I highly recommend her services.",
    name: "Tharunisa Reddy",
    company: "",
  },
  {
    headline: "WORKING WITH LAURA WAS LIKE PLUGGING MY BUSINESS INTO POWER.",
    quote: "Working with Laura was like plugging my business into power. She pulled the strategy, story, and messaging out of me in a way that felt effortless. The outcome was anything but. I now have a clear roadmap, a stronger offer, and marketing that finally makes sense and feels like me.",
    name: "Vanessa Rathbone",
    company: "Founder, Wellness Consultancy",
  },
  {
    headline: "SHE TAUGHT ME TO BACK MYSELF.",
    quote: "Laura is just phenomenal. She helped me connect to my core and feel more confident about what I do and the value I provide to others. I feel far less awkward selling myself or my services. She taught me to back myself, and to detach my sense of self-worth from how much I make. It set me free, and I am excited for the next chapter in my career.",
    name: "Iris Smyth",
    company: "",
  },
  {
    headline: "BRAND THERAPIST, COACH, AND VISIONARY ALL IN ONE.",
    quote: "Laura isn't just a strategist. She's a brand therapist, coach, and visionary all in one. Her ability to combine mindset work with razor-sharp strategy is unmatched. I walked away with more than a brand. I walked away with confidence, direction, and a business that is finally growing.",
    name: "Elena Sterling",
    company: "CEO, Luxury Wellness Brand",
  },
  {
    headline: "ZOOM OUT AND ZOOM IN WITH EQUAL BRILLIANCE.",
    quote: "I have worked with other consultants before, but no one has Laura's ability to zoom out and zoom in with equal brilliance. Her mind is next level.",
    name: "Ashleigh Carter",
    company: "Founder, Thee Lux Retreat Co.",
  },
];

function ObjectionAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div key={i} className="border-b border-foreground/15">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group"
          >
            <span
              className="font-serif italic text-lg md:text-xl leading-snug"
              style={{ color: BRAND }}
            >
              {item.q}
            </span>
            {open === i ? (
              <Minus className="w-4 h-4 flex-shrink-0 ml-4 text-foreground/50" />
            ) : (
              <Plus className="w-4 h-4 flex-shrink-0 ml-4 text-foreground/50" />
            )}
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="pb-6 pr-6">
                  {item.a.split("\n\n").map((para, j) => (
                    <p key={j} className="text-[14px] text-muted-foreground leading-relaxed mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function SprintCarousel({ testimonials }) {
  const [idx, setIdx] = useState(0);
  const itemsPerPage = 3;
  const page = Math.floor(idx / itemsPerPage);
  const startIdx = page * itemsPerPage;
  const visible = testimonials.slice(startIdx, startIdx + itemsPerPage);

  const next = () => setIdx((idx + itemsPerPage) % testimonials.length);
  const prev = () => setIdx((idx - itemsPerPage + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + itemsPerPage) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-6 md:gap-8">
      <button onClick={prev} aria-label="Previous" className="flex flex-shrink-0 items-center justify-center hover:text-primary transition-all">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex md:grid overflow-x-auto md:overflow-x-visible md:grid-cols-3 gap-8 md:gap-12 pb-4 md:pb-0 flex-1">
        {visible.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="text-center flex-shrink-0 w-full md:w-auto"
          >
            <h3 className="font-serif font-bold text-lg md:text-2xl leading-[1.05] tracking-tight uppercase mb-6">
              {t.headline}
            </h3>
            <p className="text-[9px] md:text-xs tracking-widest uppercase leading-relaxed mb-6 text-muted-foreground">
              {t.quote}
            </p>
            <p className="font-serif italic text-xs md:text-sm text-foreground/70">
              <span style={{ color: BRAND }}>{t.name}</span>
              {t.company ? ` | ${t.company}` : ""}
            </p>
          </motion.div>
        ))}
      </div>
      <button onClick={next} aria-label="Next" className="flex flex-shrink-0 items-center justify-center hover:text-primary transition-all">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

const DiscoveryBtn = ({ dark = false, className = "" }) => (
  <a
    href="https://calendly.com/hello-alignedwomanco/30min"
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-[11px] tracking-editorial uppercase font-semibold transition-all duration-300 group btn-pulse text-ivory ${className}`}
    style={{ backgroundColor: "#C2858B" }}
  >
    Book a Discovery Call
    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
  </a>
);

const BookBtn = ({ dark = false, className = "" }) => (
  <form
    name="PayFastPayNowForm"
    action="https://payment.payfast.io/eng/process"
    method="post"
    className="inline-block"
  >
    <input type="hidden" name="cmd" value="_paynow" />
    <input type="hidden" name="receiver" value="32598411" />
    <input type="hidden" name="return_url" value="https://laurajanethomas.biz/claritysprint" />
    <input type="hidden" name="cancel_url" value="https://laurajanethomas.biz/claritysprint" />
    <input type="hidden" name="notify_url" value="https://laurajanethomas.biz/claritysprint" />
    <input type="hidden" name="amount" value="12500" />
    <input type="hidden" name="item_name" value="Clarity Sprint" />
    <button
      type="submit"
      className={`inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-[11px] tracking-editorial uppercase font-semibold transition-all duration-300 group btn-pulse ${dark ? "bg-ivory text-oxblood hover:bg-ivory/90" : "text-ivory"} ${className}`}
      style={!dark ? { backgroundColor: "#C2858B" } : {}}
    >
      Book Your Clarity Sprint, R12,500
      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
    </button>
  </form>
);

export default function ClaritySpring() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <title>The Clarity Sprint | Senior Strategic Coaching for Women Building What's Next | Laura Thomas</title>
      <Navbar />

      {/* HERO */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-20 md:pt-40 md:pb-40"
        style={{ backgroundColor: BRAND }}
      >
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/9c5ae9111_efca8aa6761e6e74544ba4e9681156c9.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.18 }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(194, 133, 139, 0.3)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <p className="text-[10px] tracking-editorial uppercase text-white/50 mb-8">
            A limited engagement for anyone starting, growing, or repositioning a business.
          </p>
          <h1 className="font-serif text-white leading-[1.0] tracking-tight mb-8" style={{ fontSize: "clamp(2.4rem, 6vw, 6.5rem)" }}>
            <span className="block">You don't need another</span>
            <span className="block">motivational quote.</span>
            <span className="block font-serif italic" style={{ color: "rgba(255,200,180,0.85)" }}>You need a plan.</span>
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Six weeks. Four strategic sessions. One clear plan to build a business that actually works, with a senior brain to guide you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <DiscoveryBtn />
          </div>
          <div className="mt-8 max-w-xl mx-auto space-y-2">
            <p className="text-white/55 text-[13px] md:text-[15px] tracking-wide">Limited to 3 places per month. Online. Starts within 7 days of booking.</p>
            <p className="font-serif italic text-[13px] md:text-[15px]" style={{ color: "rgba(255,200,180,0.70)" }}>
              Usually I work at fractional CMO and advisory rates. The Business Sprint is a defined six-week engagement, calibrated below those rates, because doing this work with founders on their own businesses is what I love most.
            </p>
          </div>
        </motion.div>

        {/* Press bar */}
        <div className="relative z-10 w-full mt-12 md:mt-20">
          <PressMarquee isDark={true} />
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="relative overflow-hidden py-16 md:py-28" style={{ minHeight: "60vh" }}>
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/4d61a4013_Extend_the_existing_image_hori_Nano_Banana_2_79564.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "hsla(36, 33%, 94%, 0.85)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 {...fadeUp(0)} className="font-serif text-4xl md:text-6xl leading-[0.92] tracking-tight mb-12 text-foreground">
              Let's be honest about where you actually are.
            </motion.h2>
            <motion.div {...fadeUp(0.1)} className="space-y-5 text-[15px] leading-relaxed">
              <p className="text-foreground">Maybe you are at the start. You have the idea, maybe a name, maybe a domain you registered at 11pm to prove to yourself you were serious, maybe stock already sitting in a cupboard. And then you stalled, because you do not actually know how to begin.</p>
              <p className="text-foreground">Or maybe you are further along. You built something real. It works, more or less. But it has plateaued, or lost the thread of what made it different, or started running you instead of the other way around. You are busier than ever and the growth does not match the effort.</p>
              <p className="text-foreground">Either way, the problem is the same. You are capable. You are not short on drive, you have built and carried things most people would not attempt. What you are missing is a clear next move, and a senior set of eyes on the actual situation.</p>
              <p className="text-foreground">So you research. You take the free course. You ask ChatGPT. You end up with more information and somehow less clarity. <span className="font-serif italic" style={{ color: BRAND }}>(Yes, close the tab.)</span></p>
              <p className="text-foreground text-base md:text-lg leading-relaxed pt-2">
                Information is not what is missing. A plan is. And someone who has actually built the thing, not just talked about building it, to help you make the calls that only experience can make.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE BRIDGE */}
      <section className="relative overflow-hidden bg-ivory" style={{ minHeight: "80vh" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-36">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1 }}
              className="aspect-[3/4] overflow-hidden hidden lg:block"
            >
              <img
                src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/16e609620_Facetune_17-04-2026-20-07-04.jpg"
                alt="Laura Jane Thomas"
                className="w-full h-full object-cover"
                style={{ opacity: 0.75 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15 }}
              className="space-y-5"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight" style={{ color: "#1A1A1A" }}>
                I have built <span className="italic" style={{ color: BRAND }}>the real thing.</span>
              </h2>
              <p className="text-muted-foreground text-[14px] leading-relaxed">Before I advised anyone, I built and ran my own marketing agency for over a decade and led brand and marketing work for some of the biggest names in the market.</p>
              <p className="text-muted-foreground text-[14px] leading-relaxed">I have built a business from nothing, and I have been the strategist brought in to fix and grow ones that were already established. I have sat on both sides of the problem you are bringing me.</p>
              <p className="text-muted-foreground text-[14px] leading-relaxed">So when we work on your positioning, your offer, and your plan, you are not getting theory or a borrowed framework off the internet. You are getting someone who has made these exact decisions with real money on the line, many times over.</p>
              <p className="text-muted-foreground text-[14px] leading-relaxed">I also learned the hard way what it costs to build something while running yourself into the ground. After a decade at full tilt, my body called it. I rebuilt, and I changed how I work and how I help the people I work with. So we get the business right, the position, the offer, the plan, and we do it in a way you can actually sustain.</p>
              <p className="text-foreground text-[14px] leading-relaxed font-medium font-serif italic" style={{ color: BRAND }}>That is the difference. Operator experience, without the burnout most business advice runs on.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE OFFER / A.L.I.V.E. METHOD */}
      <div
        style={{
          backgroundImage: `url("https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/2287c0313_Screenshot2026-04-17at131145.png")`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="fixed-bg-wrapper"
      >
        <div style={{ backgroundColor: "rgba(245,241,236,0.88)" }}>
          <section className="py-16 md:py-28 px-6">
            <div className="max-w-[1200px] mx-auto">
              <motion.div {...fadeUp(0)} className="mb-12 text-center max-w-3xl mx-auto">
                <p className="text-[10px] tracking-editorial uppercase mb-6" style={{ color: BRAND }}>— The Offer</p>
                <h2 className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight mb-6" style={{ color: "#1A1A1A" }}>
                  Introducing <span className="italic" style={{ color: BRAND }}>The Business Sprint.</span>
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
                  A six-week engagement that takes you from stuck on your next move to clear, with a position, an offer, a brand, a way to reach people, and a plan you can run. Whether that means building the first version or fixing the version you already have.
                </p>
                <p className="font-serif italic text-lg md:text-xl" style={{ color: BRAND }}>
                  This is not a course. It is not generic business coaching. It is senior strategy, one to one, from someone who has built businesses and brands at the top end.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mt-6">
                  You bring the business. I bring the plan.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.1)} className="text-center text-[14px] text-muted-foreground mb-16 max-w-2xl mx-auto space-y-4">
                <p>We meet four times across the six weeks, an hour at a time. In each session I do the senior thinking with you, the positioning calls, the offer and pricing decisions, the strategy that usually takes years and expensive mistakes to work out alone. You leave each one knowing exactly what your next move is and why.</p>
                <p>By the end you do not have a folder of advice. You have a positioned business, a clear offer, a way to reach the right people, and a 90-day plan you are already running. The workbook keeps it structured between sessions, and I am on Voxer whenever you want a steer.</p>
                <p>And because we build it on your actual business, it is genuinely yours. You walk out with the thing built and the ability to keep building it, not a dependency on me or anyone else. It runs on my A.L.I.V.E. Method underneath.</p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(26,26,26,0.10)" }}>
                {weeks.map((item, i) => (
                  <motion.div
                    key={item.letter}
                    {...fadeUp(i * 0.08)}
                    className="p-8 md:p-10 transition-transform duration-500 hover:scale-105 hover:z-10 relative"
                    style={{ backgroundColor: "rgba(245,238,228,0.97)" }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-serif italic leading-none" style={{ fontSize: "5rem", color: BRAND, lineHeight: 1 }}>{item.letter}</span>
                      <span className="text-[9px] tracking-editorial uppercase text-muted-foreground mt-2">{item.week}</span>
                    </div>
                    <p className="text-lg font-serif font-bold mb-2" style={{ color: "#1A1A1A" }}>{item.label}</p>
                    <p className="text-sm italic leading-snug mb-3 font-serif" style={{ color: BRAND }}>{item.sub}</p>
                    {item.body.split("\n\n").map((p, j) => (
                      <p key={j} className="text-xs leading-relaxed mb-3" style={{ color: "rgba(26,26,26,0.55)" }}>{p}</p>
                    ))}
                    <p className="text-xs font-semibold mt-3" style={{ color: "#1A1A1A" }}>You leave with:</p>
                    <p className="text-xs leading-relaxed italic" style={{ color: "rgba(26,26,26,0.60)" }}>{item.leave}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p {...fadeUp(0.3)} className="text-center font-serif italic text-2xl md:text-3xl mt-16" style={{ color: BRAND }}>
                Six weeks. Four sessions. One plan you can run.
              </motion.p>
            </div>
          </section>

          {/* SECTION 5: VALUE STACK */}
          <section className="py-16 md:py-24 px-6">
            <div className="max-w-[1400px] mx-auto">
              <motion.div {...fadeUp(0)} className="text-center mb-16">
                <p className="text-[10px] tracking-editorial uppercase mb-6" style={{ color: BRAND }}>— What You Get</p>
                <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-4" style={{ color: "#1A1A1A" }}>
                  What you get inside <span className="italic" style={{ color: BRAND }}>The Clarity Sprint.</span>
                </h2>
                <p className="text-muted-foreground text-[15px] max-w-2xl mx-auto">
                  A complete senior coaching engagement, structured for women who need clarity fast and a plan they can execute.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.1)} className="mb-4">
                <p className="text-[10px] tracking-editorial uppercase mb-6 font-semibold" style={{ color: BRAND }}>The Core Engagement</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-px mb-4" style={{ backgroundColor: "rgba(26,26,26,0.10)" }}>
                {coreItems.map((item, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.06)} className="p-6 md:p-8" style={{ backgroundColor: "rgba(245,238,228,0.97)" }}>
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-serif font-bold text-sm md:text-base leading-tight" style={{ color: "#1A1A1A" }}>{item.title}</p>
                    </div>
                    <p className="text-[10px] tracking-editorial uppercase mb-3 font-semibold" style={{ color: BRAND }}>{item.value}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(26,26,26,0.55)" }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div {...fadeUp(0.1)} className="mt-12 mb-6">
                <p className="text-[10px] tracking-editorial uppercase font-semibold" style={{ color: BRAND }}>Plus These Bonuses</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16" style={{ backgroundColor: "rgba(26,26,26,0.10)" }}>
                {bonuses.map((item, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.08)} className="p-6 md:p-8 relative" style={{ backgroundColor: "rgba(38,3,15,0.95)" }}>
                    <span className="inline-block mb-4 px-3 py-1 text-[9px] tracking-editorial uppercase font-bold border border-white/30 text-white/70">BONUS {i + 1}</span>
                    <p className="font-serif font-bold text-sm md:text-base mb-2 text-white">{item.title}</p>
                    <p className="text-[10px] tracking-editorial uppercase mb-3 line-through text-white/40">Value: {item.value}</p>
                    <p className="text-xs leading-relaxed text-white/65">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Total */}
              <motion.div {...fadeUp(0.2)} className="border border-foreground/20 p-8 md:p-12 text-center max-w-2xl mx-auto mb-10" style={{ backgroundColor: "rgba(245,238,228,0.95)" }}>
                <p className="text-[14px] text-muted-foreground mb-2">If you booked each element separately at standard rates:</p>
                <p className="font-serif text-4xl font-bold mb-4 line-through text-muted-foreground">R163,000</p>
                <p className="text-[14px] text-muted-foreground mb-6">The Clarity Sprint is calibrated for women earlier in their journey, at</p>
                <p className="font-serif text-6xl md:text-7xl font-bold mb-6" style={{ color: BRAND }}>R12,500</p>
                <p className="font-serif italic text-[14px] mb-8" style={{ color: BRAND }}>
                  That is not a discount. It is a calibrated rate, because building businesses with women starting out is where I actually love spending my time. The Aligned Woman Blueprint is included because the work continues long after the four weeks end, and I want every woman who sprints with me to have a full year of access to the methodology that built it.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <BookBtn />
                  <DiscoveryBtn />
                </div>
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mt-4">Limited to 3 women per month. Online only. Starts within 7 days of booking.</p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* SECTION 6: OBJECTION HANDLING */}
      <section className="bg-ivory py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div {...fadeUp(0)} className="mb-12">
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-4">
              What you might be thinking right now.
            </h2>
            <p className="text-muted-foreground text-[15px]">
              The honest answers to the objections most women have at this point on the page.
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto text-left">
            <ObjectionAccordion items={objections} />
          </div>
          <motion.div {...fadeUp(0.2)} className="mt-12 space-y-4">
            <p className="font-serif italic text-xl md:text-2xl" style={{ color: BRAND }}>
              If you have read this far and you are still here, you already know what you are going to do.
            </p>
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <BookBtn />
                <DiscoveryBtn />
              </div>
              <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mt-4">Limited to 3 women per month. Online only. Starts within 7 days of booking.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIAL CAROUSEL */}
      <section className="bg-foreground/5 py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <h2 className="font-serif italic text-4xl md:text-6xl leading-[0.95] tracking-tight mb-4">
              What women say after working with me.
            </h2>
            <p className="text-muted-foreground text-[14px]">Senior receipts from the wider practice. Real outcomes. Named voices.</p>
          </motion.div>
          <SprintCarousel testimonials={sprintTestimonials} />
          <motion.p {...fadeUp(0.2)} className="text-center text-[13px] text-muted-foreground max-w-2xl mx-auto mt-16 leading-relaxed">
            The Clarity Sprint sits inside a senior strategy practice that has worked with founders, CEOs, and senior teams across financial services, retail, luxury, wellness, marketing, and professional services. Speaker engagements include EY, Oracle, and corporate Women's Day programs across South Africa.
          </motion.p>
        </div>
      </section>

      {/* SECTION 8: WHO THIS IS FOR */}
      <section className="py-16 md:py-28" style={{ backgroundColor: BRAND }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center mb-16 text-ivory">
            <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-8">— Is This Right For You?</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-4">
              Is this the right offer for you?
            </h2>
            <p className="text-ivory/70 text-[15px]">The Clarity Sprint is built for a specific kind of woman. Read these honestly.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <motion.div {...fadeUp(0.1)} className="rounded-lg p-8 md:p-12" style={{ backgroundColor: "hsla(36, 33%, 94%, 0.92)" }}>
              <p className="text-[10px] tracking-editorial uppercase font-bold text-foreground mb-8">This is for you if:</p>
              <ul className="space-y-5">
                {[
                  "You are starting out, building, or repositioning what's next, and you need clarity on what to actually do.",
                  "You have done some of the inner work already (therapy, journaling, books) and the work has stopped producing new insight without structure to act on.",
                  "You are a high-functioning woman who looks fine on paper and knows something underneath is not working.",
                  "You have tried coaching that did not stick, and you are willing to try a different format that is structured, time-bound, and produces written outputs.",
                  "You can commit to four 60 to 90 minute sessions over four weeks plus 20 minutes of weekly workbook reflection.",
                  "You want senior strategic clarity, not motivational support.",
                  "You are ready to make decisions and follow through, not just talk about possibilities.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: BRAND }} />
                    <span className="text-foreground text-[14px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="rounded-lg p-8 md:p-12" style={{ backgroundColor: "hsla(36, 33%, 94%, 0.92)" }}>
              <p className="text-[10px] tracking-editorial uppercase font-bold text-foreground mb-8">This is not for you if:</p>
              <ul className="space-y-5">
                {[
                  "You are looking for a hype coach who will tell you everything you want to hear.",
                  "You are in the middle of an active mental health crisis. The Clarity Sprint is strategic coaching, not therapy. If you need clinical support, the right move is to find a therapist or psychologist before doing this work.",
                  "You want unlimited access to me at this price point. The Voxer support inside the Clarity Sprint is meaningful but it is not 24/7 advisory. Senior advisory is a separate engagement.",
                  "You want to be told what to do without having to participate in finding the answers. This work is collaborative. I bring the framework, you bring the situation, we build the plan together.",
                  "You are not yet ready to make changes in your life. If you book this hoping it will move you when you are not ready to be moved, the work will not produce what you are paying for.",
                  "You are looking for the cheapest version of senior coaching. The Clarity Sprint is calibrated, not discounted. If price is your primary filter, this is not the right offer.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-foreground/60" />
                    <span className="text-foreground text-[14px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div {...fadeUp(0.3)} className="text-center space-y-8">
            <p className="font-serif italic text-xl md:text-2xl text-ivory/85">
              If you have read both columns and you are still here, you already know which one applies to you.
            </p>
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <BookBtn dark />
                <DiscoveryBtn />
              </div>
              <p className="text-[10px] tracking-editorial uppercase text-ivory/50 mt-4">Limited to 3 women per month. Online only. Starts within 7 days of booking.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="relative px-6 text-center overflow-hidden" style={{ paddingTop: "clamp(48px, 8vw, 144px)", paddingBottom: "clamp(64px, 10vw, 144px)" }}>
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/b2c063548_370e8bc03b7ff18652cfa8bfcd4aafef.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(245,238,228,0.92)" }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— Two Ways To Start</p>
          <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-8" style={{ color: "#1A1A1A" }}>
            This is the moment.
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground mb-12 text-left max-w-2xl mx-auto">
            <p>You have read the page. You know what is being offered. You know what it costs. You know what you would walk away with at the end of four weeks.</p>
            <p>The only question left is whether you are ready.</p>
            <p>You click the button below. You complete a short intake form so I understand where you are starting from. I review it within 48 hours. We schedule your first call within 7 days of confirmation.</p>
            <p>Four weeks later, you have a written diagnostic, a 30-day action plan, a vision document, and a year of access to The Aligned Woman Blueprint to keep the work alive.</p>
            <p className="font-serif italic" style={{ color: BRAND }}>You do not have to be certain. You only have to be ready to begin.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            <div className="border border-foreground/20 p-8" style={{ backgroundColor: "rgba(245,238,228,0.95)" }}>
              <p className="font-serif text-xl mb-3" style={{ color: "#1A1A1A" }}>Option 1: Book directly.</p>
              <p className="text-[13px] text-muted-foreground mb-6">You know the Clarity Sprint is right for you. Click below, complete the intake, and I will be in touch within 48 hours to schedule your first call.</p>
              <BookBtn className="w-full text-center" />
            </div>
            <div className="border border-foreground/20 p-8" style={{ backgroundColor: "rgba(245,238,228,0.95)" }}>
              <p className="font-serif text-xl mb-3" style={{ color: "#1A1A1A" }}>Option 2: Book a discovery call.</p>
              <p className="text-[13px] text-muted-foreground mb-6">You want to hear my voice and ask a few questions before committing. Book a complimentary 20-minute call. No coaching, no pressure. A fit conversation only.</p>
              <a
                href="https://calendly.com/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-3 px-8 py-4 text-[10px] md:text-[11px] tracking-editorial uppercase font-semibold text-ivory transition-all duration-300 btn-pulse"
                style={{ backgroundColor: "#C2858B" }}
              >
                Book a Discovery Call
              </a>
            </div>
          </div>

          <div className="border-t border-foreground/15 pt-8 text-left max-w-xl mx-auto">
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-3 font-semibold">The Practical Details</p>
            <ul className="space-y-1 text-[13px] text-muted-foreground">
              <li>Three women per month. No exceptions, no overflow.</li>
              <li>Online sessions, scheduled around your real life.</li>
              <li>Starts within 7 days of booking confirmation.</li>
              <li>R12,500, payable in full at booking. Payment in 2 instalments available on request.</li>
            </ul>
          </div>
          <p className="text-[12px] text-muted-foreground mt-6">
            Or if you are not yet ready for either option,{" "}
            <a href="https://alignedwomanco.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-oxblood transition-colors">
              explore my free resources at The Aligned Woman Co.
            </a>{" "}
            instead.
          </p>
        </motion.div>
      </section>

      {/* SECTION 10: PS */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <motion.div {...fadeUp(0)}>
              <p className="font-serif italic text-2xl mb-10" style={{ color: BRAND }}>PS, A Personal Note</p>
              <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
                <p>If you have made it to the bottom of this page, I want to say something to you directly.</p>
                <p>I built the Clarity Sprint because I remember being where you are now.</p>
                <p>I remember the spinning. The Googling at midnight. The conversations with people who meant well but could not see what I could not see. I remember the hormones depleted, the cortisol gone, the body that finally said no when I had been ignoring it for years.</p>
                <p>I also remember what it felt like to find the right person at the right moment. Someone who could see what I could not. Someone who told me the truth even when the truth was uncomfortable. Someone who gave me a structure to hold onto when everything else felt like sand.</p>
                <p>That is what I am offering you. Not a transformation. Not a breakthrough. Not a quick fix. A structure. A senior strategist who will tell you the truth. Four weeks of focused work designed to give you exactly what I needed when I was where you are.</p>
                <p>If you are ready, I will be honoured to do this work with you.</p>
                <p>If you are not ready yet, I will be here when you are.</p>
                <p>Either way, I am genuinely glad you read this far.</p>
              </div>
              <p className="font-serif italic text-2xl mt-8" style={{ color: BRAND }}>Laura Jane Thomas</p>
            </motion.div>
          </div>
        </div>
      </section>

      <ResourcesSection />
      <Footer />
    </div>
  );
}