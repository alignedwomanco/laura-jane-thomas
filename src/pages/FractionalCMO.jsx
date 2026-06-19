import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import Footer from "@/components/site/Footer";
import ClientsSection from "@/components/shared/ClientsSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import ConsultingFAQ from "@/components/consulting/ConsultingFAQ";
import FindYourFitModal from "@/components/shared/FindYourFitModal";

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-current/15">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-sm md:text-base tracking-wide group-hover:italic transition-all">{title}</span>
        {open ? <Minus className="w-4 h-4 flex-shrink-0 ml-4" /> : <Plus className="w-4 h-4 flex-shrink-0 ml-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
            <div className="pb-6 pr-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const corporateOffering = [
  { title: "Fractional and Stand-in CMO", body: "Senior marketing leadership held inside the business on a fractional or interim basis. Useful when the role is between hires, when the existing CMO is on leave, or when the business is not yet ready to commit to a full-time appointment but needs senior judgement in the room now. Scope, time commitment, and reporting lines calibrated to the situation. Includes team leadership, executive alignment, and the operational rhythm a senior CMO would otherwise carry." },
  { title: "Strategic Leadership", body: "Senior strategic direction for brand and marketing at the level the business actually needs it. Held quarterly or monthly, depending on scope. Includes prioritisation, executive alignment, and the structural conversations that keep the strategy from drifting back into busywork." },
  { title: "Revenue-Aligned Strategy", body: "Marketing plans built to move commercial outcomes, not engagement metrics. Brand and revenue treated as one conversation rather than two functions. The plan names the priorities, the trade-offs, and the metrics the executive team can actually defend." },
  { title: "Customer Journey Mapping", body: "The buyer's actual path from first touch to retention, mapped end-to-end. Names the gaps. Identifies the highest-leverage moments to invest in. Built so the marketing, sales, and creative teams are working from the same map." },
  { title: "Creative Direction", body: "Senior creative judgement on the cornerstone customer-facing assets. Campaigns, messaging, brand storytelling, and visual direction. Strategy and creative held in one brain, which means the work doesn't have to be coordinated across three vendors." },
  { title: "Team Alignment and Integration", body: "Designed to elevate your existing team, not replace it. I work alongside your CMO, marketing leads, and creative directors with clear decision rights, defined scope, and a structured handover. The team finishes the engagement more capable than they started." },
  { title: "Custom Growth Playbook", body: "A written plan your team can run for the next twelve months without me in the room. Includes the strategy, the priorities, the cadence, the owners, and the metrics. The work is documented, defensible, and built to survive turnover, board reviews, and the next quarter's distractions." },
];

const smbOffering = [
  { title: "Brand Foundation and Build", body: "For businesses launching something new or repositioning something built. Brand strategy, identity direction, positioning, messaging architecture, and the foundational decisions that determine whether the brand holds at scale. Built so the rest of the business can be constructed on top of it without retrofitting later." },
  { title: "Brand and Business Review", body: "A senior audit of where the business actually is. Brand, marketing, customer journey, and the commercial reality underneath. Names the gaps, the leaks, and the highest-leverage moves to make in the next twelve months. The starting point if you are not yet sure where the issue is." },
  { title: "Marketing Strategy", body: "A 12-month strategic plan that sequences brand, content, campaigns, customer experience, and paid acquisition into one operating rhythm. Names the priorities, the trade-offs, and the metrics. Built so the team can run it without senior strategy needing to be present in every conversation." },
  { title: "Brand Development and Creative Direction", body: "Senior creative judgement on the work that actually shapes how the brand is perceived. Identity evolution, campaign concepts, brand storytelling, and the visual and verbal direction that holds the brand together across every customer touchpoint." },
  { title: "Content and Communication Frameworks", body: "Messaging architecture, content pillars, and the story angles your team can run with. Built so the team is not reinventing the brand voice on every campaign, launch, or post. Includes structural frameworks for video, newsletters, launches, and ongoing content rhythm." },
  { title: "Team Alignment and Leadership Support", body: "Working sessions, review cadence, and the structural conversations that keep the strategy alive once the engagement closes. The team finishes more aligned, more capable, and able to defend the strategic direction without needing me in the room." },
  { title: "Custom Growth Playbook", body: "A written plan your team can run after the engagement ends. Strategy, brand direction, content plan, and priority actions, sequenced and named. Built to be referenced quarterly and to survive the team changes that small businesses go through as they grow." },
];

export default function FractionalCMO() {
  const [quizOpen, setQuizOpen] = useState(false);
  return (
    <div className="bg-ivory">
      {/* Minimal header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <a href="https://laurajanethomas.biz" target="_blank" rel="noopener noreferrer" className="flex flex-col leading-none hover:opacity-80 transition-opacity duration-300">
            <span className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
              laura<span className="italic">jane</span>thomas
            </span>
          </a>
          <a
            href="https://calendly.com/hello-laurajanethomas/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-editorial uppercase border border-foreground/80 px-5 py-2.5 hover:bg-foreground hover:text-ivory transition-all duration-300 btn-pulse"
          >
            Book a Call →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative text-ivory pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-[60vh] flex items-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://pub-7ae774d14f7545f5867330470de2d758.r2.dev/LauraThomas_HeroVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-oxblood/60" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">
            — Consulting
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-4xl font-light italic"
          >
            Fractional CMO and Brand Strategy for businesses that want commercial clarity and elevated brand expression in one partner.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href="https://calendly.com/hello-laurajanethomas/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-ivory text-foreground px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory/90 transition-all duration-300 group btn-pulse"
            >
              Book a 15-minute call
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <button
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center justify-center gap-3 border border-ivory/70 text-ivory px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-foreground transition-all duration-300 group"
            >
              Find Your Fit
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-oxblood text-ivory py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/61b35f8db_Facetune_17-04-2026-20-36-52.jpg" alt="Laura consulting" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-ivory/50 mb-6">— Why me</p>
            <p className="font-serif text-2xl md:text-3xl lg:text-[32px] leading-[1.3] text-ivory mb-8">
              Most fractional CMOs are former marketing managers. I am not.
            </p>
            <p className="text-ivory/70 text-[15px] leading-relaxed mb-5">
              I built and ran my own marketing agency for over a decade, grew it, and led brand and marketing work for some of the biggest names in the market, including HBO, British Airways, Coca-Cola and Ubank.
            </p>
            <p className="text-ivory/70 text-[15px] leading-relaxed mb-5">
              You are not hiring someone who has read about how this works. You are hiring someone who has done it, at the top, with real money on the line, many times over.
            </p>
            <p className="text-ivory/70 text-[15px] leading-relaxed mb-10">
              One senior brain holding brand, strategy, and creative direction together, calibrated to your scope, and built so you or your team can run it long after I leave the room.
            </p>
            <a
              href="https://calendly.com/hello-laurajanethomas/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-ivory/70 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all duration-300 group btn-pulse"
            >
              Book a 15-minute call
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-ivory/70 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all duration-300 group mt-4"
            >
              About Me
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <ClientsSection dark={true} />
      <TestimonialsSection />



      {/* Three Ways to Work With Me */}
      <section className="relative py-24 md:py-32">
        <img src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/a0e8cb5a5_ab72f75fa1a2adf6fa12567c48bc324c.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-oxblood/70" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-editorial uppercase text-ivory/50 mb-4">— 6.</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight max-w-xl text-ivory">
              Three ways to work with me
            </h2>
          </div>
          <p className="text-[14px] text-ivory/70 mb-16">
            Not sure which is you?{" "}
            <button onClick={() => setQuizOpen(true)} className="underline underline-offset-4 hover:text-ivory transition-colors">
              Take the 2-minute quiz →
            </button>{" "}
            and I will point you to the right one.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="border border-ivory/20 p-8 flex flex-col" style={{backgroundColor: '#26030F'}}>
              <p className="text-[10px] tracking-editorial uppercase text-ivory/40 mb-4">01</p>
              <h3 className="font-serif text-xl md:text-2xl leading-tight mb-5 text-ivory">The Business Sprint</h3>
              <p className="text-[14px] text-ivory/70 leading-relaxed mb-6 flex-1">
                For founders who need a clear plan, fast.<br /><br />
                Six weeks, four sessions, a fixed price. You leave with your positioning, your offer and model, your brand and message, and a 90-day plan you can run. You do the building, I do the guiding. The fastest way to get a senior strategic look at your business.
              </p>
              <a
                href="/businesssprint"
                className="inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase border border-ivory/40 px-5 py-3 hover:bg-ivory hover:text-foreground transition-all duration-300 group self-start mt-auto text-ivory"
              >
                See the Business Sprint
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Box 2 */}
            <div className="border border-foreground/15 p-8 flex flex-col bg-foreground text-ivory">
              <p className="text-[10px] tracking-editorial uppercase text-ivory/40 mb-4">02</p>
              <h3 className="font-serif text-xl md:text-2xl leading-tight mb-5">Fractional CMO for a growing business</h3>
              <p className="text-[14px] text-ivory/70 leading-relaxed mb-5">
                For a small or growing business that needs senior marketing leadership without a full-time hire.
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {["Brand foundation and build", "Marketing strategy", "Brand and business review", "Brand development and creative direction", "Content and communication frameworks", "Team alignment and leadership support", "Custom growth playbook"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-ivory/70">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-ivory/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[13px] text-ivory/50 italic mb-6">Ongoing and scoped to what the business actually needs.</p>
              <a
                href="https://calendly.com/hello-laurajanethomas/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase border border-ivory/40 px-5 py-3 hover:bg-ivory hover:text-foreground transition-all duration-300 group self-start mt-auto"
              >
                Book a 15-minute call
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Box 3 */}
            <div className="border border-ivory/20 p-8 flex flex-col" style={{backgroundColor: '#26030F'}}>
              <p className="text-[10px] tracking-editorial uppercase text-ivory/40 mb-4">03</p>
              <h3 className="font-serif text-xl md:text-2xl leading-tight mb-5 text-ivory">Fractional CMO for corporates</h3>
              <p className="text-[14px] text-ivory/70 leading-relaxed mb-5">
                For bigger teams that have lost the strategy inside the day-to-day.
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {["Fractional and stand-in CMO", "Strategic leadership", "Revenue-aligned strategy", "Customer journey mapping", "Creative direction", "Team alignment and integration", "Custom growth playbook"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-ivory/70">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-ivory/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[13px] text-ivory/50 italic mb-6">A senior partner who names what is actually wrong and equips your team to fix it without dismantling what already works.</p>
              <a
                href="https://calendly.com/hello-laurajanethomas/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase border border-ivory/40 px-5 py-3 hover:bg-ivory hover:text-foreground transition-all duration-300 group self-start mt-auto text-ivory"
              >
                Book a 15-minute call
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          <div className="mt-14 pt-10 border-t border-ivory/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-ivory/60 text-[14px] font-sans">
              Not sure where to start? Take a quick quiz to find your fit.
            </p>
            <button
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-3 border border-ivory/50 text-ivory px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-foreground transition-all duration-300 group self-start sm:self-auto"
            >
              Find Your Fit
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-ivory py-24 md:py-36 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[10px] tracking-editorial uppercase text-ivory/50 mb-8"
          >
            — Find out exactly where your growth is stuck.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8 max-w-3xl mx-auto"
          >
            Book a call. <span className="italic">15 minutes,</span> no pitch.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-ivory/65 text-[15px] max-w-lg mx-auto mb-12 leading-relaxed"
          >
            I take on a limited number of new clients each quarter.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://calendly.com/hello-laurajanethomas/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-ivory text-foreground px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory/90 transition-all duration-300 group btn-pulse"
            >
              Book a 15-minute call
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <button
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-3 border border-ivory/50 text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-foreground transition-all duration-300 group"
            >
              Take the 2-minute fit quiz
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </motion.div>

        </div>
      </section>

      <ConsultingFAQ />

      <Footer ctaLabel="Send me an email" ctaHref="mailto:hello@laurajanethomas.biz" />
      <FindYourFitModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}