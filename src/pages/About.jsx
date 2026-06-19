import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ClientsSection from "@/components/shared/ClientsSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CtaBanner from "@/components/shared/CtaBanner";
import AboutServicesAccordion from "@/components/about/AboutServicesAccordion";

const cream = "#F2EBE0";

const stats = [
{ num: "15+", label: "Years of experience" },
{ num: "7fig", label: "Agency founder" },
{ num: "500+", label: "Brands advised" },
{ num: "30%", label: "Club former chair" }];


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
              className="font-serif text-[13vw] md:text-[12vw] lg:text-[9vw] leading-[0.9] tracking-tight pb-8 md:pb-12">
              
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
            className="w-full h-full object-cover object-center">
            
            <source src="https://pub-7ae774d14f7545f5867330470de2d758.r2.dev/LauraThomas_HeroVideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
          <div className="absolute inset-0 bg-oxblood opacity-40" />
        </div>
      </section>

      {/* Bio body */}
      <section className="relative bg-ivory py-16 md:py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/e148e7858_efca8aa6761e6e74544ba4e9681156c9.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.4 }} />
          
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/40 to-ivory/80" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="space-y-6">
              {[
              "For fifteen years I have worked at the intersection of three things most people separate: creative direction, team leadership, and commercial analytics.",
              "I founded and ran a multi-seven-figure creative agency, advised more than 500 brands across luxury, wellness, tech, and lifestyle, and chaired the 30 Percent Club. The work compounds. So do the relationships.",
              "What I learned the hard way is that any growth without internal alignment isn't sustainable, in business or in life. When the brand, the strategy, and the execution align, businesses last. When the woman, the work, and the life align, she lasts.",
              "Today, that conviction shapes everything I do. I advise founders, CEOs, and senior teams as a Fractional CMO and Brand Advisor. I work privately with ambitious women building what's next. And I built The Aligned Woman Co. to scale the same methodology to women everywhere."].
              map((p, i) =>
              <p key={i} className={`leading-relaxed text-center ${i === 0 ? "font-serif text-xl md:text-2xl text-foreground" : "text-[15px] text-muted-foreground"}`}>{p}</p>
              )}
              <div className="pt-6 flex justify-center">
                <Link to="/contact" className="inline-flex items-center gap-3 bg-foreground text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 group btn-pulse">
                  Apply To Work With Me
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Services Accordion */}
      <AboutServicesAccordion />

      {/* Why work with me */}
      <section className="bg-oxblood text-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-8">— Why work with me</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.92] tracking-tight mb-8">
                why work <span className="italic block">with me</span>
            </h2>
              <p className="text-ivory/80 text-lg leading-relaxed mb-6">
                Fifteen years. Multi-seven-figure agency founder. 500+ brands across luxury, wellness, tech, and lifestyle. Former Chair of the 30 Percent Club. Featured in Forbes, TechCrunch, Glamour, Business Day, and The Times.
              </p>
              <p className="text-ivory/70 text-[15px] leading-relaxed mb-6">
                Those are the receipts, here is what they actually mean.
              </p>
              <p className="text-ivory/70 text-[15px] leading-relaxed mb-6">I have done the work I am asking you to trust me on. I have built the teams. I have run the agency. I have sat in the boardrooms making the calls and lived with whatever came next. Most people in this space have either consulted without operating, or coached without ever building anything. I have done both,  at scale, for fifteen years, with the scars to prove it.

              </p>
              <p className="text-ivory/70 text-[15px] leading-relaxed mb-8">
                That is the brain you are hiring. The methodologies are just the language for what I learned along the way.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-3 border border-ivory/40 px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood-deep transition-all duration-300 btn-pulse">
                Begin The Inquiry
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="aspect-[4/5] overflow-hidden order-1 lg:order-2">
              <img
                src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/44ad00c70_LJT_17-04-2026-21-30-39.jpg"
                alt="Why work with Laura"
                className="w-full h-full object-cover" />
              
            </div>
          </div>
        </div>
      </section>

      <ClientsSection dark={true} />
      <TestimonialsSection />
      <CtaBanner headline={<>Let's build<br /><span className="italic">something real</span></>} href="/contact" />
      <Footer />
    </div>);

}