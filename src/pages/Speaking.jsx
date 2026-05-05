import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CtaBanner from "@/components/shared/CtaBanner";

const speakingTopics = [
  {
    num: "01.",
    title: "The Hidden Tax on Female Leadership",
    subtitle: "When Likeability Becomes a Leadership Liability",
    body: "In many modern workplaces, overt sexism has largely disappeared. But something more subtle has taken its place. Research consistently shows that when women demonstrate the traits associated with strong leadership — decisiveness, authority, ambition and confidence — they are often perceived as less likeable. Unlike their male counterparts, likeability significantly influences how their competence is judged.\n\nThat is the hidden tax.\n\nIn this keynote, I explore why women are still penalised for authority, how perception bias shapes performance evaluations and promotion decisions, the psychological toll of constantly managing how you are received, and the measurable impact this has on innovation, retention and leadership pipelines.\n\nThis is not about blaming men. It is about understanding systems. And redesigning them.",
  },
  {
    num: "02.",
    title: "How to Ruin Your Life as a Woman",
    subtitle: "The title is intentionally provocative. The message is deeply human.",
    body: "In this keynote, Laura Thomas explores how many high-performing women did everything right. We worked hard. We achieved. We proved ourselves. And somewhere along the way, we forgot why we started.\n\nWe lost the purpose behind the ambition. Which was joy. We over-function. We over-deliver. We hold everything together. And we call it strength.\n\nBut what if success without joy is not success at all?\n\nIn this talk, Laura examines why so many accomplished women feel quietly exhausted, how overachievement can disconnect us from identity and pleasure, the role of nervous system health in sustainable performance, and how to redefine ambition in a way that includes fulfilment, not just output.\n\nThis is not about doing less. It is about doing differently.",
  },
];

const venues = [
  "Corporate conferences and executive teams",
  "Leadership development programmes",
  "Women in business forums",
  "Entrepreneurship events",
  "Universities and schools",
  "Community platforms aligned with women's growth and development",
];

const formats = [
  "Large-stage keynotes",
  "Leadership intensives",
  "Panel discussions",
  "School assemblies",
  "Community conversations",
  "Virtual events",
];

export default function Speaking() {
  return (
    <div className="bg-ivory">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-oxblood text-ivory pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="https://pub-7ae774d14f7545f5867330470de2d758.r2.dev/LauraThomas_HeroVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-oxblood/30" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">
            — Speaking
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-8"
          >
            Keynote Speaker
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif italic text-xl md:text-2xl text-ivory/85 mb-12 max-w-2xl"
          >
            For organisations serious about developing female leadership, building healthier performance cultures, and having the conversations most stages avoid.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-12 flex gap-5"
          >
            <Link to="/contact" className="inline-flex items-center gap-3 bg-ivory text-oxblood px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory/90 transition-all group btn-pulse">
              Book Me →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction Video */}
      <section className="bg-ivory py-24 md:py-36 pb-12 md:pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— Trusted On The Stages That Matter</p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-6">
              A short introduction, <span className="italic">in my own words.</span>
            </h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A two-minute introduction to the work, the talks, and what audiences walk away with.
            </p>
          </div>
          <div className="relative aspect-video bg-gradient-to-b from-[#6B3E4D] to-[#3A1E2A] rounded-lg overflow-hidden group cursor-pointer">
            <video
              className="w-full h-full object-cover"
              controls
              poster="https://laurajanethomas.biz/wp-content/uploads/2026/02/C39D33B6-CEBB-4963-9550-4913F3A54680-1024x997.png"
            >
              <source src="https://pub-a5b7b5d795624ffe98c7799d0aa110c1.r2.dev/laura-reduced.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-oxblood/30 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center hover:scale-110 transition-transform duration-300 pointer-events-auto" onClick={(e) => e.currentTarget.closest('video')?.play()}>
                <Play className="w-6 h-6 text-oxblood fill-oxblood ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Testimonials */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-8">
                <p className="text-[8px] tracking-editorial uppercase font-bold text-oxblood mb-1">Guest Keynote</p>
                <p className="text-[9px] tracking-editorial uppercase font-semibold text-oxblood">Big5Digital</p>
                <p className="text-[8px] tracking-editorial uppercase text-oxblood/70">2024</p>
              </div>
              <p className="font-serif italic text-lg text-foreground mb-6 leading-relaxed">
                "Laura's talk on The Hidden Tax on Female Leadership made me think differently about where I am in my life and my work. It gave me real insight, real confidence, and I wish it had been longer."
              </p>
              <p className="text-sm font-semibold text-foreground">Big5Digital</p>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-8">
                <p className="text-[8px] tracking-editorial uppercase font-bold text-oxblood mb-1">Women's Day</p>
                <p className="text-[9px] tracking-editorial uppercase font-semibold text-oxblood">EY</p>
                <p className="text-[8px] tracking-editorial uppercase text-oxblood/70">Keynote · Panel</p>
              </div>
              <p className="font-serif italic text-lg text-foreground mb-6 leading-relaxed">
                "To the most amazing speaker and panellist, on behalf of the D&I team and EY, thank you for helping make our Women's Day celebration a huge success."
              </p>
              <p className="text-sm font-semibold text-foreground">Clayton Jordy Fowlds</p>
              <p className="text-xs text-muted-foreground">D&I Team, EY</p>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-8">
                <p className="text-[8px] tracking-editorial uppercase font-bold text-oxblood mb-1">H2H Workshop</p>
                <p className="text-[9px] tracking-editorial uppercase font-semibold text-oxblood">Oracle</p>
                <p className="text-[8px] tracking-editorial uppercase text-oxblood/70">Marketing Team</p>
              </div>
              <p className="font-serif italic text-lg text-foreground mb-6 leading-relaxed">
                "The teams thoroughly enjoyed and were engaged in your H2H workshop. They even stayed overtime. Thank you for such a fantastic session."
              </p>
              <p className="text-sm font-semibold text-foreground">Cathy Stadler</p>
              <p className="text-xs text-muted-foreground">Director of Marketing, Oracle</p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-foreground/15 my-16" />

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-ivory border border-oxblood text-oxblood px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood hover:text-ivory transition-all duration-300 group"
            >
              Book Me To Speak
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Who I am */}
      <section className="bg-ivory py-24 md:py-36 relative">
        <div className="absolute inset-0 bg-oxblood/5" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://laurajanethomas.biz/wp-content/uploads/2026/02/C39D33B6-CEBB-4963-9550-4913F3A54680-1024x997.png" alt="Laura speaking" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— Hi, I'm Laura</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-8">
              The honest version.
            </h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
              I have spent fifteen years inside the rooms where senior commercial decisions get made. I founded and ran a multi-seven-figure creative agency, and I burned out in the middle of all of it, which forced me to rebuild what I thought success was, and how it should be built.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
              That rebuild is what I speak about now. Not the polished version. The honest one.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
              I speak about why female leadership keeps stalling between mid-level and senior, despite a decade of pipeline programmes. Why high-performing women keep arriving at the top exhausted rather than energised. Why the systems we work inside reward output and punish sustainability. And what it actually takes to build success that is honest, structured, and built to last.
            </p>
            <p className="font-serif italic text-xl text-foreground">
              I have stood on both sides of the conversation. The building, and the rebuild. That is what audiences hear.
            </p>
          </div>
        </div>
      </section>

      {/* Where I speak */}
      <section className="bg-foreground text-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">— Where I Speak</p>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8">
                Where I Speak
              </h2>
              <p className="text-ivory/80 text-lg leading-relaxed mb-8">
                My work translates across multiple audiences because the core themes are universal:
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {["Power.", "Identity.", "Performance.", "Ambition.", "Sustainability."].map((w) => (
                  <span key={w} className="font-serif italic text-2xl text-ivory">{w}</span>
                ))}
              </div>
              <p className="text-[11px] tracking-editorial uppercase text-ivory/60 mb-4">I deliver talks for:</p>
              <ul className="space-y-3">
                {venues.map((v) => (
                  <li key={v} className="flex items-start gap-3 text-[15px] text-ivory/80">
                    <span className="text-oxblood mt-1.5 text-xs">●</span>{v}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-editorial uppercase text-ivory/60 mb-6">What Audiences Experience</p>
              <p className="font-serif italic text-xl text-ivory/90 mb-6">My talks combine:</p>
              <ul className="space-y-3 mb-12">
                {["Behavioural research", "Organisational insight", "Strategic business thinking", "Personal lived experience"].map((v) => (
                  <li key={v} className="flex items-start gap-3 text-[15px] text-ivory/80">
                    <span className="text-oxblood mt-1.5 text-xs">●</span>{v}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] tracking-editorial uppercase text-ivory/60 mb-4">Travel & Availability</p>
              <p className="text-[15px] text-ivory/70 mb-4">I hold both South African and British passports and am available for engagements across United Kingdom, Europe, Middle East, South Africa, and international conferences.</p>
              <p className="text-[11px] tracking-editorial uppercase text-ivory/60 mb-4 mt-8">Available formats:</p>
              <ul className="space-y-2">
                {formats.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px] text-ivory/80">
                    <span className="text-oxblood mt-1.5 text-xs">●</span>{f}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link to="/contact" className="inline-flex items-center gap-3 border border-ivory/70 px-7 py-3.5 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-foreground transition-all group btn-pulse">
                  Book Me To Speak
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keynote Topics */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-10">— Keynote Topics</p>
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight mb-20">
            Keynote Topics
          </h2>
          <div className="space-y-0 divide-y divide-foreground/15">
            {speakingTopics.map((t, i) => (
              <motion.div
                key={t.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="py-12 md:py-16 grid lg:grid-cols-12 gap-8"
              >
                <div className="lg:col-span-1">
                  <span className="font-serif italic text-4xl text-oxblood/40">{t.num}</span>
                </div>
                <div className="lg:col-span-11">
                  <h3 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight mb-3">{t.title}</h3>
                  <p className="font-serif italic text-xl text-muted-foreground mb-6">{t.subtitle}</p>
                  {t.body.split("\n\n").map((p, j) => (
                    <p key={j} className="text-[15px] text-muted-foreground leading-relaxed mb-4 last:mb-0 max-w-3xl">{p}</p>
                  ))}
                  <div className="mt-8">
                    <Link to="/contact" className="inline-flex items-center gap-3 border border-foreground/50 px-7 py-3 text-[11px] tracking-editorial uppercase hover:bg-foreground hover:text-ivory transition-all group btn-pulse">
                      Book Me To Speak
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast */}
      <section className="bg-oxblood text-ivory py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-8">— The Aligned Woman Podcast</p>
              <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-8">
                The Aligned Woman Podcast
              </h2>
              <p className="text-ivory/80 text-lg leading-relaxed mb-10">
                The Aligned Woman Podcast is where ambition meets alignment. Hosted by Laura Thomas, this show brings together extraordinary women to explore leadership, burnout, identity, wealth and joy. These are the conversations women are craving but rarely given space to have.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://open.spotify.com/show/0TdHPtBVdT9setqlPZUimi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-ivory/70 px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all btn-pulse">
                  Listen on Spotify
                </a>
                <a href="https://podcasts.apple.com/us/podcast/the-aligned-woman-podcast/id1877634580" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-ivory/70 px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all btn-pulse">
                  Apple Podcasts
                </a>
              </div>
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://laurajanethomas.biz/wp-content/uploads/2026/02/mockupapp-1.png" alt="Podcast" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Testimonials */}
      <section className="bg-ivory py-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-12 md:pt-12">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-8">
                <p className="text-[8px] tracking-editorial uppercase font-bold text-oxblood mb-1">Guest Keynote</p>
                <p className="text-[9px] tracking-editorial uppercase font-semibold text-oxblood">Big5Digital</p>
                <p className="text-[8px] tracking-editorial uppercase text-oxblood/70">2024</p>
              </div>
              <p className="font-serif italic text-lg text-foreground mb-6 leading-relaxed">
                "Laura's talk on The Hidden Tax on Female Leadership made me think differently about where I am in my life and my work. It gave me real insight, real confidence, and I wish it had been longer."
              </p>
              <p className="text-sm font-semibold text-foreground">Big5Digital</p>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-8">
                <p className="text-[8px] tracking-editorial uppercase font-bold text-oxblood mb-1">Women's Day</p>
                <p className="text-[9px] tracking-editorial uppercase font-semibold text-oxblood">EY</p>
                <p className="text-[8px] tracking-editorial uppercase text-oxblood/70">Keynote · Panel</p>
              </div>
              <p className="font-serif italic text-lg text-foreground mb-6 leading-relaxed">
                "To the most amazing speaker and panellist, on behalf of the D&I team and EY, thank you for helping make our Women's Day celebration a huge success."
              </p>
              <p className="text-sm font-semibold text-foreground">Clayton Jordy Fowlds</p>
              <p className="text-xs text-muted-foreground">D&I Team, EY</p>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-8">
                <p className="text-[8px] tracking-editorial uppercase font-bold text-oxblood mb-1">H2H Workshop</p>
                <p className="text-[9px] tracking-editorial uppercase font-semibold text-oxblood">Oracle</p>
                <p className="text-[8px] tracking-editorial uppercase text-oxblood/70">Marketing Team</p>
              </div>
              <p className="font-serif italic text-lg text-foreground mb-6 leading-relaxed">
                "The teams thoroughly enjoyed and were engaged in your H2H workshop. They even stayed overtime. Thank you for such a fantastic session."
              </p>
              <p className="text-sm font-semibold text-foreground">Cathy Stadler</p>
              <p className="text-xs text-muted-foreground">Director of Marketing, Oracle</p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-foreground/15 my-16" />

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-ivory border border-oxblood text-oxblood px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood hover:text-ivory transition-all duration-300 group"
            >
              Book Me To Speak
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CtaBanner headline={<>Book me<br /><span className="italic">to speak</span></>} cta="Book Me To Speak" href="/contact" />
      <Footer />
    </div>
  );
}