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
  transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }
});

const weeks = [
{
  letter: "1",
  week: "SESSION 1",
  label: "POSITION",
  sub: "What you are really building, and who it is for.",
  body: "The gap only you can own, and the message that makes you the obvious choice. If you are established, we pressure-test a position that may have gone fuzzy.",
  leave: "a written positioning and opportunity diagnostic."
},
{
  letter: "2",
  week: "SESSION 2",
  label: "OFFER AND MODEL",
  sub: "How it actually makes money, and where it is leaking.",
  body: "Your core offer, your pricing, where the revenue comes from. If you are starting, we build the model. If you are established, we find the money you are leaving on the table.",
  leave: "your offer and revenue model on a page."
},
{
  letter: "3",
  week: "SESSION 3",
  label: "BRAND AND MARKET",
  sub: "Why people choose you, and how they find you.",
  body: "We sharpen the story and the way you show up, then build how you reach your people, on terms you can live with.",
  leave: "your brand and messaging direction, and a go-to-market plan built around you."
},
{
  letter: "4",
  week: "SESSION 4",
  label: "ENGINE AND PLAN",
  sub: "How it grows without consuming you, and what you do next.",
  body: "What to systemise, simplify, or hand off, then everything pulled into a sequenced 90-day plan.",
  leave: "a simple operating model, and a written 90-day growth plan you can run without me."
}];


const coreItems = [
{ title: "4 Strategic Sessions", value: "R20,000", desc: "Four one-hour sessions with me directly, across the six weeks. Online, recorded so you can revisit them." },
{ title: "Your Written Strategy Documents", value: "R32,000", desc: "Your positioning diagnostic, offer and revenue model, brand and messaging direction, and go-to-market plan, written up as working documents you keep." },
{ title: "90-Day Growth Plan", value: "R5,000", desc: "A written 90-day growth plan and the rhythm to run it, so you keep moving after the six weeks." }];


const bonuses = [
{ title: "30-Day Recalibration Call", value: "R5,000", desc: "A call thirty days after we finish, to check traction and adjust." },
{ title: "The Aligned Blueprint", value: "R116,000", desc: "One full year of access to the complete course built on my A.L.I.V.E. Method, so the way you build is something you can keep up." }];


const objections = [
{
  q: '"I have tried business courses and coaches before, and nothing changed."',
  a: "Most are information with no plan, or a coach who has never built a business. This is one to one, it produces written outputs you keep, and it comes from someone who has built and run the real thing."
},
{
  q: '"Is four sessions really enough?"',
  a: "Yes, because the sessions are not the whole of it. Each one ends with a clear, structured plan and a defined next move, so between calls you always know exactly what you are working toward. The sessions are where the senior decisions get made, and the structured plan in between is what keeps you moving. You are not paying for four hours of my time. You are paying for that judgement on every call that matters, the documents you keep, and a plan that actually works."
},
{
  q: '"R24,997 is a lot for me right now."',
  a: "It is a serious investment, calibrated well below advisory or CMO rates. If it is genuinely out of reach, start with my free resources and come back when the timing is right."
},
{
  q: '"I am already flat out. I do not have time for this."',
  a: "You are already spending the time, on research, second-guessing, and starting things you do not finish. The Business Sprint takes that scattered effort and gives it structure and a clear direction to move in. An hour at a time, four times, with a plan that means you stop spinning and start moving. It is built to fit a real life and a real job."
},
{
  q: '"What if I want to keep working with you after the six weeks?"',
  a: "Many founders do. There is a clear path into ongoing advisory if it is the right fit, discussed only if and when you want it."
}];


const sprintTestimonials = [
{
  headline: "FOR THE FIRST TIME IN MY BUSINESS, EVERYTHING FEELS ALIGNED.",
  quote: "I came to Laura overwhelmed and unclear about how to position my brand. Within a matter of weeks, she helped me articulate exactly what I do, who I do it for, and how to confidently show up as a leader. For the first time in my business, everything feels aligned, and the results speak for themselves.",
  name: "Tasha Berrings",
  company: "Founder, Clean Beauty Startup"
},
{
  headline: "LAURA PROVIDES ACTIONABLE SUPPORT TO HELP YOU THRIVE.",
  quote: "Laura provides actionable support to help you thrive. If you're considering her for consulting or coaching, I can hands down say you're getting your money's worth. You leave with valuable insights and practical techniques to help navigate and reconnect with what truly drives you, all while protecting your energy so you don't end up overworked and burnt out. One session and Laura will leave you feeling empowered. I highly recommend her services.",
  name: "Tharunisa Reddy",
  company: ""
},
{
  headline: "WORKING WITH LAURA WAS LIKE PLUGGING MY BUSINESS INTO POWER.",
  quote: "Working with Laura was like plugging my business into power. She pulled the strategy, story, and messaging out of me in a way that felt effortless. The outcome was anything but. I now have a clear roadmap, a stronger offer, and marketing that finally makes sense and feels like me.",
  name: "Vanessa Rathbone",
  company: "Founder, Wellness Consultancy"
},
{
  headline: "SHE TAUGHT ME TO BACK MYSELF.",
  quote: "Laura is just phenomenal. She helped me connect to my core and feel more confident about what I do and the value I provide to others. I feel far less awkward selling myself or my services. She taught me to back myself, and to detach my sense of self-worth from how much I make. It set me free, and I am excited for the next chapter in my career.",
  name: "Iris Smyth",
  company: ""
},
{
  headline: "BRAND THERAPIST, COACH, AND VISIONARY ALL IN ONE.",
  quote: "Laura isn't just a strategist. She's a brand therapist, coach, and visionary all in one. Her ability to combine mindset work with razor-sharp strategy is unmatched. I walked away with more than a brand. I walked away with confidence, direction, and a business that is finally growing.",
  name: "Elena Sterling",
  company: "CEO, Luxury Wellness Brand"
},
{
  headline: "ZOOM OUT AND ZOOM IN WITH EQUAL BRILLIANCE.",
  quote: "I have worked with other consultants before, but no one has Laura's ability to zoom out and zoom in with equal brilliance. Her mind is next level.",
  name: "Ashleigh Carter",
  company: "Founder, Thee Lux Retreat Co."
}];


function ObjectionAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-0">
      {items.map((item, i) =>
      <div key={i} className="border-b border-foreground/15">
          <button
          onClick={() => setOpen(open === i ? null : i)}
          className="w-full flex items-center justify-between py-6 text-left group">
          
            <span
            className="font-serif italic text-lg md:text-xl leading-snug"
            style={{ color: BRAND }}>
            
              {item.q}
            </span>
            {open === i ?
          <Minus className="w-4 h-4 flex-shrink-0 ml-4 text-foreground/50" /> :

          <Plus className="w-4 h-4 flex-shrink-0 ml-4 text-foreground/50" />
          }
          </button>
          <AnimatePresence>
            {open === i &&
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden">
            
                <div className="pb-6 pr-6">
                  {item.a.split("\n\n").map((para, j) =>
              <p key={j} className="text-[14px] text-muted-foreground leading-relaxed mb-4 last:mb-0">
                      {para}
                    </p>
              )}
                </div>
              </motion.div>
          }
          </AnimatePresence>
        </div>
      )}
    </div>);

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
    <div className="flex items-center gap-4 md:gap-8">
    <button onClick={prev} aria-label="Previous" className="flex flex-shrink-0 items-center justify-center hover:text-primary transition-all">
      <ChevronLeft className="w-5 h-5" />
    </button>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 flex-1">
      {visible.map((t, i) =>
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: i * 0.1 }}
        className="text-center w-full">
          
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
        )}
      </div>
      <button onClick={next} aria-label="Next" className="flex flex-shrink-0 items-center justify-center hover:text-primary transition-all">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>);

}

const DiscoveryBtn = ({ dark = false, className = "" }) =>
<a
  href="https://calendly.com/hello-laurajanethomas/30min"
  target="_blank"
  rel="noopener noreferrer"
  className={`inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-[11px] tracking-editorial uppercase font-semibold transition-all duration-300 group btn-pulse text-ivory ${className}`}
  style={{ backgroundColor: "#C2858B" }}>
  
    Book a Discovery Call
    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
  </a>;




export default function ClaritySpring() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <title>The Clarity Sprint | Senior Strategic Coaching for Women Building What's Next | Laura Thomas</title>
      <Navbar />

      {/* HERO */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-20 md:pt-40 md:pb-40"
        style={{ backgroundColor: BRAND }}>
        
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/9c5ae9111_efca8aa6761e6e74544ba4e9681156c9.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.18 }} />
          
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(194, 133, 139, 0.3)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto">
          
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
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/f055eaddd_DTS_In_Focus_Daniel_Faro_Photos_ID4973.jpg"
            alt=""
            className="w-full h-full object-cover object-center" />
          
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
              <div className="flex justify-center mt-10">
              <DiscoveryBtn />
              </div>
              </div>
              </div>
              </section>

      {/* SECTION 3: THE BRIDGE */}
      <section className="relative overflow-hidden bg-ivory">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-36">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1 }}
              className="aspect-[3/4] overflow-hidden hidden lg:block">
              
              <img
                src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/210a58178_LJT.png"
                alt="Laura Jane Thomas"
                className="w-full h-full object-cover"
                style={{ opacity: 0.75 }} />
              
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15 }}
              className="space-y-5">
              
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
          backgroundRepeat: "no-repeat"
        }}
        className="fixed-bg-wrapper">
        
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
                {weeks.map((item, i) =>
                <motion.div
                  key={item.letter}
                  {...fadeUp(i * 0.08)}
                  className="p-8 md:p-10 transition-transform duration-500 hover:scale-105 hover:z-10 relative"
                  style={{ backgroundColor: "rgba(245,238,228,0.97)" }}>
                  
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-serif italic leading-none" style={{ fontSize: "5rem", color: BRAND, lineHeight: 1 }}>{item.letter}</span>
                      <span className="text-[9px] tracking-editorial uppercase text-muted-foreground mt-2">{item.week}</span>
                    </div>
                    <p className="text-lg font-serif font-bold mb-2" style={{ color: "#1A1A1A" }}>{item.label}</p>
                    <p className="text-sm italic leading-snug mb-3 font-serif" style={{ color: BRAND }}>{item.sub}</p>
                    {item.body.split("\n\n").map((p, j) =>
                  <p key={j} className="text-xs leading-relaxed mb-3" style={{ color: "rgba(26,26,26,0.55)" }}>{p}</p>
                  )}
                    <p className="text-xs font-semibold mt-3" style={{ color: "#1A1A1A" }}>You leave with:</p>
                    <p className="text-xs leading-relaxed italic" style={{ color: "rgba(26,26,26,0.60)" }}>{item.leave}</p>
                  </motion.div>
                )}
              </div>

              <motion.p {...fadeUp(0.3)} className="text-center font-serif italic text-2xl md:text-3xl mt-16" style={{ color: BRAND }}>
                Six weeks. Four sessions. The work in between is where it happens.
              </motion.p>
            </div>
          </section>

          {/* SECTION 5: VALUE STACK */}
          <section className="py-16 md:py-24 px-6">
            <div className="max-w-[1400px] mx-auto">
              <motion.div {...fadeUp(0)} className="text-center mb-16">
                <p className="text-[10px] tracking-editorial uppercase mb-6" style={{ color: BRAND }}>— What You Get</p>
                <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-4" style={{ color: "#1A1A1A" }}>
                  What you get inside <span className="italic" style={{ color: BRAND }}>The Business Sprint.</span>
                </h2>
                <p className="text-muted-foreground text-[15px] max-w-2xl mx-auto">
                  A complete senior engagement, structured for founders who need clarity fast and a plan they can execute.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.1)} className="mb-4">
                <p className="text-[10px] tracking-editorial uppercase mb-6 font-semibold" style={{ color: BRAND }}>The Core Engagement</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-4" style={{ backgroundColor: "rgba(26,26,26,0.10)" }}>
                {coreItems.map((item, i) =>
                <motion.div key={i} {...fadeUp(i * 0.06)} className="p-6 md:p-8" style={{ backgroundColor: "rgba(245,238,228,0.97)" }}>
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-serif font-bold text-sm md:text-base leading-tight" style={{ color: "#1A1A1A" }}>{item.title}</p>
                    </div>
                    <p className="text-[10px] tracking-editorial uppercase mb-3 font-semibold" style={{ color: BRAND }}>{item.value}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(26,26,26,0.55)" }}>{item.desc}</p>
                  </motion.div>
                )}
              </div>

              <motion.div {...fadeUp(0.1)} className="mt-12 mb-6">
                <p className="text-[10px] tracking-editorial uppercase font-semibold" style={{ color: BRAND }}>Plus These Bonuses</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-16" style={{ backgroundColor: "rgba(26,26,26,0.10)" }}>
                {bonuses.map((item, i) =>
                <motion.div key={i} {...fadeUp(i * 0.08)} className={`p-6 md:p-8 relative ${i === 1 ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`} style={{ backgroundColor: "rgba(38,3,15,0.95)" }} onClick={i === 1 ? () => window.open('https://www.alignedwomanco.com/blueprint', '_blank') : undefined}>
                    <span className="inline-block mb-4 px-3 py-1 text-[9px] tracking-editorial uppercase font-bold border border-white/30 text-white/70">BONUS {i + 1}</span>
                    <p className="font-serif font-bold text-sm md:text-base mb-2 text-white">{item.title}</p>
                    <p className="text-[10px] tracking-editorial uppercase mb-3 line-through text-white/40">Value: {item.value}</p>
                    <p className="text-xs leading-relaxed text-white/65">{item.desc}</p>
                  </motion.div>
                )}
              </div>

              {/* Total */}
              <motion.div {...fadeUp(0.2)} className="border border-foreground/20 p-8 md:p-12 text-center max-w-2xl mx-auto mb-10" style={{ backgroundColor: "rgba(245,238,228,0.95)" }}>
                <p className="text-[14px] text-muted-foreground mb-2">If you booked each element separately at standard rates:</p>
                <p className="font-serif text-4xl font-bold mb-4 line-through text-muted-foreground">R185,500</p>
                <p className="text-[14px] text-muted-foreground mb-6">The Business Sprint is a defined six-week engagement, at</p>
                <p className="font-serif text-6xl md:text-7xl font-bold mb-6" style={{ color: BRAND }}>R24,997</p>
                <p className="font-serif italic text-[14px] mb-2" style={{ color: BRAND }}>
                  That is under R4,200 a week, for senior strategy and a plan you keep for good. Less than a single month of most marketing retainers, paid once.
                </p>
                <p className="font-serif italic text-[14px] mb-8" style={{ color: BRAND }}>
                  That is not a discount. It is a calibrated rate, because this is focused, six-week work rather than an ongoing retainer, and because doing this work with founders on their own businesses is what I love most.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <DiscoveryBtn />
                </div>
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mt-4">Limited to 3 places per month. Online only. Starts within 7 days of booking.</p>
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
                <DiscoveryBtn />
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIAL CAROUSEL */}
      <section className="bg-foreground/5 py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <h2 className="font-serif italic text-4xl md:text-6xl leading-[0.95] tracking-tight mb-4">
              What people say after working with me.
            </h2>
            <p className="text-muted-foreground text-[14px]">Senior receipts from the wider practice. Real outcomes. Named voices.</p>
          </motion.div>
          <SprintCarousel testimonials={sprintTestimonials} />

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

          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <motion.div {...fadeUp(0.1)} className="rounded-lg p-8 md:p-12" style={{ backgroundColor: "hsla(36, 33%, 94%, 0.92)" }}>
              <p className="text-[10px] tracking-editorial uppercase font-bold text-foreground mb-8">This is for you if:</p>
              <ul className="space-y-5">
                {[
                "You are starting, growing, or repositioning a business, and you need clarity on the actual next move.",
                "You are capable and have done hard things, and what you are missing is the plan, not the drive.",
                "You have an idea you cannot seem to start, or an established business that has stalled, plateaued, or lost its edge.",
                "You want to stay hands-on and own the result, with a senior brain guiding the calls, rather than handing it over and hoping.",
                "You want senior strategy from someone who has built the thing, not motivation.",
                "You can commit to four one-hour sessions over six weeks, plus the work in between."].
                map((item, i) =>
                <li key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: BRAND }} />
                    <span className="text-foreground text-[14px] leading-relaxed">{item}</span>
                  </li>
                )}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="rounded-lg p-8 md:p-12" style={{ backgroundColor: "hsla(36, 33%, 94%, 0.92)" }}>
              <p className="text-[10px] tracking-editorial uppercase font-bold text-foreground mb-8">This is not for you if:</p>
              <ul className="space-y-5">
                {[
                "You want it fully done for you while you step back. This is collaborative. I bring the senior thinking, you bring your business, and you own what we build.",
                "You want reassurance more than the truth. I will tell you when something needs work.",
                "You are looking for the cheapest business coaching on the internet. This is calibrated, not discounted.",
                "You are not actually ready to act."].
                map((item, i) =>
                <li key={i} className="flex items-start gap-4">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-foreground/60" />
                    <span className="text-foreground text-[14px] leading-relaxed">{item}</span>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>
          <motion.div {...fadeUp(0.3)} className="text-center space-y-8">
            <p className="font-serif italic text-xl md:text-2xl text-ivory/85">
              If you have read both columns and you are still here, you already know which one applies to you.
            </p>
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <DiscoveryBtn />
              </div>

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
            style={{ opacity: 0.35 }} />
          
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(245,238,228,0.92)" }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-3xl mx-auto">
          
          <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— Let's begin </p>
          <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-8" style={{ color: "#1A1A1A" }}>
            This is the moment.
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            <p>You have read the page. You know what is being offered, what it costs, and what you walk away with after six weeks. The only question left is whether you are ready.</p>
            <p className="font-serif italic" style={{ color: BRAND }}>You do not have to be certain. You only have to be ready to begin.</p>
          </div>

          <div className="mb-12 text-center max-w-2xl mx-auto">
            <div className="border border-foreground/20 p-8" style={{ backgroundColor: "rgba(245,238,228,0.95)" }}>
              <p className="font-serif text-xl mb-3" style={{ color: "#1A1A1A" }}>Setup a free discovery call.</p>
              <ul className="space-y-1 text-[13px] text-muted-foreground mb-6">
                <li>Only three places per month.</li>
                <li>Four one-hour sessions across six weeks.</li>
                <li>Online, scheduled around your real life.</li>
                <li>Starts within 7 days of booking confirmation.</li>
              </ul>
              <a
                href="https://calendly.com/hello-laurajanethomas/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-3 px-8 py-4 text-[10px] md:text-[11px] tracking-editorial uppercase font-semibold text-ivory transition-all duration-300 btn-pulse"
                style={{ backgroundColor: "#C2858B" }}>
                
                Book a Discovery Call →
              </a>
            </div>
          </div>



        </motion.div>
      </section>



      <ResourcesSection />
      <Footer />
    </div>);

}