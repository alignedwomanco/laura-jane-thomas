import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ClientsSection from "@/components/shared/ClientsSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CtaBanner from "@/components/shared/CtaBanner";

const aboutCards = [
  {
    label: "CHAPTER ONE",
    bg: "#3A0E1A",
    top: 0,
    zIndex: 1,
    titleLines: [
      { text: "MY" },
      { text: "EXPERTISE &" },
      { parts: [{ text: "Credentials", italic: true }] },
    ],
    body: "My background spans the full spectrum of brand, business and human development. I hold a specialised degree in Brand Communications and I am a Certified Director with international accreditation from the American Board of NLP as both an NLP Practitioner and a Timeline Therapy Coach. I have spent more than fifteen years leading brand strategy, creative direction and high level marketing across global organisations and fast growing start ups. I am also a published author, a keynote speaker and the former Chair of the 30 Percent Club.",
  },
  {
    label: "CHAPTER TWO",
    bg: "#4A2730",
    top: 64,
    zIndex: 2,
    titleLines: [
      { text: "WHAT" },
      { parts: [{ text: "I", italic: false }, { text: " Do", italic: true }] },
    ],
    body: "My work bridges brand, business and personal transformation. On the business side, I partner with leaders who need senior level brand and marketing direction — positioning, creative direction, content, campaigns and team alignment. On the coaching side, I work one to one with women navigating change, growth or reinvention, exploring identity, values and vision so they can create a life and career that feels grounded and aligned.",
  },
  {
    label: "CHAPTER THREE",
    bg: "#0D0508",
    top: 128,
    zIndex: 3,
    titleLines: [
      { text: "THE" },
      { parts: [{ text: "Reset", italic: true }, { text: " ROOM" }] },
    ],
    body: "The Reset Room is the learning and transformation space I created for women who are ready to expand into the next version of themselves. It is where all of my courses, masterclasses and coaching experiences live. From mindset and identity work to brand clarity and personal leadership, everything is created to support real, lasting change.",
  },
];

const cream = "#F2EBE0";

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
                Alignment is the highest leverage asset there is. I am Laura Thomas, a senior strategy practitioner with fifteen years of experience advising founders, CEOs, and ambitious women on how to grow without breaking what matters underneath.
              </p>
            </motion.div>
          </div>
        </div>
        {/* Hero video strip */}
        <div className="relative h-[50vw] max-h-[500px] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center"
          >
            <source src="https://pub-7ae774d14f7545f5867330470de2d758.r2.dev/LauraThomas_HeroVideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
        </div>
      </section>

      {/* Bio body */}
      <section className="bg-ivory py-32 md:py-48">
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

      {/* Sticky cards */}
      <div className="relative">
        {aboutCards.map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: s.bg,
              position: "sticky",
              top: `${s.top}px`,
              zIndex: s.zIndex,
              minHeight: s.zIndex === 3 ? "auto" : "100vh",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              overflow: "hidden",
            }}
          >
            {/* Top bar */}
            <div style={{ height: "64px", padding: "0 64px", display: "flex", alignItems: "center" }}>
              <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: cream, opacity: 0.7 }}>
                {s.label}
              </span>
            </div>

            {/* Body */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "880px", margin: "0 auto", paddingTop: "48px", paddingBottom: s.zIndex === 3 ? "48px" : "96px", paddingLeft: "24px", paddingRight: "24px" }}>
              <h2 style={{ color: cream, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "32px", fontSize: "clamp(44px, 7vw, 88px)" }}>
                {s.titleLines.map((line, li) => (
                  <span key={li} style={{ display: "block" }}>
                    {line.parts ? (
                      line.parts.map((part, pi) =>
                        part.italic ? (
                          <span key={pi} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400, color: cream }}>{part.text}</span>
                        ) : (
                          <span key={pi} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, textTransform: "uppercase" }}>{part.text}</span>
                        )
                      )
                    ) : (
                      <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, textTransform: "uppercase" }}>{line.text}</span>
                    )}
                  </span>
                ))}
              </h2>
              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", lineHeight: 1.65, maxWidth: "560px", color: `rgba(242,235,224,0.78)`, marginBottom: "0" }}>
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>

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
                src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/44ad00c70_LJT_17-04-2026-21-30-39.jpg"
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