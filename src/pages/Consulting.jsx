import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ClientsSection from "@/components/shared/ClientsSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CtaBanner from "@/components/shared/CtaBanner";

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
  { title: "Strategic Leadership", body: "Clear direction for brand and marketing strategy that supports and amplifies your business objectives." },
  { title: "Revenue Aligned Strategy", body: "Marketing plans designed to influence measurable commercial outcomes rather than vanity metrics." },
  { title: "Customer Journey Mapping", body: "A complete view of how your customers move from awareness to loyalty, ensuring every touchpoint works in harmony." },
  { title: "Creative Direction", body: "Elevated concepts, messaging and brand storytelling that keep your brand fresh, relevant and engaging." },
  { title: "Collaborative Integration", body: "Flexible support that fits your structure. I can work independently as a senior consultant or integrate seamlessly with your existing team." },
  { title: "Custom Growth Playbook", body: "A comprehensive, easy to follow blueprint that outlines your full marketing strategy, brand direction, content plan and priority actions." },
];

const smbOffering = [
  { title: "Brand and Business Review", body: "A full audit of your brand, marketing and business ecosystem. We identify gaps, strengths, opportunities and the exact levers that will create scalable, sustainable growth." },
  { title: "Holistic Marketing Strategy", body: "A clear, end to end strategy that aligns your brand, content, campaigns, funnels, customer experience and paid media into one cohesive growth engine." },
  { title: "Brand Development and Concept Creation", body: "Support with creative direction, brand evolution, storytelling and campaign concepts so your brand stands out with clarity and emotional intelligence." },
  { title: "Content and Communication Frameworks", body: "Strategic content pillars, messaging frameworks and story driven angles your team can confidently execute. This includes ideas for campaigns, launches, video content, newsletters and more." },
  { title: "Team Alignment and Leadership Support", body: "I guide your team to understand the strategy, implement effectively and stay aligned. From marketing meetings to review sessions, we ensure everyone is rowing in the same direction." },
  { title: "Custom Growth Playbook", body: "A comprehensive, easy to follow blueprint that outlines your full marketing strategy, brand direction, content plan and priority actions. Your team can use this long after our work together." },
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
        <div className="absolute inset-0 bg-oxblood/40" />
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
            <img src="https://laurajanethomas.biz/wp-content/uploads/2025/11/LauraJaneThomas_ABout.jpg" alt="Laura consulting" className="w-full h-full object-cover" />
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
            <Link to="/contact" className="inline-flex items-center gap-3 border border-ivory/70 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all duration-300 group">
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
                Even the strongest in house teams can lose perspective.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                When you are deep in the day to day, it becomes difficult to see the gaps, the blind spots or where your marketing is no longer aligned with the company's bigger vision. Campaigns start to feel siloed. Creative gets stuck in familiar patterns. Teams become reactive instead of strategic.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                This is where outside clarity becomes your most valuable asset. I bring an unbiased view, senior level strategy and creative direction that helps your team reconnect the dots between brand, marketing and revenue.
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
                <Link to="/contact" className="inline-flex items-center gap-3 bg-foreground text-ivory px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 group">
                  Apply To Work With Me
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMB */}
      <section className="bg-foreground text-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">— For Small to Medium Sized Businesses</p>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8">
                for small to <span className="italic block">medium businesses</span>
              </h2>
              <p className="font-serif italic text-xl text-ivory/85 mb-6 leading-relaxed">
                When you are building or scaling a business, marketing can quickly become a source of overwhelm.
              </p>
              <p className="text-[15px] text-ivory/70 leading-relaxed mb-6">
                You know your brand needs clarity, alignment and momentum, but without senior strategic direction it is easy to get pulled into scattered efforts that drain time and budget.
              </p>
              <p className="text-[15px] text-ivory/70 leading-relaxed">
                You do not need more content, more platforms or more guesswork. You need a holistic strategy, a strong brand foundation and a partner who can see the full landscape of your business and guide you toward measurable growth.
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

      <ClientsSection />
      <TestimonialsSection />
      <CtaBanner headline={<>Ready to build<br /><span className="italic">with clarity?</span></>} href="/contact" />
      <Footer />
    </div>
  );
}