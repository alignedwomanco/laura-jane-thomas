import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CtaBanner from "@/components/shared/CtaBanner";
import BlogPreview from "@/components/home/BlogPreview";

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
            className="font-serif leading-[0.92] tracking-tight"
          >
            <span className="block text-[10vw] md:text-[7vw] lg:text-[6vw] font-medium">Keynote</span>
            <span className="block text-[7vw] md:text-[5vw] lg:text-[4.5vw] italic font-normal">Speaker</span>
            <span className="block text-[5vw] md:text-[3.5vw] lg:text-[3vw] font-light mt-2">Leadership Strategist. Brand & Performance Expert.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-12 flex gap-5"
          >
            <Link to="/contact" className="inline-flex items-center gap-3 bg-ivory text-oxblood px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory/90 transition-all group btn-pulse">
              Book Me
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Who I am */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— Hi, I'm Laura</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.92] tracking-tight mb-8">
              Keynote Speaker <span className="italic block">Leadership Strategist</span>
              <span className="block text-3xl md:text-4xl font-light mt-2">Brand & Performance Expert</span>
            </h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
              I am a Brand Strategist, Fractional CMO and leadership coach with more than 15 years of experience working with global brands, fast-scaling start-ups and executive teams.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
              My work sits at the intersection of leadership, psychology and strategy. I speak about power, perception, performance and the invisible dynamics that shape how women experience authority across workplaces, communities and society at large.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
              After building and scaling businesses, advising leadership teams and navigating my own experience of burnout, I became deeply committed to one central question:
            </p>
            <p className="font-serif italic text-xl text-foreground">
              How do we build success that is powerful, sustainable and human?
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://laurajanethomas.biz/wp-content/uploads/2026/02/C39D33B6-CEBB-4963-9550-4913F3A54680-1024x997.png" alt="Laura speaking" className="w-full h-full object-cover" />
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
                where <span className="italic block">I speak</span>
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
            Keynote <span className="italic">Topics</span>
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
                The Aligned <span className="italic block">Woman Podcast</span>
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

      <BlogPreview />
      <TestimonialsSection />
      <CtaBanner headline={<>Book me<br /><span className="italic">to speak</span></>} cta="Book Me To Speak" href="/contact" />
      <Footer />
    </div>
  );
}