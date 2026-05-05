import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Check, X, Gift, Quote, ChevronRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] },
});

const testimonials = [
  {
    quote: "Laura helped me identify my real values and drivers; provided thought-provoking insight; posed the right questions; and offered support on practical solutions.",
    author: "Susan",
  },
  {
    quote: "I was in a confused state before I started. She helped immediately with clarity, perspective and belief. Her support has been extremely positive.",
    author: "Coaching client",
  },
  {
    quote: "Laura pushed me to dig deep and that provoked a better understanding of what I wanted. Very professional, very polished and genuinely creative.",
    author: "Sarah Arnot",
  },
  {
    quote: "The process was stimulating, engaging, challenging and fun. Laura is great at encouraging you to shoot for the stars. Best decision I've made.",
    author: "Career client",
  },
];

const faqs = [
  {
    q: "I can't afford R12,500 right now",
    a: "What is staying stuck costing you? Another 6 months of indecision. Another year in a business or role that's slowly suffocating you. R12,500 is less than most women spend on a single overseas trip or a designer bag. This is an investment in the direction of your entire life.",
  },
  {
    q: "I've tried coaching before and it didn't work",
    a: "Most coaching is too vague. I'm a strategist first. I bring a decade of agency experience and real business acumen. We don't just talk about feelings — we build a plan.",
  },
  {
    q: "I don't even know what I want",
    a: "That's literally the point. You don't need to arrive with answers. I'll bring the framework and structure. You bring the courage to be honest. By Week 3, you'll have clarity you haven't felt in years.",
  },
  {
    q: "I'm too busy for weekly calls",
    a: "An hour a week for four weeks is nothing compared to the months you've spent going in circles. We schedule around your life. Online. No commute.",
  },
  {
    q: "What if it doesn't work?",
    a: "Every woman I've worked with has walked away with more clarity than she came in with. If after our first deep dive you feel this isn't right, we'll talk about it honestly.",
  },
];

const weeks = [
  {
    num: "01",
    title: "THE AUDIT",
    duration: "90 minutes",
    desc: "A deep-dive call where we pull everything apart — what's working, what's draining you, what you've been avoiding.",
  },
  {
    num: "02",
    title: "THE UNCOVER",
    duration: "60 minutes",
    desc: "We recalibrate your values and identify where your life has drifted out of alignment. We name what you actually want.",
  },
  {
    num: "03",
    title: "THE STRATEGY",
    duration: "60 minutes",
    desc: "We map out realistic paths forward, stress-test each one, and turn it into a 90-day action plan with real steps.",
  },
  {
    num: "04",
    title: "THE MOMENTUM",
    duration: "60 minutes",
    desc: "The plan meets reality. We refine, troubleshoot, and set your 90-day priorities. You walk away with absolute clarity.",
  },
];

const bonuses = [
  {
    title: "The Unstuck Workbook",
    value: "R2,500",
    desc: "A beautifully designed digital workbook with pre-call reflection prompts, values mapping exercises, energy audit template, and the Life and Business Alignment Scorecard.",
  },
  {
    title: "The 90-Day Momentum Planner",
    value: "R1,500",
    desc: "A structured digital planner that breaks your 90-day strategy into weekly focus areas, daily priorities, and progress checkpoints.",
  },
  {
    title: "The Aligned Woman Blueprint",
    value: "R12,000+",
    desc: "My signature educational programme built on the Alive Method. Full access when it launches. Value over R116,000.",
  },
];

export default function ClaritySpring() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowFloatingCta(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-ivory text-foreground">
      {/* Logo at top */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-foreground/10 h-16 flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <a href="https://laurajanethomas.biz" target="_blank" rel="noopener noreferrer" className="flex flex-col leading-none hover:opacity-80 transition-opacity">
            <span className="font-serif text-lg md:text-xl tracking-tight text-foreground">
              laura<span className="italic">jane</span>thomas
            </span>
          </a>
        </div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showFloatingCta ? 1 : 0, y: showFloatingCta ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-6 right-6 z-30 ${showFloatingCta ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <Link
          to="/contact"
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition-all"
        >
          Book Now <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative bg-oxblood text-ivory pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-6">
              For the South African woman who's done everything 'right' and still feels completely lost
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8"
            >
              You Don't Need Another Motivational Quote. You Need a Plan.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif italic text-xl md:text-2xl text-ivory/85 mb-8"
            >
              4 weeks. 4 strategic coaching calls.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-lg md:text-xl text-ivory/75 mb-12"
            >
              1 clear direction forward — so you can stop spinning and start moving.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-[11px] tracking-editorial uppercase font-semibold transition-all shadow-lg"
              >
                Book Your Clarity Sprint
              </Link>
              <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mt-8">
                Only 3 spots available. Online only. Starts within 7 days of booking.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeUp(0)} className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-12">
              Let's be honest about where you are right now.
            </motion.h2>
            <motion.div {...fadeUp(0.1)} className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
              <p>You wake up and the first thing you feel isn't excitement. It's heaviness.</p>
              
              <p>You've built something. A career. A business. A life that looks good from the outside. But inside? You're running on empty.</p>

              <motion.div className="bg-oxblood/10 border-l-4 border-oxblood p-6 my-8">
                <p className="font-serif text-xl text-oxblood italic">
                  "What am I actually doing with my life?"
                </p>
              </motion.div>

              <p>You've Googled. You've journaled. You've had the wine-fuelled conversations with friends who mean well but can't give you what you actually need. And you're still stuck.</p>

              <p className="text-lg font-semibold text-foreground pt-4">
                Being stuck isn't a mindset problem. It's a strategy problem.
              </p>

              <p>You don't need more inspiration. You need someone who's been where you are, who understands the real pressure you're under, and who can help you think clearly enough to make your next move.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="bg-oxblood text-ivory py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1 }}
              className="aspect-[3/4] bg-ivory/10 rounded-lg overflow-hidden flex items-center justify-center"
            >
              <div className="text-center text-ivory/30">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-sm">Laura's Portrait</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight">
                I know what 'stuck' feels like.
              </h2>

              <p className="text-ivory/85 text-[15px] leading-relaxed">
                At 33, I was on top of the world. I'd built and run a successful marketing agency for over a decade. I was consulting for global brands, travelling internationally, chairing organisations.
              </p>

              <p className="text-ivory/85 text-[15px] leading-relaxed">
                By 36, I was in full-blown burnout. My nervous system was constantly on alert. On paper, I was thriving. Behind the scenes, I was completely depleted.
              </p>

              <p className="text-ivory/85 text-[15px] leading-relaxed">
                So I shut everything down. I spent a year on doctors, therapists, functional medicine, and nervous system work. And I rebuilt — not just my health, but my entire understanding of what success means.
              </p>

              <p className="text-ivory/85 text-[15px] leading-relaxed">
                That journey became The Aligned Woman Co and the Alive Method. PCC-certified coach. Former agency owner. And someone who learned that willpower alone will eventually break you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA after story */}
      <section className="bg-oxblood text-ivory py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div {...fadeUp(0)}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-ivory/40 text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all font-semibold"
            >
              I'm Ready For Clarity
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OFFER INTRO */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 {...fadeUp(0)} className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-6">
              The Clarity Sprint
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="font-serif italic text-2xl text-muted-foreground mb-8">
              4 weeks to get unstuck and find your direction.
            </motion.p>
            <motion.p {...fadeUp(0.2)} className="text-[15px] leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              This isn't therapy. It's not a course you'll never finish. And it's not another group programme where you sit on mute. The Clarity Sprint is 4 weeks of focused, private, 1-on-1 coaching with me.
            </motion.p>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="bg-foreground/5 py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.h3 {...fadeUp(0)} className="font-serif text-3xl md:text-4xl text-center mb-16">
            What happens in 4 weeks
          </motion.h3>
          
          <div className="max-w-3xl mx-auto">
            {weeks.map((week, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="relative mb-12 md:mb-16 last:mb-0"
              >
                {/* Connector line */}
                {i < weeks.length - 1 && (
                  <div className="absolute left-8 md:left-16 top-24 w-1 h-12 md:h-20 bg-gradient-to-b from-oxblood to-transparent"></div>
                )}

                <div className="flex gap-6 md:gap-12">
                  {/* Week number circle */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-oxblood text-ivory flex items-center justify-center">
                      <span className="font-serif text-2xl md:text-3xl font-bold">{week.num}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">{week.duration}</p>
                    <h4 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">{week.title}</h4>
                    <p className="text-[15px] leading-relaxed text-muted-foreground">{week.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA after weeks */}
      <section className="bg-foreground/5 py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div {...fadeUp(0)}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-oxblood text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood/90 transition-all font-semibold"
            >
              See The Full Package
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BONUS SECTION */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.h2 {...fadeUp(0)} className="font-serif text-3xl md:text-4xl text-center mb-12">
            Plus, you get these bonuses
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {bonuses.map((bonus, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="relative bg-gradient-to-br from-oxblood to-oxblood/80 text-ivory rounded-lg p-8 md:p-10 overflow-hidden"
              >
                {/* FREE Badge */}
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-[9px] font-bold tracking-editorial uppercase flex items-center gap-1">
                  <Gift className="w-3 h-3" /> FREE
                </div>

                <p className="font-serif text-xl md:text-2xl font-bold mb-4 pr-12">{bonus.title}</p>
                
                <p className="text-sm text-ivory/60 line-through mb-4">
                  Value: {bonus.value}
                </p>
                
                <p className="text-[15px] leading-relaxed text-ivory/90">{bonus.desc}</p>

                {/* Checkmark */}
                <div className="mt-6 flex items-center gap-2 text-amber-400">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-semibold">Included</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE SECTION */}
      <section className="bg-oxblood text-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Value Stack */}
            <motion.div {...fadeUp(0)} className="bg-ivory/10 rounded-lg p-8 md:p-12 mb-16 backdrop-blur-sm">
              <table className="w-full text-left text-[15px] space-y-3">
                <tbody>
                  <tr className="border-b border-ivory/20">
                    <td className="py-4 flex items-center gap-3">
                      <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span>1x 90-Min Deep Dive Audit Call</span>
                    </td>
                    <td className="text-right font-semibold">R5,000</td>
                  </tr>
                  <tr className="border-b border-ivory/20">
                    <td className="py-4 flex items-center gap-3">
                      <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span>3x 60-Min Strategic Coaching Calls</span>
                    </td>
                    <td className="text-right font-semibold">R9,000</td>
                  </tr>
                  <tr className="border-b border-ivory/20">
                    <td className="py-4 flex items-center gap-3">
                      <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span>The Unstuck Workbook</span>
                    </td>
                    <td className="text-right font-semibold">R2,500</td>
                  </tr>
                  <tr className="border-b border-ivory/20">
                    <td className="py-4 flex items-center gap-3">
                      <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span>90-Day Momentum Planner</span>
                    </td>
                    <td className="text-right font-semibold">R1,500</td>
                  </tr>
                  <tr>
                    <td className="py-4 flex items-center gap-3">
                      <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span>Aligned Woman Blueprint</span>
                    </td>
                    <td className="text-right font-semibold">R12,000+</td>
                  </tr>
                  <tr className="border-t-2 border-amber-400">
                    <td className="py-4 font-serif text-lg">Total Value</td>
                    <td className="text-right font-serif text-2xl font-bold text-amber-400">R30,000+</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>

            {/* Price reveal */}
            <motion.div {...fadeUp(0.1)} className="text-center space-y-6">
              <p className="text-xl md:text-2xl text-ivory/80">
                But you're not paying R30,000.<br />
                <span className="text-amber-400 font-semibold">You're not even paying R20,000.</span>
              </p>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-8"
              >
                <div className="absolute inset-0 bg-amber-600/20 blur-3xl rounded-full"></div>
                <p className="font-serif text-7xl md:text-8xl font-bold relative">
                  R12,500
                </p>
              </motion.div>

              <p className="text-lg text-ivory/85">
                That's less than R3,200 per week for a month that could change the entire direction of your life.
              </p>

              <motion.div {...fadeUp(0.2)} className="pt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 text-[12px] tracking-editorial uppercase font-semibold transition-all shadow-xl"
                >
                  Yes, I'm Ready — Book My Clarity Sprint
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeUp(0)} className="font-serif text-3xl md:text-4xl leading-[0.95] tracking-tight mb-12">
              Think about it this way.
            </motion.h2>
            
            <motion.div {...fadeUp(0.1)} className="space-y-8">
              <div className="border-l-4 border-oxblood pl-6 py-4">
                <p className="text-lg font-semibold text-foreground mb-2">
                  If it only helped you stop going in circles
                </p>
                <p className="text-muted-foreground">Would it be worth R12,500?</p>
              </div>

              <div className="border-l-4 border-oxblood pl-6 py-4">
                <p className="text-lg font-semibold text-foreground mb-2">
                  If it only gave you a 90-day plan
                </p>
                <p className="text-muted-foreground">So you know exactly what to focus on Monday morning — would it be worth R12,500?</p>
              </div>

              <div className="border-l-4 border-oxblood pl-6 py-4">
                <p className="text-lg font-semibold text-foreground mb-2">
                  If it only helped you stop building towards someone else's version of success
                </p>
                <p className="text-muted-foreground">Would it be worth R12,500?</p>
              </div>

              <p className="text-xl font-serif italic text-oxblood pt-6">
                It does all of that. And more.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-oxblood/5 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.h2 {...fadeUp(0)} className="font-serif text-3xl md:text-4xl text-center mb-16">
            What women are saying
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="bg-ivory rounded-lg p-8 md:p-10 relative"
              >
                <Quote className="w-10 h-10 text-oxblood/20 mb-4" />
                <p className="font-serif italic text-lg leading-relaxed text-foreground mb-6">
                  "{t.quote}"
                </p>
                <p className="text-sm font-semibold text-muted-foreground">— {t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.h2 {...fadeUp(0)} className="font-serif text-3xl md:text-4xl text-center mb-16">
            Common Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.05)}
                className="bg-foreground/5 border border-foreground/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 hover:bg-foreground/10 transition-colors"
                >
                  <p className="font-semibold text-foreground text-left">{faq.q}</p>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 ml-4 transition-transform text-oxblood"
                    style={{ transform: expandedFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: expandedFaq === i ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="bg-oxblood text-ivory py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.h2 {...fadeUp(0)} className="font-serif text-3xl md:text-4xl text-center mb-16">
            Is this for you?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            <motion.div {...fadeUp(0.1)}>
              <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-8 font-semibold">For you if:</p>
              <ul className="space-y-4">
                {[
                  "Stuck in life or business",
                  "Achieved a lot but something feels off",
                  "Exhausted from overthinking",
                  "Want strategic direction, not just talks",
                  "Ready to be honest",
                  "Can commit to 4 calls",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.2)}>
              <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-8 font-semibold">Not for you if:</p>
              <ul className="space-y-4">
                {[
                  "Want someone to tell you what to do",
                  "Not willing to be challenged",
                  "Looking for a quick fix",
                  "In a mental health crisis",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-[1400klasse] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 {...fadeUp(0)} className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight mb-8">
              You already know something needs to change.
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="text-[15px] leading-relaxed text-muted-foreground mb-12">
              You've known for a while. Maybe months. Maybe longer. The question isn't whether you need to make a move — it's how much longer you're willing to wait.
            </motion.p>
            <motion.p {...fadeUp(0.2)} className="text-[15px] text-oxblood font-semibold mb-12">
              I'm only taking 3 women for this round. Once those spots are filled, the next intake won't open until this group is complete.
            </motion.p>
            <motion.div {...fadeUp(0.3)} className="mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-oxblood text-ivory px-10 py-5 text-[12px] tracking-editorial uppercase hover:bg-oxblood/90 transition-all font-semibold shadow-lg"
              >
                I'm Ready. Book My Clarity Sprint — R12,500
              </Link>
            </motion.div>
            <motion.p {...fadeUp(0.4)} className="text-[14px] text-muted-foreground">
              Questions? Email <a href="mailto:hello@laurajanethomas.biz" className="font-semibold hover:text-oxblood transition-colors">hello@laurajanethomas.biz</a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* PS SECTION */}
      <section className="bg-foreground/5 py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-6 text-[14px] leading-relaxed text-muted-foreground text-center">
            <motion.div {...fadeUp(0)}>
              <p className="font-serif italic text-foreground mb-2">
                "If you've read this far, you're not 'just browsing.' Something on this page spoke to you. That's your gut telling you what your head is still debating."
              </p>
              <p className="font-semibold text-oxblood">Trust it.</p>
            </motion.div>
            <motion.div {...fadeUp(0.1)}>
              <p>
                You're getting over R30,000 in value for R12,500. But only for the first 3 women who book.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}