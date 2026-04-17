import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ClientsSection from "@/components/shared/ClientsSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CtaBanner from "@/components/shared/CtaBanner";

const accordionItems = [
  {
    title: "My Expertise & Credentials",
    body: "My background spans the full spectrum of brand, business and human development. I hold a specialised degree in Brand Communications and I am a Certified Director with international accreditation from the American Board of NLP as both an NLP Practitioner and a Timeline Therapy Coach. Alongside my formal qualifications, I have spent more than fifteen years leading brand strategy, creative direction and high level marketing across global organisations and fast growing start ups.\n\nI am also a published author, a keynote speaker and the former Chair of the 30 Percent Club, a collective of senior executives dedicated to advancing women in leadership. These experiences have given me a unique view of what helps people and businesses grow. I understand how brands gain traction, how teams function and what ambitious women need to thrive personally and professionally.\n\nThis combination of strategic expertise, creative thinking and deep human insight allows me to support transformation at every level. I work with both organisations and individuals, bringing clarity, grounded guidance and practical tools to help them move forward with confidence.",
  },
  {
    title: "What I Do",
    body: "My work bridges brand, business and personal transformation. I support companies, founders and ambitious women who want clarity, alignment and intentional growth in both their professional and personal lives.\n\nOn the business side, I partner with leaders who need senior level brand and marketing direction. I bring strategic clarity to positioning, customer journeys, creative direction, content, campaigns and team alignment. Whether you are building, scaling or repositioning, I help you make confident decisions and move with focus.\n\nOn the coaching side, I work one to one with women who are navigating change, growth or reinvention. Together we explore identity, values, patterns and vision so you can create a life and career that feels grounded and aligned.\n\nI also speak at events, participate in panels and lead workshops for organisations and communities. My talks focus on topics such as leadership, burnout recovery, reinvention, brand storytelling, women in business and the intersection of identity and success.",
  },
  {
    title: "The Reset Room",
    body: "The Reset Room is the learning and transformation space I created for women who are ready to expand into the next version of themselves. It is where all of my courses, masterclasses and coaching experiences live. This is the place you come to when you know something needs to shift, when you feel yourself outgrowing old patterns and when you want guided support as you step into a new chapter.\n\nInside The Reset Room, you will find both self paced and high touch experiences designed to help you reconnect with who you are, rebuild your confidence and realign your life or business with your truth. From mindset and identity work to brand clarity and personal leadership, everything is created to support real, lasting change.\n\nWhether you join a masterclass, dive into a course or work with me privately, the work inside The Reset Room is centred on clarity, alignment and personal evolution.",
  },
];

function AccordionItem({ title, body, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-foreground/15">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-serif text-2xl md:text-3xl group-hover:italic transition-all">{title}</span>
        <span className="ml-4 flex-shrink-0">
          {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-8">
              {body.split("\n\n").map((p, i) => (
                <p key={i} className="text-[15px] text-muted-foreground leading-relaxed mb-4 last:mb-0">{p}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const stats = [
  { num: "15+", label: "Years of experience" },
  { num: "7fig", label: "Agency founder" },
  { num: "500+", label: "Brands advised" },
  { num: "30%", label: "Club former chair" },
];

export default function About() {
  return (
    <div className="bg-ivory">
      <Navbar />

      {/* Hero */}
      <section className="bg-oxblood text-ivory pt-40 pb-0 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">
            — Get to Know Me
          </motion.p>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[18vw] md:text-[12vw] lg:text-[9vw] leading-[0.9] tracking-tight pb-12"
            >
              get to <span className="italic block">know me</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="pb-12 lg:pb-20">
              <p className="font-serif italic text-xl md:text-2xl text-ivory/85 leading-relaxed">
                Hi, I'm Laura Thomas, an award-winning Brand Strategist, Fractional CMO, and Coach with more than 15 years of experience helping businesses grow with clarity and confidence.
              </p>
            </motion.div>
          </div>
        </div>
        {/* Hero image strip */}
        <div className="relative h-[50vw] max-h-[500px] overflow-hidden">
          <img
            src="https://laurajanethomas.biz/wp-content/uploads/2025/11/Laura-1.png"
            alt="Laura Jane Thomas"
            className="w-full h-full object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
        </div>
      </section>

      {/* Bio body */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-6">
              {[
                "I have worked with some of the world's leading brands as well as ambitious start-ups, bringing together creativity, data and strategy to build brands that perform. My approach is both analytical and imaginative, ensuring that every decision is driven by insight and aligned with the bigger picture of your business.",
                "As a Fractional CMO and Marketing Consultant, I partner with founders, executives and in-house teams to refine strategy, strengthen positioning and deliver measurable results. From luxury and wellness to tech and lifestyle, my work focuses on helping brands scale with purpose and precision.",
                "Beyond consulting, I also work one-to-one with ambitious women who are ready to redefine success on their own terms. Through personalised business and life coaching, I help women overcome burnout, find alignment and build lives and businesses that feel as good as they look.",
                "Whether you are looking for high-level marketing leadership or coaching that integrates strategy with personal growth, my goal is the same: to help you unlock your potential and create lasting success.",
              ].map((p, i) => (
                <p key={i} className={`leading-relaxed ${i === 0 ? "font-serif text-xl md:text-2xl text-foreground" : "text-[15px] text-muted-foreground"}`}>{p}</p>
              ))}
              <div className="pt-6">
                <Link to="/contact" className="inline-flex items-center gap-3 bg-foreground text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 group">
                  Apply To Work With Me
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-px bg-foreground/15">
                {stats.map((s) => (
                  <div key={s.num} className="bg-ivory p-6">
                    <span className="font-serif italic text-4xl md:text-5xl text-oxblood block">{s.num}</span>
                    <span className="text-[11px] tracking-editorial uppercase text-muted-foreground mt-2 block">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="bg-ivory border-t border-foreground/10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 max-w-4xl">
          {accordionItems.map((item, i) => (
            <AccordionItem key={i} {...item} index={i} />
          ))}
        </div>
      </section>

      {/* Why work with me */}
      <section className="bg-oxblood text-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-8">— Why work with me</p>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8">
                why work <span className="italic block">with me</span>
              </h2>
              <p className="text-ivory/80 text-lg leading-relaxed mb-6">
                Whether in boardrooms, workshops, or one-to-one sessions, my mission is the same: to create clarity, confidence, and alignment.
              </p>
              <p className="text-ivory/70 text-[15px] leading-relaxed">
                I bring both the structure of an award-winning strategist and the tools of a certified coach, equipping clients to lead, grow, and succeed on their own terms.
              </p>
            </div>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://laurajanethomas.biz/wp-content/uploads/2025/11/why-work-img.png"
                alt="Why work with Laura"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ClientsSection />
      <TestimonialsSection />
      <CtaBanner headline={<>Let's build<br /><span className="italic">something real</span></>} href="/contact" />
      <Footer />
    </div>
  );
}