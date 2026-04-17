import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CtaBanner from "@/components/shared/CtaBanner";

const coachingTiers = [
  {
    name: "Power Hour",
    tag: "Your Reset Button",
    headline: "Rapid Recalibration. Deep Clarity. Tangible Next Steps.",
    details: ["1 x 60-minute deep-dive call", "3 days of Telegram support after your session"],
    description: "You're not lost. You're just tangled in outdated stories, messy strategies, or mixed messaging. A fast-track session to cut through the noise and find your next clear move. Think of it as a laser-focused reboot: one hour, one problem, one powerful solution.",
    bestFor: ["New pivots or projects", "Breaking through a stuck pattern", "Clarifying next steps or direction", "Quick hit of clarity, without the commitment"],
  },
  {
    name: "Rule-Burner™ Momentum Container",
    tag: "Strategy + Support You Can Actually Sustain",
    headline: "This is where consistency meets clarity and things start moving.",
    details: ["2 x 60-minute calls per month", "Custom follow-up strategy docs", "Weekday Telegram access (Mon–Fri, voice notes + texts)"],
    description: "You've got big goals and real growth ahead, but you're tired of trying to do it all alone. You want grounded strategy and emotional regulation. Tactical next steps and space to process the identity shifts that come with growth. We'll design strategy that fits your season of life, not someone else's hustle fantasy.",
    inside: ["Your signature offer and niche", "Messaging that's clear, magnetic + true", "Nervous system-safe strategy", "Cyclical planning based on your capacity + design", "Daily tools for visibility, embodiment + leadership"],
    bestFor: ["Entrepreneurs wanting regular strategic + emotional support", "Founders in transition or pivot mode", "Women craving accountability that honours their nervous system"],
  },
  {
    name: "Rule-Burner™ Expansion Mentorship",
    tag: "High-Touch Coaching for Deep Expansion",
    headline: "This is for the woman who's not playing anymore.",
    details: ["3 x 60-minute calls per month", "Daily Telegram access (Mon–Fri)", "Weekly voice check-ins + priority support"],
    description: "You've already built something — a brand, a business, a reputation. But what got you here isn't what will take you where you're meant to go next. In this container, we integrate business mentorship, identity work, nervous system support, and soulful strategy to unlock your most powerful expression in life, leadership, and legacy.",
    inside: ["Strategic offer + business model evolution", "Identity recalibration + shadow work", "Nervous system capacity building", "Leadership embodiment + emotional mastery", "Messaging + marketing that lands because it's true"],
    bestFor: ["Women scaling into a new level of visibility, income or impact", "Creators, coaches, and consultants who want support and space", "Founders tired of white-knuckling growth"],
  },
];

const resources = [
  {
    title: "Take the Quiz",
    body: "Is Your Agency Built to Burn You Out or Light You Up?",
    href: "https://ebook.laurajanethomas.biz/5tools",
    cta: "Get It Now",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/Mask-group-2.png",
  },
  {
    title: "Get the Burnout Prevention E-Book",
    body: "For every successful woman quietly unraveling, here are the 5 tools that saved me, and a path back to a life that feels as good as it looks!",
    href: "https://laurajanethomas.biz/wp-content/uploads/2026/01/The-5-Tools-That-Saved-Me-eBook-LJT-1.pdf",
    cta: "Download Now",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/Mask-group-1.png",
  },
  {
    title: "Sign Up to The Reset Room",
    body: "Reserve your spot early and join a circle of ambitious women ready to reset, realign, and rise together.",
    href: "https://theresetroom.laurajanethomas.biz/theresetroom",
    cta: "Get It Now",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/white-wall-with-red-opened-door-closed-door-white-wooden-floor-chrome-vase-dry-plant-realistic-3d-rendering-2.png",
  },
  {
    title: "Nervous System Reset",
    body: "Rebuild your energy, focus and sense of safety from the inside out.",
    href: "https://laurajanethomas.biz/wp-content/uploads/2026/01/LJT-Nervous-System-Doc.pdf",
    cta: "Download Now",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/image-25-1.png",
  },
];

function CoachingCard({ tier, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: i * 0.1 }}
      className="border border-ivory/20 p-8 md:p-10"
    >
      <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-4">{tier.tag}</p>
      <h3 className="font-serif text-3xl md:text-4xl mb-6">{tier.name}</h3>
      <p className="font-serif italic text-xl text-ivory/85 mb-5">{tier.headline}</p>
      <ul className="space-y-2 mb-6">
        {tier.details.map((d) => (
          <li key={d} className="flex items-start gap-3 text-[14px] text-ivory/70">
            <span className="text-oxblood mt-1 text-xs">●</span>{d}
          </li>
        ))}
      </ul>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-[11px] tracking-editorial uppercase text-ivory/60 hover:text-ivory transition-colors mb-4">
        {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        {open ? "Hide details" : "See details"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
            <p className="text-[14px] text-ivory/70 leading-relaxed mb-5">{tier.description}</p>
            {tier.inside && (
              <>
                <p className="text-[11px] tracking-editorial uppercase text-ivory/50 mb-3">Inside, we'll work on:</p>
                <ul className="space-y-2 mb-5">
                  {tier.inside.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-ivory/70"><span className="text-oxblood mt-1 text-xs">✧</span>{item}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="text-[11px] tracking-editorial uppercase text-ivory/50 mb-3">Best for:</p>
            <ul className="space-y-2">
              {tier.bestFor.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14px] text-ivory/70"><span className="text-oxblood mt-1 text-xs">✓</span>{b}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ResetRoom() {
  return (
    <div className="bg-ivory">
      <Navbar />

      {/* Hero */}
      <section className="bg-oxblood text-ivory pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">
            — The Reset Room
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif leading-[0.92] tracking-tight"
          >
            <span className="block text-[15vw] md:text-[10vw] lg:text-[8.5vw] font-medium">The Reset</span>
            <span className="block text-[15vw] md:text-[10vw] lg:text-[8.5vw] italic font-normal">Room</span>
          </motion.h1>
        </div>
      </section>

      {/* Welcome */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— Welcome</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-8">
              Welcome to <span className="italic block">The Reset Room</span>
            </h2>
            <p className="font-serif italic text-xl text-foreground mb-6 leading-relaxed">
              If you're looking for a place that truly gets you, where you can be guided, held, and unapologetically seen, you're in the right room.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
              For far too long, women have been working against themselves instead of for themselves. We've been handed playbooks written by systems that were never designed with us in mind, and it shows. Burnout is at an all-time high globally, and I know that story firsthand.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
              I built the shiny life. The business, the clients, the travel, the success. And I also built myself into the ground. That breakdown became my reset, and now, The Reset Room exists so women like you don't have to hit the same wall.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Here, we burn the old playbook and rebuild something honest, powerful, and wildly aligned. Through 1:1 coaching, masterclasses, speaking events, and courses, I'll help you create a business and a life that doesn't just look good on paper — it actually feels good to live.
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://laurajanethomas.biz/wp-content/uploads/2025/11/LauraJThomas24-11-2025-09-52-50-1.png" alt="The Reset Room" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Meet Your Coach */}
      <section className="bg-foreground text-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://laurajanethomas.biz/wp-content/uploads/2025/11/Group-48095914.png" alt="Laura Jane Thomas coach" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-8" id="your-coach">— Meet Your Coach</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-8">
              meet your <span className="italic block">coach</span>
            </h2>
            <p className="text-ivory/80 text-lg leading-relaxed mb-5">
              If you've landed here, I'm glad you did — and I don't believe it's by coincidence. I believe you're here for a reason. My highest values are honesty and transparency, so here's what you should know: I've walked the walk.
            </p>
            <p className="text-ivory/70 text-[15px] leading-relaxed mb-5">
              I've built businesses from the ground up, scaled a global agency, and earned international recognition — but I've also hit epic burnout that left me bedridden and blown up my life more than once.
            </p>
            <p className="text-ivory/70 text-[15px] leading-relaxed">
              I know what it feels like to start over from scratch. That's why this space exists — a soft landing for ambitious women ready to reset, rebuild, and rise again. My greatest joy is helping ambitious women unlock their potential.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to work together nav */}
      <section className="bg-ivory border-t border-foreground/10 py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-10">— Ways We Can Work Together</p>
          <div className="grid md:grid-cols-3 gap-px bg-foreground/15">
            {[
              { label: "1 on 1 Coaching", anchor: "#coaching" },
              { label: "Take My Aligned Woman Masterclass", anchor: "#masterclass" },
              { label: "Hire Me as a Speaker or Panelist", anchor: "#speaker" },
            ].map((item) => (
              <a key={item.label} href={item.anchor} className="bg-ivory p-8 md:p-10 hover:bg-oxblood hover:text-ivory transition-colors duration-500 group">
                <span className="font-serif text-2xl md:text-3xl group-hover:italic transition-all">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 1:1 Coaching */}
      <section id="coaching" className="bg-oxblood text-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">— 1:1 Coaching</p>
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight mb-16">
            let's work <span className="italic">one on one</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {coachingTiers.map((tier, i) => (
              <CoachingCard key={tier.name} tier={tier} i={i} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/contact" className="inline-flex items-center gap-3 border border-ivory/70 px-10 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all group">
              Apply To Work With Me
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Masterclass */}
      <section id="masterclass" className="bg-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— The Aligned Woman Masterclass</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-8">
              the aligned <span className="italic block">woman masterclass</span>
            </h2>
            <p className="font-serif italic text-xl text-foreground mb-6 leading-relaxed">
              A high-impact training designed for ambitious women who look successful on the outside but feel exhausted on the inside.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-10">
              In just one session, you'll learn how to make money without guilt, regulate your nervous system so you stop working from stress, speak and sell with authority, and align your values so success finally feels like you. This isn't another fluffy mindset class. It is a grounded, science-backed reset for women who want to grow their career or business without burning themselves out in the process.
            </p>
            <a href="https://masterclass.laurajanethomas.biz/masterclass-164184" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-foreground text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all group">
              I Want To Know More!
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://laurajanethomas.biz/wp-content/uploads/2025/11/room2.png" alt="Aligned Woman Masterclass" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Helpful Resources */}
      <section className="bg-foreground text-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">— Helpful Resources</p>
          <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-16">
            helpful <span className="italic">resources</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group"
              >
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="aspect-[16/9] overflow-hidden mb-5">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3 group-hover:italic transition-all">{r.title}</h3>
                  <p className="text-[14px] text-ivory/70 leading-relaxed mb-4">{r.body}</p>
                  <span className="text-[11px] tracking-editorial uppercase border-b border-ivory/40 pb-1 group-hover:border-ivory transition-colors">{r.cta} →</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book me as a speaker */}
      <section id="speaker" className="bg-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://laurajanethomas.biz/wp-content/uploads/2025/11/newimg.png" alt="Laura speaking" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— Speaking</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-8">
              book me as <span className="italic block">a speaker</span>
            </h2>
            <p className="font-serif italic text-xl text-foreground mb-6 leading-relaxed">
              I don't do polished soundbites or sugar-coated strategies.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
              I speak the truths women in business are craving to hear. The ones that spark uncomfortable laughter, knowing nods, and real change.
            </p>
            <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-4">Topics I love to dive into:</p>
            <ul className="space-y-3 mb-8">
              {[
                "The Future of Business for Women — why the old hustle playbook is broken and how we're rewriting it.",
                "The Real Cause of Burnout — the hidden patterns beneath the exhaustion, and how to break free.",
                "The Hidden Price of Success — what it really costs to 'have it all' and how to build a business (and life) that actually feels good.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14px] text-muted-foreground">
                  <span className="text-oxblood mt-1 text-xs">—</span>{t}
                </li>
              ))}
            </ul>
            <p className="font-serif italic text-lg text-foreground mb-8">
              If you want your panel or stage to leave women feeling seen, challenged, and inspired to rewrite the rules of success, I'm your speaker.
            </p>
            <a href="https://masterclass.laurajanethomas.biz/masterclass-164184" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-foreground text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all group">
              Book Me To Speak
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CtaBanner headline={<>Ready to<br /><span className="italic">reset?</span></>} href="/contact" />
      <Footer />
    </div>
  );
}