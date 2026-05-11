import React from "react";
import { motion } from "framer-motion";
import { BLUEPRINT_URL } from "./quizData";

const BURGUNDY = "#5C1F2E";
const CREAM = "#F5EDE0";
const DUSTY_ROSE = "#C2858B";

const RESULTS = {
  "The Clarity Sprint": {
    eyebrow: "Your Primary Path",
    headline: "You need clarity, fast.",
    body: `Your answers tell me you are stuck and ready for a structured plan, not a long engagement. You are starting something, building something, or repositioning what's next, and you need someone to help you think clearly enough to make your next move.

The Clarity Sprint is built for this exact moment. Four weeks. Four strategic coaching calls. One clear plan forward. You leave with a written diagnostic of where you actually are, a 30-day action plan calibrated to your capacity, a vision document, and one full year of access to The Aligned Woman Blueprint to keep the work alive long after we finish.`,
    ctaLabel: "Learn More About The Clarity Sprint",
    ctaHref: "https://laurajanethomas.biz/claritysprint",
    secondaryCtas: {
      "The Senior Advisory": {
        body: "After the Clarity Sprint, many women move into the Senior Advisory for sustained partnership through their next chapter. Your Sprint investment is credited toward any Senior Advisory engagement booked within 60 days.",
        label: "See The Senior Advisory",
        href: "https://laurajanethomas.biz/services",
      },
      "The Aligned Woman Blueprint": {
        body: "The Sprint includes one year of Blueprint access, but if you want to start the self-paced methodology immediately, the Blueprint is available now.",
        label: "Join The Blueprint",
        href: BLUEPRINT_URL,
      },
      _default: {
        body: "See all coaching options.",
        label: "See All Coaching Options",
        href: "https://laurajanethomas.biz/services",
      },
    },
  },
  "The Aligned Woman Blueprint": {
    eyebrow: "Your Primary Path",
    headline: "You want the methodology, in your own time.",
    body: `Your answers tell me you are ready to do this work but you are not yet ready for live coaching, or you want to integrate it into your life on your own terms.

The Aligned Woman Blueprint is built for this. The complete A.L.I.V.E. Method, the same methodology I run in my 1:1 work, structured as a self-paced course inside The Aligned Woman Co. Mind, body, and spirit work integrated with strategic clarity. Modules you move through at your own pace, with the option to do the work alongside the women you love.`,
    ctaLabel: "Join The Blueprint",
    ctaHref: BLUEPRINT_URL,
    secondaryCtas: {
      "The Clarity Sprint": {
        body: "Some women combine the Blueprint with the Clarity Sprint. The Sprint includes one year of Blueprint access and gives you live coaching alongside the methodology.",
        label: "See The Clarity Sprint",
        href: "https://laurajanethomas.biz/claritysprint",
      },
      "The Alignment Audit": {
        body: "The Blueprint runs alongside any 1:1 engagement and gives you the methodology to integrate between sessions.",
        label: "Explore 1:1 Coaching",
        href: "https://laurajanethomas.biz/services",
      },
      "The Recalibration Intensive": {
        body: "The Blueprint runs alongside any 1:1 engagement and gives you the methodology to integrate between sessions.",
        label: "Explore 1:1 Coaching",
        href: "https://laurajanethomas.biz/services",
      },
      "The Senior Advisory": {
        body: "The Blueprint runs alongside any 1:1 engagement and gives you the methodology to integrate between sessions.",
        label: "Explore 1:1 Coaching",
        href: "https://laurajanethomas.biz/services",
      },
      "Business Consulting": {
        body: "Explore Business Consulting.",
        label: "Explore Business Consulting",
        href: "https://laurajanethomas.biz/consulting",
      },
      _default: {
        body: "Explore the full coaching suite.",
        label: "Explore The Coaching Suite",
        href: "https://laurajanethomas.biz/services",
      },
    },
  },
  "The Alignment Audit": {
    eyebrow: "Your Primary Path",
    headline: "You need a senior diagnosis before you decide anything.",
    body: `Your answers tell me you are not sure exactly what is happening underneath your current situation, and you want a senior look before you commit to deeper work.

The Alignment Audit is built for this. A 60-minute structured diagnostic session where I look at where you actually are, identify the specific misalignments costing you, and give you a clear written diagnostic and a recommended path forward, delivered within 72 hours. This is the senior advisory equivalent of a strategic consultation. You leave knowing exactly what you are working with and what to do next, with no obligation to continue.`,
    ctaLabel: "Book The Alignment Audit",
    ctaHref: "https://laurajanethomas.biz/services",
    secondaryCtas: {
      "The Senior Advisory": {
        body: "Many women begin with the Audit and then continue into the Senior Advisory. Your Audit fee is credited toward the Advisory if you upgrade within 60 days, so this becomes the diagnostic phase of a longer journey.",
        label: "See The Senior Advisory",
        href: "https://laurajanethomas.biz/services",
      },
      "The Recalibration Intensive": {
        body: "Some women follow the Audit with a Recalibration Intensive for concentrated work on what the Audit reveals.",
        label: "See The Recalibration Intensive",
        href: "https://laurajanethomas.biz/services",
      },
      "The Clarity Sprint": {
        body: "If your situation calls for structured coaching over four weeks rather than a single diagnostic, the Clarity Sprint may be the better fit.",
        label: "See The Clarity Sprint",
        href: "https://laurajanethomas.biz/claritysprint",
      },
      _default: {
        body: "Explore all offers.",
        label: "See All Offers",
        href: "https://laurajanethomas.biz/services",
      },
    },
  },
  "The Recalibration Intensive": {
    eyebrow: "Your Primary Path",
    headline: "You need concentrated depth in one day.",
    body: `Your answers tell me you know what is not working, and you want to do focused work on it without committing to a long engagement.

The Recalibration Intensive is built for this. A one-day deep dive where we move through The A.L.I.V.E. Method together in concentrated form. Pre-intensive intake to make the day sharp, the full intensive itself, and follow-up integration support to embed what we work through. This is the right fit for the woman who knows the issue, is ready to move on it, and wants depth without a 90-day timeline.`,
    ctaLabel: "Book The Recalibration Intensive",
    ctaHref: "https://laurajanethomas.biz/services",
    secondaryCtas: {
      "The Senior Advisory": {
        body: "Some women begin with the Intensive and move into the Senior Advisory afterwards to sustain the work over 90 days. The Intensive can stand alone or become the launch point for a longer engagement.",
        label: "See The Senior Advisory",
        href: "https://laurajanethomas.biz/services",
      },
      "The Alignment Audit": {
        body: "If you want a diagnostic before committing to the full Intensive, the Alignment Audit gives you that look first.",
        label: "See The Alignment Audit",
        href: "https://laurajanethomas.biz/services",
      },
      "The Clarity Sprint": {
        body: "If you want structured work spread over four weeks instead of one concentrated day, the Clarity Sprint is the alternative.",
        label: "See The Clarity Sprint",
        href: "https://laurajanethomas.biz/claritysprint",
      },
      _default: {
        body: "Explore all offers.",
        label: "See All Offers",
        href: "https://laurajanethomas.biz/services",
      },
    },
  },
  "The Senior Advisory": {
    eyebrow: "Your Primary Path",
    headline: "You are at a threshold and you need senior partnership.",
    body: `Your answers tell me you are at a meaningful chapter transition, with resources and experience already behind you, and you need sustained senior partnership through what comes next.

The Senior Advisory is built for this. A 90-day private engagement designed for the ambitious woman building what's next. Whether that is leaving corporate, evolving a business already built, repositioning into a new chapter, or building the life that finally matches your resources. You get a senior diagnostic, two strategic sessions per month, the 90-day priority structure, the renegotiated standards document, the system renegotiation session, strategic async support, the forward roadmap session, and three seats inside The Aligned Woman Blueprint.`,
    ctaLabel: "Apply For The Senior Advisory",
    ctaHref: "https://laurajanethomas.biz/services",
    secondaryCtas: {
      "The Alignment Audit": {
        body: "If you want to test the working relationship before committing to 90 days, the Alignment Audit is the senior diagnostic that often precedes the Senior Advisory. Your Audit fee is credited toward the Advisory if you upgrade within 60 days.",
        label: "Start With The Alignment Audit",
        href: "https://laurajanethomas.biz/services",
      },
      "The Recalibration Intensive": {
        body: "The Intensive can be a one-day launch point into the longer engagement. Some clients book it first and continue into the Advisory afterwards.",
        label: "See The Recalibration Intensive",
        href: "https://laurajanethomas.biz/services",
      },
      "Business Consulting": {
        body: "If you are running a business alongside this personal chapter, the Senior Advisory can run in parallel with business consulting.",
        label: "Explore Business Consulting",
        href: "https://laurajanethomas.biz/consulting",
      },
      _default: {
        body: "Explore all offers.",
        label: "See All Offers",
        href: "https://laurajanethomas.biz/services",
      },
    },
  },
  "Business Consulting": {
    eyebrow: "Your Primary Path",
    headline: "This is strictly business. Time to suit up.",
    body: `Your answers tell me you are building or scaling a business and you need senior strategic and creative direction in one partner.

Business consulting is built for this. The strongest brands are built on the right foundations, not the loudest launch. Whether you are launching something new or scaling something already built, the question is the same. Is the foundation underneath strong enough to hold what comes next. The work covers brand foundation and build, brand and business review, marketing strategy, brand development and creative direction, content and communication frameworks, team alignment and leadership support, and a custom growth playbook calibrated to your business. For women founders who want the senior brain that sets the foundation up properly so they can launch into something built, and scale on something that holds.`,
    ctaLabel: "Inquire About Business Consulting",
    ctaHref: "https://laurajanethomas.biz/consulting",
    secondaryCtas: {
      "The Senior Advisory": {
        body: "Some women founders run both the personal work and the business work in parallel. If you want strategic partnership for both the company and the woman building it, the Senior Advisory can run alongside business consulting.",
        label: "See The Senior Advisory",
        href: "https://laurajanethomas.biz/services",
      },
      _default: {
        body: "If your work is also personal alongside the business focus, take a look at the coaching suite.",
        label: "See The Coaching Suite",
        href: "https://laurajanethomas.biz/services",
      },
    },
  },
};

export default function QuizResult({ primaryResult, secondaryResult, firstName, onPrimaryCtaClick, onSecondaryCtaClick, onDiscoveryClick }) {
  const result = RESULTS[primaryResult];
  if (!result) return null;

  const secondaryCta = secondaryResult
    ? result.secondaryCtas[secondaryResult] || result.secondaryCtas._default
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ backgroundColor: CREAM, minHeight: "100vh" }}
      className="flex flex-col items-center px-6 py-20"
    >
      <div className="w-full max-w-2xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-8"
          style={{ color: BURGUNDY, fontFamily: "'Inter', sans-serif" }}
        >
          {result.eyebrow}
        </motion.p>

        {firstName && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-[14px] mb-3"
            style={{ color: "rgba(26,10,14,0.5)", fontFamily: "'Inter', sans-serif" }}
          >
            {firstName}, based on your answers:
          </motion.p>
        )}

        {/* Primary result name */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3"
          style={{ color: DUSTY_ROSE, fontFamily: "'Inter', sans-serif" }}
        >
          {primaryResult}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif leading-[1.05] tracking-tight mb-8"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#1A0A0E",
          }}
        >
          {result.headline}
        </motion.h1>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mb-10"
        >
          {result.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-[15px] leading-relaxed mb-5"
              style={{ color: "rgba(26,10,14,0.7)", fontFamily: "'Inter', sans-serif" }}
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mb-16"
        >
          <a
            href={result.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrimaryCtaClick}
            className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: BURGUNDY,
              color: CREAM,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {result.ctaLabel}
            <span>&#8594;</span>
          </a>
        </motion.div>

        {/* Secondary result */}
        {secondaryResult && secondaryCta && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            <div style={{ height: "1px", backgroundColor: "rgba(92,31,46,0.15)", marginBottom: "2.5rem" }} />

            <p
              className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-5"
              style={{ color: DUSTY_ROSE, fontFamily: "'Inter', sans-serif" }}
            >
              Recommended Next Step
            </p>

            <p
              className="text-[11px] tracking-[0.18em] uppercase mb-3 font-medium"
              style={{ color: "rgba(26,10,14,0.45)", fontFamily: "'Inter', sans-serif" }}
            >
              {secondaryResult}
            </p>

            <p
              className="text-[14px] leading-relaxed mb-6"
              style={{ color: "rgba(26,10,14,0.6)", fontFamily: "'Inter', sans-serif" }}
            >
              {secondaryCta.body}
            </p>

            <a
              href={secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSecondaryCtaClick}
              className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:opacity-90 border"
              style={{
                backgroundColor: "transparent",
                color: DUSTY_ROSE,
                borderColor: DUSTY_ROSE,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {secondaryCta.label}
              <span>&#8594;</span>
            </a>
          </motion.div>
        )}

        {/* Universal footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(92,31,46,0.12)" }}
        >
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "rgba(26,10,14,0.35)", fontFamily: "'Inter', sans-serif" }}
          >
            Not quite right?
          </p>
          <a
            href="https://calendly.com/hello-alignedwomanco/30min?month=2026-05"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onDiscoveryClick}
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:opacity-70"
            style={{
              color: BURGUNDY,
              fontFamily: "'Inter', sans-serif",
              borderBottom: `1px solid ${BURGUNDY}`,
              paddingBottom: "2px",
            }}
          >
            Book a Free Discovery Call
            <span>&#8594;</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}