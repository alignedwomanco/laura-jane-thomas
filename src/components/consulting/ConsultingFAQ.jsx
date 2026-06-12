import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What exactly does a fractional CMO do?",
    a: "I own your marketing at a senior level, without you carrying a full-time executive salary. Strategy, positioning, and commercial direction, plus the structure to make them real. I am not an extra pair of hands producing more content. I am the senior head that decides what the hands should be doing, and why. It runs on a clear method: diagnose where growth is actually leaking, architect the strategy, then activate it with your team.",
  },
  {
    q: "Isn't \u201cfractional\u201d just a part-time version of the real thing?",
    a: "No. Fractional means full seniority on a defined commitment, not junior work or half attention. You get the experience of a chief marketing officer applied to the decisions that matter, for the period you actually need it. I take on only three founders a quarter, and never two in the same category, so the focus is real.",
  },
  {
    q: "How is this different from hiring a marketer or an agency?",
    a: "A marketer and an agency are hands. They execute. The problem most stuck businesses have is not a shortage of hands, it is that no one senior is deciding what those hands should do.\n\nI ran an agency for years, so I will tell you this from the inside. Agencies carry quotas to hit and serious overheads to cover, and that shapes the relationship far more than anyone admits. What you are usually buying is access to junior delivery, fronted by a senior name who won the pitch and is rarely in the room again. It is transactional by design. You brief, they produce, you hope it adds up.\n\nA fractional CMO is the opposite of transactional. I take control of the thinking, sit above the execution, and guide the business like a partner with a stake in the outcome, not a vendor filling a retainer. If you do need delivery hands, I will tell you exactly who to bring in or which agency to brief, and then I will make sure they are pointed at the right work. You get the senior judgement that normally only shows up for the pitch, actually doing the job.",
  },
  {
    q: "What will I actually get?",
    a: "That depends on the engagement, because a corporate team and a founder-led business need different things from me.\n\nIf you are a corporate or a larger team, the work is senior leadership held inside the business. A fractional or stand-in CMO, strategic direction that keeps the team from drifting back into busywork, revenue-aligned strategy, customer journey mapping, senior creative direction, and team integration that leaves your people more capable than they started. It ends with a custom growth playbook your team can run for the next twelve months without me in the room.\n\nIf you are a small or growing business, the work is about the foundation. Brand strategy and positioning built properly the first time, a senior brand and business review when you are not yet sure where the issue sits, a 12-month marketing strategy, creative direction, content and messaging frameworks, and the team support to keep it all alive after I step out. It also ends with a written growth playbook your team can run on their own.\n\nEither way, the deliverables are named and defined before we begin, so you always know exactly what lands on the table. None of it is vague advice.",
  },
  {
    q: "How do I know it's even a marketing problem and not something deeper?",
    a: "You don't yet, and that is the point of starting with a diagnostic rather than a contract. A senior audit exists to find the real cause. If the honest answer is that your problem sits in the product or the market rather than the marketing, I will tell you. I would rather lose the engagement than sell you the wrong fix.",
  },
  {
    q: "I've worked with consultants who delivered a beautiful strategy and then disappeared. How is this different?",
    a: "Fair, and common. A strategy nobody executes is theatre. My method does not end at the plan. The activate phase is where I stay in the room through execution, with a clear priority structure and a regular cadence with your team, so the strategy becomes operating reality rather than a document in a drive.",
  },
  {
    q: "Will you understand my industry?",
    a: "Strategy travels across categories better than people expect, because the structural problems rarely change. That said, I do not pretend to arrive an expert in your world. Every engagement starts with an immersion into your business, your customer, and your numbers before I recommend anything. And because I never work with two brands in the same category at once, your strategy stays yours alone.",
  },
  {
    q: "How will we know it's working?",
    a: "We agree on what matters and put measurement in place early, so progress is visible rather than felt. You will not be guessing whether the spend is working, and neither will I.",
  },
  {
    q: "How do I know you're the real thing and not another self-titled \u201cstrategist\u201d?",
    a: "Look at the work. The case studies and results on this page are here so you do not have to take credibility on faith. The first step is also deliberately contained, so you can see how I think before committing to anything larger.",
  },
  {
    q: "Our marketing is honestly a bit of a mess. Is that a dealbreaker?",
    a: "It is the norm, not the exception. Every business I open up looks like this underneath. The mess is exactly what the diagnostic is for, and everything we discuss is confidential. You are not being judged, you are being helped to see it clearly.",
  },
  {
    q: "What happens to my existing team or agency?",
    a: "They usually get better. I sit above them as the senior layer they have been missing, setting direction and standards rather than replacing anyone. Part of the work is aligning the people you already have around a strategy worth executing.",
  },
  {
    q: "What does it cost, and how do I know it's worth it?",
    a: "It depends on the engagement. There are three ways to work with me: a one-off consult or audit, bringing me in to lead your strategy for a defined period, or an ongoing partnership. Each is priced as a fixed fee against a clearly defined scope, agreed before we start. You know exactly what the work is and what it costs up front. No hourly meter, no open-ended retainer, no number that drifts.\n\nIf you start with an audit and then move into a larger engagement within sixty days, the audit fee is credited toward it. Pricing for the larger engagements is shared once we have established fit.\n\nThe honest frame: a stalled year usually costs far more than the work that ends it.",
  },
  {
    q: "I'm already stretched thin. How much of my time will this take?",
    a: "Less than doing it yourself, which is the entire point. It begins with a short intake and one conversation, and from there I carry the load. You stay the decision-maker. I take away the part where you are also the strategist, the project manager, and the person holding it together.",
  },
  {
    q: "Do I have to commit to a long contract?",
    a: "No. These are defined engagements with a clear beginning and end, built on a method, not open-ended retainers that bill against time. If we continue afterward, it is because the work earned it, not because you are locked in.",
  },
  {
    q: "How do I get my co-founder or board comfortable with this?",
    a: "The written diagnostic is built to be shared. It lays out the problem and the plan in plain commercial terms, so you have something concrete to put in front of the people whose buy-in you need, rather than asking them to trust a feeling.",
  },
  {
    q: "How do we start?",
    a: "With a senior audit, or a short call to see if it is the right fit. Book a call at laurajanethomas.biz",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-foreground/15">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-6 text-left group gap-6"
      >
        <span className="text-[15px] md:text-base leading-snug group-hover:italic transition-all">{q}</span>
        <span className="flex-shrink-0 mt-0.5">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-8">
              {a.split("\n\n").map((para, i) => (
                <p key={i} className="text-[14px] text-muted-foreground leading-relaxed mb-3 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConsultingFAQ() {
  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-10"
        >
          — Frequently Asked Questions
        </motion.p>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight">
              What you<br />want to <span className="italic">know</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {faqs.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}