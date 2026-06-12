import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ClientsSection from "@/components/shared/ClientsSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CtaBanner from "@/components/shared/CtaBanner";
import ConsultingFAQ from "@/components/consulting/ConsultingFAQ";

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

export default function Consulting() {
  return (
    <div className="bg-ivory">
      <Navbar />

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
        </div>
      </section>

      {/* Intro */}
      <section className="bg-oxblood text-ivory py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/61b35f8db_Facetune_17-04-2026-20-36-52.jpg" alt="Laura consulting" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-serif text-2xl md:text-3xl lg:text-[32px] leading-[1.3] text-ivory mb-8">
              I work with founders, CEOs, and senior teams who suspect their growth problem is upstream of their marketing.
            </p>
            <p className="text-ivory/70 text-[15px] leading-relaxed mb-5">
              Instead of the cost and commitment of a full-time CMO, you get a senior strategic partner calibrated to your scope. Productised engagements, longer retainers, or embedded advisory, structured to what the business actually needs.
            </p>
            <p className="text-ivory/70 text-[15px] leading-relaxed mb-10">
              One brain holding brand, strategy, and creative direction together. The work has been done at the level you need it done at, and it is built so your team can run it long after I leave the room.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 border border-ivory/70 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all duration-300 group btn-pulse">
            Apply To Work With Me
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Corporates */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-10">— For Corporates</p>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8">
                for <span className="italic">corporates</span>
              </h2>
              <p className="font-serif italic text-xl text-foreground mb-6 leading-relaxed">
                The bigger the team, the easier it is to lose the strategy.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                When you are deep in the day-to-day, the misalignment is hard to see from the inside. Campaigns drift from the brand. Creative repeats itself. Marketing functions are busy but not compounding. The team is shipping. The numbers are not moving the way they should.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                This is where senior outside perspective earns its weight. Not another deck. Not another vendor. A senior strategic partner who can hold brand, marketing, and revenue in one conversation, name what is actually wrong, and equip your team to fix it without dismantling what is already working.
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-6 border-b border-foreground/15 pb-4">The Offering</p>
              {corporateOffering.map((item, i) => (
                <AccordionItem key={i} title={item.title}>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{item.body}</p>
                </AccordionItem>
              ))}
              <div className="mt-10">
                <Link to="/contact" className="inline-flex items-center gap-3 bg-foreground text-ivory px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 group btn-pulse">
                  Apply To Work With Me
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMB */}
      <section className="bg-foreground text-ivory py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">— For Small to Medium Sized Businesses</p>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8">
                for small to <span className="italic block">medium businesses</span>
              </h2>
              <p className="font-serif italic text-xl text-ivory/85 mb-6 leading-relaxed">
                The strongest brands are built on the right foundations, not the loudest launch.
              </p>
              <p className="text-[15px] text-ivory/70 leading-relaxed mb-6">
                Whether you are launching something new or scaling something already built, the question is the same. Is the foundation underneath strong enough to hold what comes next.
              </p>
              <p className="text-[15px] text-ivory/70 leading-relaxed mb-6">
                If you are starting out, the work is to build it properly the first time. Brand, strategy, customer journey, and messaging architected before the noise of execution takes over.
              </p>
              <p className="text-[15px] text-ivory/70 leading-relaxed mb-6">
                If you are already in motion, the work is different. The numbers are real, but the marketing function is doing too much of the work the founder used to do. The work that gets you to the next stage is not more of the work that got you here.
              </p>
              <p className="text-[15px] text-ivory/70 leading-relaxed">
                Either way, what you are buying is the senior brain that sets the foundation up properly. So when you launch, you launch into something built. When you scale, you scale on something that holds.
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-editorial uppercase text-ivory/50 mb-6 border-b border-ivory/20 pb-4">The Offering</p>
              {smbOffering.map((item, i) => (
                <AccordionItem key={i} title={item.title}>
                  <p className="text-[14px] text-ivory/70 leading-relaxed">{item.body}</p>
                </AccordionItem>
              ))}
              <div className="mt-10">
                <Link to="/contact" className="inline-flex items-center gap-3 border border-ivory/70 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-foreground transition-all duration-300 group">
                  Apply To Work With Me
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsSection dark={true} />
      <TestimonialsSection />
      <ConsultingFAQ />
      <CtaBanner headline={<>Ready to build<br /><span className="italic">with clarity?</span></>} href="/contact" />
      <Footer />
    </div>
  );
}