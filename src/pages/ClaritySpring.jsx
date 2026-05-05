import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] },
});

const testimonials = [
  {
    quote: "Laura helped me identify my real values and drivers; provided thought-provoking insight; posed the right questions; and offered support on practical solutions. She respected the complexity of my relationships, which encouraged me to stop minimising my own wants and needs. This was a key turning point.",
    author: "Susan",
  },
  {
    quote: "I was in a confused state before I started. She helped immediately with clarity, perspective and belief. Her support has been extremely positive where I've built a successful business.",
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

export default function ClaritySpring() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div className="bg-ivory text-foreground">
      {/* Logo at top */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center">
          <a href="https://laurajanethomas.biz" target="_blank" rel="noopener noreferrer" className="flex flex-col leading-none hover:opacity-80 transition-opacity">
            <span className="font-serif text-lg md:text-xl tracking-tight text-foreground">
              laura<span className="italic">jane</span>thomas
            </span>
          </a>
        </div>
      </div>

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
              className="font-serif italic text-xl md:text-2xl text-ivory/85 mb-12"
            >
              4 weeks. 4 strategic coaching calls. 1 clear direction forward — so you can stop spinning and start moving.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-ivory text-oxblood px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory/90 transition-all font-semibold btn-pulse"
              >
                Book Your Clarity Sprint — R12,500
              </Link>
              <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mt-6">
                Only 3 spots available. Online only. Starts within 7 days of booking.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeUp(0)} className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight mb-12">
              Let's be honest about where you are right now.
            </motion.h2>
            <motion.div {...fadeUp(0.1)} className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                You wake up and the first thing you feel isn't excitement. It's heaviness. You've built something. A career. A business. A life that looks good from the outside. But inside? You're running on empty. You're making decisions from a place of exhaustion, not clarity. And the question that keeps circling your mind at 2am is always the same: 'What am I actually doing with my life?'
              </p>
              <p>
                Maybe your business has stalled and you can't figure out why. Maybe you're stuck in a role that's slowly draining you. Maybe you've been so busy holding everything together for everyone else that you've completely lost sight of what YOU want.
              </p>
              <p>
                You've Googled. You've journaled. You've had the wine-fuelled conversations with friends who mean well but can't give you what you actually need. And you're still stuck.
              </p>
              <p className="text-foreground font-semibold text-[16px]">
                Here's what nobody tells you: Being stuck isn't a mindset problem. It's a strategy problem. You don't need more inspiration. You need someone who's been where you are, who understands the real pressure you're under, and who can help you think clearly enough to make your next move.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="bg-oxblood text-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeUp(0)} className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight mb-12">
              I know what 'stuck' feels like. I lived it.
            </motion.h2>
            <motion.div {...fadeUp(0.1)} className="space-y-6 text-[15px] leading-relaxed text-ivory/85">
              <p>
                At 33, I was on top of the world. I'd built and run a successful marketing agency for over a decade. I was consulting for global brands, travelling internationally, chairing organisations, and hitting goals I once thought were impossible. By 36, I was in full-blown burnout. Hormones depleted. Cortisol through the floor. My nervous system was constantly on alert. My doctor couldn't understand how I was still functioning. On paper, I was thriving. Behind the scenes, my exhaustion was exhausted.
              </p>
              <p>
                So I shut everything down. I spent a year and thousands of rands on doctors, therapists, functional medicine specialists, and nervous system work. I studied stress physiology, hormonal health, and identity formation. And I rebuilt — not just my health, but my entire understanding of what it means to succeed without self-destructing.
              </p>
              <p>
                That journey became The Aligned Woman Co and the Alive Method. I'm Laura Jane Thomas. PCC-certified coach. Former agency owner. Brand strategist. Speaker. And someone who had to learn the hard way that willpower alone will eventually break you.
              </p>
              <p>
                Now I help women like you find clarity, build a real plan, and move forward — without burning out in the process.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OFFER SECTION */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.h2 {...fadeUp(0)} className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
              Introducing The Clarity Sprint
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="font-serif italic text-2xl text-muted-foreground mb-8">
              4 weeks to get unstuck, find your direction, and build a 90-day plan you can actually execute.
            </motion.p>
            <motion.p {...fadeUp(0.2)} className="text-[15px] leading-relaxed text-muted-foreground">
              This isn't therapy. It isn't a course you'll never finish. And it's not another group programme where you sit on mute while someone talks at you. The Clarity Sprint is 4 weeks of focused, private, 1-on-1 coaching with me.
            </motion.p>
          </div>

          {/* STACK CARDS */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              {
                week: "WEEK 1: THE AUDIT",
                value: "R5,000",
                desc: "90-minute deep-dive call. We pull everything apart. Where you are right now. What's actually working. What's draining you. What you've been avoiding. This is a structured, strategic audit of your entire situation.",
              },
              {
                week: "WEEK 2: THE UNCOVER",
                value: "R3,000",
                desc: "60-minute call. We recalibrate your values. We identify where your life and business have drifted out of alignment. We name what you actually want — not what you think you should want.",
              },
              {
                week: "WEEK 3: THE STRATEGY",
                value: "R3,000",
                desc: "60-minute call. We map out 2-3 realistic paths forward. We stress-test each one. We choose the direction and turn it into a 90-day action plan. Real steps. Real timelines.",
              },
              {
                week: "WEEK 4: THE MOMENTUM",
                value: "R3,000",
                desc: "60-minute call. The plan meets reality. We refine, troubleshoot, and set your 90-day priorities. You walk away with absolute clarity on your next chapter.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="bg-foreground/5 border border-foreground/15 rounded-lg p-8 md:p-10"
              >
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-3">{item.week}</p>
                <p className="text-3xl md:text-4xl font-serif text-oxblood font-bold mb-6">{item.value}</p>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp(0.4)} className="text-center text-[15px] text-muted-foreground max-w-2xl mx-auto mb-20">
            But I didn't stop there. I wanted to make sure every woman who joins The Clarity Sprint has everything she needs — not just during our 4 weeks, but for the months that follow.
          </motion.p>

          {/* BONUS CARDS */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "The Unstuck Workbook",
                value: "R2,500",
                desc: "A beautifully designed digital workbook with pre-call reflection prompts, values mapping exercises, energy audit template, decision-making framework, and the Life and Business Alignment Scorecard. You receive this the moment you book.",
              },
              {
                title: "The 90-Day Momentum Planner",
                value: "R1,500",
                desc: "A structured digital planner that breaks your 90-day strategy into weekly focus areas, daily priorities, and progress checkpoints with a built-in accountability tracker and Wins Log.",
              },
              {
                title: "The Aligned Woman Blueprint",
                value: "R12,000+",
                desc: "My signature educational programme built on the Alive Method. When it launches, Clarity Sprint clients get full access first. Free. Before it goes public. The full programme value is over R116,000.",
              },
            ].map((bonus, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="bg-oxblood text-ivory rounded-lg p-8 md:p-10 relative"
              >
                <div className="absolute top-4 right-4 bg-ivory text-oxblood px-3 py-1 rounded-full text-[9px] font-bold tracking-editorial uppercase">
                  FREE
                </div>
                <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-3">BONUS</p>
                <p className="font-serif text-xl md:text-2xl font-bold mb-3 pr-12">{bonus.title}</p>
                <p className="text-sm text-ivory/70 line-through mb-4">Value: {bonus.value}</p>
                <p className="text-sm leading-relaxed text-ivory/85">{bonus.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE REVEAL SECTION */}
      <section className="bg-oxblood text-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeUp(0)} className="space-y-8 mb-12">
              <table className="w-full text-left text-[15px] mb-12">
                <tbody className="divide-y divide-ivory/20">
                  <tr className="border-t border-ivory/20">
                    <td className="py-3">1x 90-Min Deep Dive Audit Call</td>
                    <td className="text-right font-semibold">R5,000</td>
                  </tr>
                  <tr>
                    <td className="py-3">3x 60-Min Strategic Coaching Calls</td>
                    <td className="text-right font-semibold">R9,000</td>
                  </tr>
                  <tr>
                    <td className="py-3">The Unstuck Workbook</td>
                    <td className="text-right font-semibold">R2,500</td>
                  </tr>
                  <tr>
                    <td className="py-3">90-Day Momentum Planner</td>
                    <td className="text-right font-semibold">R1,500</td>
                  </tr>
                  <tr>
                    <td className="py-3">Aligned Woman Blueprint</td>
                    <td className="text-right font-semibold">R12,000+</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-serif text-xl">Total Value</td>
                    <td className="text-right font-serif text-xl font-bold">R30,000+</td>
                  </tr>
                </tbody>
              </table>

              <p className="font-serif text-3xl md:text-4xl leading-tight mb-6">
                But you're not paying R30,000. You're not even paying R20,000.
              </p>
              <p className="font-serif text-6xl md:text-7xl leading-tight font-bold mb-8">
                Your investment: R12,500
              </p>
              <p className="text-lg text-ivory/85">
                That's less than R3,200 per week for a month that could change the entire direction of your life.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-ivory text-oxblood px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory/90 transition-all font-semibold btn-pulse"
              >
                Yes, I'm Ready — Book My Clarity Sprint
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IF ALL THIS DID SECTION */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeUp(0)} className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight mb-12">
              Think about it this way.
            </motion.h2>
            <motion.div {...fadeUp(0.1)} className="space-y-8 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                If The Clarity Sprint only helped you finally stop going in circles and make one clear decision about your next move — would it be worth R12,500?
              </p>
              <p>
                If it only gave you a 90-day plan so you could wake up on Monday knowing exactly what to focus on — would it be worth R12,500?
              </p>
              <p>
                If it only helped you stop building towards someone else's version of success — would it be worth R12,500?
              </p>
              <p className="text-foreground font-semibold text-lg">
                It does all of that. And more.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-foreground/5 py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.h2 {...fadeUp(0)} className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-16 text-center">
            Common Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.05)}
                className="bg-ivory border border-foreground/15 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 hover:bg-foreground/5 transition-colors"
                >
                  <p className="font-semibold text-foreground text-left">{faq.q}</p>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 ml-4 transition-transform"
                    style={{ transform: expandedFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: expandedFaq === i ? "300px" : "0" }}
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.h2 {...fadeUp(0)} className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-16 text-center">
            What women are saying
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="bg-foreground/5 border border-foreground/15 rounded-lg p-8 md:p-10"
              >
                <p className="font-serif italic text-lg leading-relaxed text-foreground mb-6">
                  "{t.quote}"
                </p>
                <p className="text-sm font-semibold text-muted-foreground">— {t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR SECTION */}
      <section className="bg-oxblood text-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeUp(0)} className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-12">
              Who this is for
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div {...fadeUp(0.1)}>
                <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-6 font-semibold">For you if you are:</p>
                <ul className="space-y-4 text-[15px] leading-relaxed text-ivory/85">
                  <li>• Stuck in life or business and done waiting</li>
                  <li>• Achieved a lot but something feels off</li>
                  <li>• Exhausted from overthinking</li>
                  <li>• Want strategic direction, not just emotional support</li>
                  <li>• Ready to be honest</li>
                  <li>• Can commit to 4 calls over 4 weeks</li>
                </ul>
              </motion.div>
              <motion.div {...fadeUp(0.2)}>
                <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-6 font-semibold">Not for you if you:</p>
                <ul className="space-y-4 text-[15px] leading-relaxed text-ivory/85">
                  <li>• Want someone to tell you what to do</li>
                  <li>• Not willing to be challenged</li>
                  <li>• Want a quick fix</li>
                  <li>• Are in a mental health crisis</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 {...fadeUp(0)} className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight mb-8">
              You already know something needs to change.
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="text-[15px] leading-relaxed text-muted-foreground mb-12">
              You've known for a while. Maybe months. Maybe longer. The question isn't whether you need to make a move. The question is how much longer you're willing to wait. I'm only taking 3 women for this round. Once those spots are filled, the next intake won't open until I've finished working with this group.
            </motion.p>
            <motion.div {...fadeUp(0.2)} className="mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-oxblood text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood/90 transition-all font-semibold btn-pulse"
              >
                I'm Ready. Book My Clarity Sprint — R12,500
              </Link>
            </motion.div>
            <motion.p {...fadeUp(0.3)} className="text-[14px] text-muted-foreground">
              Questions? Email <a href="mailto:hello@laurajanethomas.biz" className="border-b border-foreground hover:text-foreground transition-colors">hello@laurajanethomas.biz</a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* PS SECTION */}
      <section className="bg-foreground/5 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-8 text-[15px] leading-relaxed text-muted-foreground text-center">
            <motion.div {...fadeUp(0)}>
              <p className="font-semibold text-foreground mb-3">P.S.</p>
              <p>
                If you've read this far, you're not 'just browsing.' Something on this page spoke to you. That's your gut telling you what your head is still debating. Trust it.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.1)}>
              <p className="font-semibold text-foreground mb-3">P.P.S.</p>
              <p>
                Remember — you're getting over R30,000 in value for R12,500. But only for the first 3 women who book.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}