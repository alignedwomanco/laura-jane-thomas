import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Minus, Check, X } from "lucide-react";
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
    num: "01",
    stage: "AWARENESS",
    title: "Where are you actually, and what is really going on?",
    body: "Most women skip this step. They jump straight to action because action feels productive. But action without awareness is how you end up exhausted and going nowhere.\n\nIn our first 60-minute call, we go beneath the surface. We map where you are right now across the areas that matter. Career, business, energy, relationships, identity. We name the patterns. We name the cost of staying where you are. And we get honest about what you have been avoiding.",
    leave: "a clear, written diagnostic of your current state and the specific misalignments that are keeping you stuck.",
  },
  {
    num: "02",
    stage: "LIBERATION",
    title: "What is in your way, and how do we move it?",
    body: "Now we work on what is holding you back. The beliefs you inherited. The patterns you keep repeating. The \"shoulds\" you have never questioned. The fears dressed up as practicality.\n\nIn our second 60-minute call, we use NLP and strategic questioning to surface and dismantle the specific blocks keeping you stuck. This is not a vague mindset session. We name the block, we work it, and you leave the call lighter and clearer.",
    leave: "a written list of the specific blocks we worked on, plus the reframes and tools to manage them when they show up again.",
  },
  {
    num: "03",
    stage: "INTENTIONAL ACTION",
    title: "What do you actually want, and what is the plan to get there?",
    body: "This is the strategy week. By now you are clearer on where you are and what has been in the way. So we build the plan.\n\nIn our third 60-minute call, we get specific about what you want next. Not the vague \"more freedom\" or \"more impact\" version. The concrete version. Then we reverse-engineer it. We map the priorities, the milestones, and the first 30 days of action.",
    leave: "a written 30-day action plan with prioritised next steps, calibrated to your actual capacity.",
  },
  {
    num: "04",
    stage: "VISION + EMBODIMENT",
    title: "Who do you need to become, and how do you hold this once I am gone?",
    body: "The final week is the longest call (90 minutes) because it does the most work. We zoom out to the bigger vision. We anchor the plan inside who you are becoming, not just what you are doing. And we install the practices that will keep you on track when life gets loud again.",
    leave: "a written vision document, your personal alignment practices, and the structure to hold all of this without me in your inbox.",
  },
];

const coreItems = [
  { label: "4 Strategic Coaching Calls", value: "R20,000", desc: "Three 60-minute sessions plus one 90-minute final session with me directly. Conducted online, scheduled around your real life. Recorded so you can revisit them." },
  { label: "The A.L.I.V.E. Method Workbook", value: "R3,500", desc: "A structured 40-page workbook that runs alongside the four weeks. Pre-call prompts to make our time together sharper, post-call exercises to embed what we work on." },
  { label: "Written Diagnostic and 30-Day Action Plan", value: "R7,500", desc: "At the end of Week 1, a written diagnostic of your current state. At the end of Week 3, a written 30-day action plan calibrated to your actual capacity. These are working documents you keep, not session notes." },
  { label: "Voxer Access Between Sessions", value: "R5,000", desc: "Voice and text support between our weekly calls, Monday to Friday. For the moments you need a sounding board, a reframe, or a steady voice before you make a decision." },
  { label: "Vision and Alignment Document", value: "R4,000", desc: "At the close of Week 4, a written vision document anchoring the work we have done and the practices that will keep you on track once the engagement ends." },
];

const bonusItems = [
  { label: "Tailored Resource Pack", value: "R3,500", desc: "Curated reading, exercises, and frameworks pulled from fifteen years of practice and matched to what you are actually working on. No generic resource library. The right tools for your situation." },
  { label: "30-Day Recalibration Call", value: "R3,500", desc: "Thirty days after the engagement ends, a 30-minute call to review progress and recalibrate if needed. Most coaches end the relationship at the close. I do not. This call is built in." },
  { label: "The Aligned Woman Blueprint", value: "R116,000", desc: "One full year of access to The Aligned Woman Blueprint, the complete course built on The A.L.I.V.E. Method. The methodology, the practices, the full toolkit, every module, every resource. A year to use, integrate, and apply long after the Clarity Sprint ends." },
];

const objections = [
  {
    q: "I have tried coaching before and it did not work for me.",
    a: "I understand. Most coaching does not work, and the reason is structural. Generic coaching is open-ended. You go in with a vague problem, you talk it through, you leave feeling slightly better, nothing changes in your life. That is not a coaching problem. That is a strategy problem.\n\nThe Clarity Sprint is structured differently. Four weeks. Four sessions with a defined methodology. Written diagnostics. A 30-day plan you walk away with. You are not paying for unlimited talking. You are paying for senior strategic clarity delivered in a format that produces an outcome.\n\nIf you have tried coaching that did not work, this is not the same thing.",
  },
  {
    q: "R12,500 is a lot of money for me right now.",
    a: "It is. I know it is. And I am not going to tell you to put it on a credit card or trust the universe.\n\nHere is the honest answer. The Clarity Sprint is calibrated for women earlier in their journey, but it is still a senior engagement. If R12,500 is a stretch you cannot make right now, the right move is to wait until it is not a stretch, or start with my free resources at The Aligned Woman Co. There is a free path into this work and you should take it if the paid path is not the right one for you yet.\n\nIf R12,500 is a stretch but a possible one: the cost of staying stuck for another six months is almost always higher than the cost of getting clear in four weeks. But you have to make that calculation honestly, not as a way to convince yourself.",
  },
  {
    q: "I do not have time for another commitment.",
    a: "Then you are exactly the woman this is built for.\n\nFour sessions over four weeks. Three of them are 60 minutes. One is 90 minutes. Total time commitment from you is about five and a half hours over a month, plus the workbook (which is structured to take 20 minutes a week, not hours).\n\nThe women who feel they do not have time for the Clarity Sprint are the women who cannot afford not to take it. Time pressure is usually the symptom of strategic misalignment, not the reason to avoid working on it.",
  },
  {
    q: "How do I know this will actually work for me?",
    a: "I cannot promise it will. Anyone who promises you a guaranteed outcome from coaching is either lying or has not done this work seriously.\n\nWhat I can tell you is this. Every woman who has done The A.L.I.V.E. Method in any tier of my work has left with more clarity than she came in with. Every Clarity Sprint client to date has walked away with a written 30-day plan she is still using. The methodology produces results because it is structured, not because of magic.\n\nThe women for whom this does not work are usually the women who book it without being ready to do the work. If you are reading this page hoping someone will fix you, this is not the right offer. If you are reading this page knowing you have to do something and looking for the right structure to do it inside, this is built for you.",
  },
  {
    q: "What if I want to keep working with you after the four weeks?",
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
    quote: "Laura provides actionable support to help you thrive. If you're considering her for consulting or coaching, I can hands down say you're getting your money's worth. You leave with valuable insights and practical techniques to help navigate and reconnect with what truly drives you, all while protecting your energy so you don't end up overworked and burnt out.",
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

const forYou = [
  "You are starting out, building, or repositioning what's next, and you need clarity on what to actually do.",
  "You have done some of the inner work already (therapy, journaling, books) and the work has stopped producing new insight without structure to act on.",
  "You are a high-functioning woman who looks fine on paper and knows something underneath is not working.",
  "You have tried coaching that did not stick, and you are willing to try a different format that is structured, time-bound, and produces written outputs.",
  "You can commit to four 60 to 90 minute sessions over four weeks plus 20 minutes of weekly workbook reflection.",
  "You want senior strategic clarity, not motivational support.",
  "You are ready to make decisions and follow through, not just talk about possibilities.",
];

const notForYou = [
  "You are looking for a hype coach who will tell you everything you want to hear.",
  "You are in the middle of an active mental health crisis. The Clarity Sprint is strategic coaching, not therapy. If you need clinical support, the right move is to find a therapist or psychologist before doing this work.",
  "You want unlimited access to me at this price point. The Voxer support inside the Clarity Sprint is meaningful but it is not 24/7 advisory. Senior advisory is a separate engagement.",
  "You want to be told what to do without having to participate in finding the answers. This work is collaborative. I bring the framework, you bring the situation, we build the plan together.",
  "You are not yet ready to make changes in your life. If you book this hoping it will move you when you are not ready to be moved, the work will not produce what you are paying for.",
  "You are looking for the cheapest version of senior coaching. The Clarity Sprint is calibrated, not discounted. If price is your primary filter, this is not the right offer.",
];

function ObjectionAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-0">
      {objections.map((obj, i) => (
        <div key={i} className="border-b border-foreground/15">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group"
          >
            <span className="font-serif italic text-lg md:text-xl text-oxblood group-hover:opacity-80 transition-opacity">{obj.q}</span>
            {open === i ? <Minus className="w-4 h-4 flex-shrink-0 ml-4 text-oxblood" /> : <Plus className="w-4 h-4 flex-shrink-0 ml-4 text-oxblood" />}
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
                <div className="pb-8 pr-6 space-y-4">
                  {obj.a.split("\n\n").map((para, j) => (
                    <p key={j} className="text-[15px] text-muted-foreground leading-relaxed">{para}</p>
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

function SprintCarousel() {
  const [i, setI] = useState(0);
  const itemsPerPage = 3;
  const currentPage = Math.floor(i / itemsPerPage);
  const startIdx = currentPage * itemsPerPage;
  const visible = sprintTestimonials.slice(startIdx, startIdx + itemsPerPage);

  const next = () => setI((i + itemsPerPage) % sprintTestimonials.length);
  const prev = () => setI((i - itemsPerPage + sprintTestimonials.length) % sprintTestimonials.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setI((prev) => (prev + itemsPerPage) % sprintTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-6 md:gap-8">
      <button onClick={prev} aria-label="Previous" className="flex flex-shrink-0 items-center justify-center hover:text-primary transition-all">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex md:grid overflow-x-auto md:overflow-x-visible md:grid-cols-3 gap-8 md:gap-12 pb-4 md:pb-0 flex-1">
        {visible.map((t, idx) => (
          <motion.div
            key={startIdx + idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="text-center flex-shrink-0 w-full md:w-auto"
          >
            <h3 className="font-serif font-bold text-lg md:text-2xl leading-[1.05] tracking-tight uppercase mb-6">{t.headline}</h3>
            <p className="text-[9px] md:text-xs tracking-widest uppercase leading-relaxed mb-6 text-muted-foreground">{t.quote}</p>
            <p className="font-serif italic text-xs md:text-sm text-oxblood">
              {t.name}{t.company ? ` | ${t.company}` : ""}
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

const CtaBlock = ({ dark = false }) => (
  <div className={`text-center ${dark ? "" : ""}`}>
    <Link
      to="/claritysprint-intake"
      className={`inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-editorial uppercase font-semibold transition-all duration-300 group btn-pulse ${dark ? "border border-ivory/40 text-ivory hover:bg-ivory hover:text-oxblood" : "bg-foreground text-ivory hover:bg-oxblood"}`}
    >
      Book Your Clarity Sprint, R12,500
      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
    </Link>
    <p className={`text-[10px] tracking-editorial uppercase mt-4 ${dark ? "text-ivory/50" : "text-muted-foreground"}`}>
      Limited to 3 women per month. Online only. Starts within 7 days of booking.
    </p>
  </div>
);

export default function ClaritySpring() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <Navbar />

      {/* 1. HERO */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 md:pt-36 pb-20 md:pb-32"
        style={{ backgroundColor: BRAND }}
      >
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/9c5ae9111_efca8aa6761e6e74544ba4e9681156c9.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.22 }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(194, 133, 139, 0.4)" }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise3)' opacity='0.08'/%3E%3C/svg%3E")`,
            opacity: 0.7,
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <p className="text-[10px] tracking-editorial uppercase text-white/55 mb-8">
            A limited engagement for women starting out, building, or repositioning what's next.
          </p>
          <h1
            className="text-white leading-[1.0] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.6rem, 6vw, 7rem)" }}
          >
            You don't need another<br />motivational quote.
            <br />
            <span className="italic" style={{ color: "rgba(255,220,200,0.9)" }}>You need a plan.</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            4 weeks. 4 strategic coaching calls. 1 clear direction forward, so you can stop spinning and start moving.
          </p>
          <Link
            to="/claritysprint-intake"
            className="inline-flex items-center gap-3 border border-white/60 text-white px-10 py-4 text-[11px] tracking-editorial uppercase hover:bg-white transition-all duration-300 group btn-pulse mb-8"
            onMouseEnter={e => { e.currentTarget.style.color = BRAND; }}
            onMouseLeave={e => { e.currentTarget.style.color = "white"; }}
          >
            Book Your Clarity Sprint, R12,500
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <p className="text-[10px] tracking-editorial uppercase text-white/45">
            Limited to 3 women per month. Online only. Starts within 7 days of booking.
          </p>
          <p className="text-white/55 text-sm mt-3 max-w-xl mx-auto">
            Usually I work at senior advisory rates.{" "}
            <span className="italic" style={{ color: "rgba(255,220,200,0.8)" }}>
              The Clarity Sprint is calibrated for women earlier in their journey, because that is where I actually love spending my time.
            </span>
          </p>
        </motion.div>

        <div className="relative z-10 w-full mt-12">
          <PressMarquee isDark={true} />
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.p {...fadeUp(0)} className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">
              — The situation
            </motion.p>
            <motion.h2
              {...fadeUp(0.05)}
              className="leading-[1.0] tracking-tight mb-12"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 4vw, 4rem)", color: "#1A1A1A" }}
            >
              Let's be honest about where you are right now.
            </motion.h2>
            <motion.div {...fadeUp(0.1)} className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
              <p>You wake up and the first thing you feel isn't excitement. It's heaviness.</p>
              <p>You've built something. A career. A business. A life that looks good from the outside.</p>
              <p>But inside? You're running on empty. You're making decisions from a place of exhaustion, not clarity. And the question that keeps circling your mind at 2am is always the same.</p>
            </motion.div>
            <motion.div {...fadeUp(0.15)} className="my-10 border-l-4 border-oxblood pl-8 py-4">
              <p className="font-serif italic text-2xl md:text-3xl text-oxblood">
                "What am I actually doing with my life?"
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
              <p>Maybe your business has stalled and you cannot figure out why. Maybe you are stuck in a role that is slowly draining you. Maybe you have been so busy holding everything together for everyone else that you have completely lost sight of what you want.</p>
              <p>You have Googled. You have journaled. You have had the late-night conversations with friends who mean well but cannot give you what you actually need.</p>
              <p>And you are still stuck.</p>
            </motion.div>
            <motion.div {...fadeUp(0.25)} className="mt-10 space-y-4">
              <p className="font-serif text-xl md:text-2xl text-foreground font-semibold">
                Being stuck isn't a mindset problem. It is a strategy problem.
              </p>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                You don't need more inspiration. You need someone who has been where you are, who understands the real pressure you are under, and who can help you think clearly enough to make your next move.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE BRIDGE */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#1A1A1A", minHeight: "80vh" }}>
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/4d61a4013_Extend_the_existing_image_hori_Nano_Banana_2_79564.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.45 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,26,0.15) 0%, rgba(26,26,26,0.82) 55%, rgba(26,26,26,0.97) 100%)" }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            opacity: 0.6,
          }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-36 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
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
              style={{ opacity: 0.85 }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15 }}
            className="space-y-5"
          >
            <p className="text-[10px] tracking-editorial uppercase text-white/50">— The bridge</p>
            <h2
              className="text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              I know what stuck feels like.<br />
              <span className="italic" style={{ color: "rgba(255,220,200,0.85)" }}>I lived it.</span>
            </h2>
            <p className="text-white/75 text-[15px] leading-relaxed">
              At 33, I was on top of the world. I had built and run a successful marketing agency for over a decade. I was consulting for global brands, travelling internationally, chairing organisations, and hitting goals I once thought were impossible.
            </p>
            <p className="text-white/75 text-[15px] leading-relaxed">
              By 36, I was in full-blown burnout. Hormones depleted. Cortisol through the floor. My nervous system was constantly on alert. My doctor could not understand how I was still functioning.
            </p>
            <p className="text-white/75 text-[15px] leading-relaxed">
              So I shut everything down. I spent a year and thousands of rands on doctors, therapists, functional medicine specialists, and nervous system work. And I rebuilt. Not just my health, but my entire understanding of what it means to succeed without self-destructing.
            </p>
            <p className="text-white/75 text-[15px] leading-relaxed">
              That journey became The Aligned Woman Co. and The A.L.I.V.E. Method. But before all of that? I was exactly where you are right now.
            </p>
            <p className="font-serif italic text-white/90 text-lg">
              Stuck. Overwhelmed. Knowing something had to change but unable to see the path.
            </p>
            <p className="text-white/65 text-[14px] leading-relaxed">
              I am Laura Jane Thomas. Senior strategist. Former agency owner. Brand advisor. Speaker. And someone who had to learn the hard way that willpower alone will eventually break you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. THE OFFER */}
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

          <section className="py-20 md:py-32 px-6">
            <div className="max-w-[1400px] mx-auto">
              <motion.div {...fadeUp(0)} className="text-center mb-16">
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-6" style={{ color: BRAND }}>— The offer</p>
                <h2 className="leading-[0.95] tracking-tight mb-6" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 5vw, 5.5rem)", color: "#1A1A1A" }}>
                  Introducing The Clarity Sprint.
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                  A 4-week, high-touch coaching engagement designed to take you from stuck and overwhelmed to clear, focused, and moving forward with intention.
                </p>
                <p className="text-[14px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  This is not therapy. It is not generic life coaching. It is strategic coaching from a senior practitioner who has built businesses, advised global brands, and rebuilt herself from burnout. You bring the situation. I bring the framework, the questions, and the plan.
                </p>
              </motion.div>

              <p className="text-center text-[13px] text-muted-foreground mb-12 max-w-2xl mx-auto">
                Over four weeks, we work through The A.L.I.V.E. Method together. One stage per week. Each week builds on the last, so by the end you are not just clearer on what you want. You have a plan to actually go and get it.
              </p>

              {/* Week cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(26,26,26,0.10)" }}>
                {weeks.map((week, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp(i * 0.08)}
                    className="p-8 md:p-10 hover:scale-105 hover:z-10 transition-transform duration-500 relative"
                    style={{ backgroundColor: "rgba(245,238,228,0.95)" }}
                  >
                    <span className="block font-serif italic mb-3" style={{ fontSize: "5rem", lineHeight: 1, color: BRAND }}>{week.num}</span>
                    <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">{week.stage}</p>
                    <p className="font-serif text-lg mb-4 font-semibold" style={{ color: "#1A1A1A" }}>{week.title}</p>
                    {week.body.split("\n\n").map((p, j) => (
                      <p key={j} className="text-xs text-muted-foreground leading-relaxed mb-3">{p}</p>
                    ))}
                    <div className="mt-4 pt-4 border-t border-foreground/10">
                      <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-1">You leave with:</p>
                      <p className="text-xs italic" style={{ color: BRAND }}>{week.leave}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p {...fadeUp(0.3)} className="text-center font-serif italic text-xl mt-12" style={{ color: "#1A1A1A" }}>
                Four weeks. Four calls. One clear path forward.
              </motion.p>
            </div>
          </section>

          {/* 5. VALUE STACK */}
          <section className="py-20 md:py-32 px-6">
            <div className="max-w-[1400px] mx-auto">
              <motion.div {...fadeUp(0)} className="text-center mb-16">
                <p className="text-[10px] tracking-editorial uppercase mb-6" style={{ color: BRAND }}>— What you get</p>
                <h2 className="leading-[0.95] tracking-tight mb-4" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 4vw, 4rem)", color: "#1A1A1A" }}>
                  What you get inside The Clarity Sprint.
                </h2>
                <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto">
                  A complete senior coaching engagement, structured for women who need clarity fast and a plan they can execute.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                {/* Core items */}
                <motion.div {...fadeUp(0.1)}>
                  <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-6 pb-4 border-b border-foreground/15">The Core Engagement</p>
                  <div className="space-y-6">
                    {coreItems.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-1 bg-oxblood flex-shrink-0 mt-1 rounded-full" style={{ minHeight: "100%" }}></div>
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <p className="font-serif text-base font-semibold" style={{ color: "#1A1A1A" }}>{item.label}</p>
                            <span className="text-sm font-semibold text-oxblood flex-shrink-0">Value {item.value}</span>
                          </div>
                          <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Bonus items */}
                <motion.div {...fadeUp(0.2)}>
                  <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-6 pb-4 border-b border-foreground/15">Plus These Bonuses</p>
                  <div className="space-y-6">
                    {bonusItems.map((item, i) => (
                      <div key={i} className="flex gap-4 p-5 rounded" style={{ backgroundColor: "rgba(38,3,15,0.05)" }}>
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND }}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <p className="font-serif text-base font-semibold" style={{ color: "#1A1A1A" }}>{item.label}</p>
                            <span className="text-sm font-semibold text-oxblood flex-shrink-0">Value {item.value}</span>
                          </div>
                          <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Total */}
              <motion.div {...fadeUp(0.3)} className="max-w-2xl mx-auto text-center py-12 px-8 rounded" style={{ backgroundColor: "rgba(38,3,15,0.06)" }}>
                <p className="text-[13px] text-muted-foreground mb-4">
                  If you booked each of these elements separately at my standard rates:
                </p>
                <p className="font-serif text-3xl font-bold line-through text-muted-foreground/50 mb-2">R163,000</p>
                <p className="text-[15px] text-muted-foreground mb-6 leading-relaxed">
                  The Clarity Sprint is calibrated for women earlier in their journey, at R12,500. That is not a discount. It is a calibrated rate, because building businesses with women starting out is where I actually love spending my time.
                </p>
                <p className="font-serif text-5xl md:text-6xl font-bold mb-6" style={{ color: BRAND }}>R12,500</p>
                <CtaBlock />
              </motion.div>
            </div>
          </section>

        </div>
      </div>

      {/* 6. OBJECTION HANDLING */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="mb-16">
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-6">— Objections</p>
            <h2 className="leading-[0.95] tracking-tight mb-4" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 4vw, 4rem)", color: "#1A1A1A" }}>
              What you might be thinking right now.
            </h2>
            <p className="text-[15px] text-muted-foreground max-w-2xl">
              The honest answers to the objections most women have at this point on the page.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="max-w-3xl">
            <ObjectionAccordion />
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="mt-12">
            <p className="font-serif italic text-xl text-foreground mb-10">
              If you have read this far and you are still here, you already know what you are going to do.
            </p>
            <CtaBlock />
          </motion.div>
        </div>
      </section>

      {/* 7. SOCIAL PROOF CAROUSEL */}
      <section className="bg-ivory py-20 md:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center mb-20">
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-6">— Social proof</p>
            <h2 className="font-serif italic text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-4xl mx-auto mb-4">
              What women say after working with me.
            </h2>
            <p className="text-[15px] text-muted-foreground">Senior receipts from the wider practice. Real outcomes. Named voices.</p>
          </motion.div>

          <SprintCarousel />

          <motion.div {...fadeUp(0.2)} className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              The Clarity Sprint sits inside a senior strategy practice that has worked with founders, CEOs, and senior teams across financial services, retail, luxury, wellness, marketing, and professional services. Speaker engagements include EY, Oracle, and corporate Women's Day programs across South Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. WHO THIS IS FOR */}
      <section style={{ backgroundColor: BRAND }} className="text-white py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="mb-16">
            <p className="text-[10px] tracking-editorial uppercase text-white/50 mb-6">— Is this right for you</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-4 text-white">
              Is this the right offer for you?
            </h2>
            <p className="text-[15px] text-white/65 max-w-2xl">
              The Clarity Sprint is built for a specific kind of woman. Read these honestly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <motion.div {...fadeUp(0.1)}>
              <p className="text-[11px] tracking-editorial uppercase text-white/50 mb-8 pb-4 border-b border-white/15">This is for you if:</p>
              <ul className="space-y-5">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "rgba(255,220,200,0.8)" }} />
                    <span className="text-[15px] text-white/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <p className="text-[11px] tracking-editorial uppercase text-white/50 mb-8 pb-4 border-b border-white/15">This is not for you if:</p>
              <ul className="space-y-5">
                {notForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-white/40" />
                    <span className="text-[15px] text-white/65 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.3)} className="mt-16 text-center">
            <p className="font-serif italic text-xl md:text-2xl mb-10" style={{ color: "rgba(255,220,200,0.85)" }}>
              If you have read both columns and you are still here, you already know which one applies to you.
            </p>
            <Link
              to="/claritysprint-intake"
              className="inline-flex items-center gap-3 border border-white/40 text-white px-10 py-4 text-[11px] tracking-editorial uppercase hover:bg-white transition-all duration-300 group btn-pulse"
              onMouseEnter={e => { e.currentTarget.style.color = BRAND; }}
              onMouseLeave={e => { e.currentTarget.style.color = "white"; }}
            >
              Book Your Clarity Sprint, R12,500
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <p className="text-[10px] tracking-editorial uppercase text-white/40 mt-4">
              Limited to 3 women per month. Online only. Starts within 7 days of booking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p {...fadeUp(0)} className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— This is the moment</motion.p>
            <motion.h2
              {...fadeUp(0.05)}
              className="font-serif leading-[0.95] tracking-tight mb-10"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#1A1A1A" }}
            >
              This is the moment.
            </motion.h2>
            <motion.div {...fadeUp(0.1)} className="space-y-5 text-[15px] leading-relaxed text-muted-foreground mb-12">
              <p>You have read the page. You know what is being offered. You know what it costs. You know what you would walk away with at the end of four weeks.</p>
              <p>The only question left is whether you are ready.</p>
              <p>If the answer is yes, here is what happens next. You click the button below. You complete a short intake form so I understand where you are starting from. I review it within 48 hours. We schedule your first call within 7 days of confirmation.</p>
              <p>Four weeks later, you have a written diagnostic, a 30-day action plan, a vision document, and a year of access to The Aligned Woman Blueprint to keep the work alive.</p>
              <p className="font-serif italic text-foreground text-lg">
                You do not have to be certain. You only have to be ready to begin.
              </p>
            </motion.div>

            {/* Two options */}
            <motion.div {...fadeUp(0.2)} className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="border border-foreground/20 p-8 text-left">
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-4">Option 1</p>
                <p className="font-serif text-lg font-semibold mb-3" style={{ color: "#1A1A1A" }}>Book directly.</p>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
                  You know the Clarity Sprint is right for you. Click below, complete the intake, and I will be in touch within 48 hours to schedule your first call.
                </p>
                <Link
                  to="/claritysprint-intake"
                  className="inline-flex items-center gap-2 bg-foreground text-ivory px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all group btn-pulse w-full justify-center"
                >
                  Book Your Clarity Sprint, R12,500
                </Link>
              </div>
              <div className="border border-foreground/20 p-8 text-left">
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-4">Option 2</p>
                <p className="font-serif text-lg font-semibold mb-3" style={{ color: "#1A1A1A" }}>Book a discovery call.</p>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
                  You want to hear my voice and ask a few questions before committing. Book a complimentary 20-minute call. No coaching, no pressure. A fit conversation only.
                </p>
                <a
                  href="https://calendly.com/laurajanethomas/discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-foreground/80 text-foreground px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-foreground hover:text-ivory transition-all w-full justify-center"
                >
                  Book a Discovery Call
                </a>
              </div>
            </motion.div>

            {/* Practical details */}
            <motion.div {...fadeUp(0.3)} className="bg-foreground/5 p-8 text-left space-y-3 text-[14px] text-muted-foreground mb-10">
              <p className="font-semibold text-foreground mb-4 text-[11px] tracking-editorial uppercase">The Practical Details</p>
              <p>Three women per month. No exceptions, no overflow.</p>
              <p>Online sessions, scheduled around your real life.</p>
              <p>Starts within 7 days of booking confirmation.</p>
              <p>R12,500, payable in full at booking. Payment in 2 instalments available on request.</p>
            </motion.div>

            <motion.div {...fadeUp(0.4)}>
              <p className="text-[14px] text-muted-foreground">
                Or if you are not yet ready for either option,{" "}
                <a href="https://alignedwomanco.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-oxblood transition-colors">
                  explore my free resources at The Aligned Woman Co.
                </a>{" "}
                instead.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. PS */}
      <section className="bg-foreground text-ivory py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/e2710ea5b_89a312eb131a146172728691bff76edc.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-85" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <motion.p {...fadeUp(0)} className="text-[10px] tracking-editorial uppercase text-ivory/50 mb-8">— PS, a personal note</motion.p>
            <motion.h3
              {...fadeUp(0.05)}
              className="font-serif text-2xl md:text-3xl text-ivory mb-8 leading-[1.1]"
            >
              PS, A Personal Note
            </motion.h3>
            <motion.div {...fadeUp(0.1)} className="space-y-5 text-[15px] leading-relaxed text-ivory/75">
              <p>If you have made it to the bottom of this page, I want to say something to you directly.</p>
              <p>I built the Clarity Sprint because I remember being where you are now.</p>
              <p>I remember the spinning. The Googling at midnight. The conversations with people who meant well but could not see what I could not see. I remember the hormones depleted, the cortisol gone, the body that finally said no when I had been ignoring it for years.</p>
              <p>I also remember what it felt like to find the right person at the right moment. Someone who could see what I could not. Someone who told me the truth even when the truth was uncomfortable. Someone who gave me a structure to hold onto when everything else felt like sand.</p>
              <p>That is what I am offering you. Not a transformation. Not a breakthrough. Not a quick fix. A structure. A senior strategist who will tell you the truth. Four weeks of focused work designed to give you exactly what I needed when I was where you are.</p>
              <p>If you are ready, I will be honoured to do this work with you.</p>
              <p>If you are not ready yet, I will be here when you are.</p>
              <p>Either way, I am genuinely glad you read this far.</p>
            </motion.div>
            <motion.p
              {...fadeUp(0.2)}
              className="font-serif italic text-2xl text-oxblood mt-8"
              style={{ color: "rgba(255,180,160,0.9)" }}
            >
              , Laura Jane Thomas
            </motion.p>
          </div>
        </div>
      </section>

      <ResourcesSection />
      <Footer />
    </div>
  );
}