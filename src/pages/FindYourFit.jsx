import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const CALENDLY_15MIN_LINK = "https://calendly.com/hello-laurajanethomas/15min";
const BUSINESS_SPRINT_LINK = "/claritysprint";

const questions = [
  {
    id: "q1",
    text: "Where is your business right now?",
    options: [
      { label: "A", text: "Still mostly an idea, or just getting it off the ground" },
      { label: "B", text: "Up and running, but growth has stalled or I have outgrown the original plan" },
      { label: "C", text: "Established, with a team, and the marketing is busy but not compounding" },
    ],
  },
  {
    id: "q2",
    text: "In one sentence, could you say why someone should choose you over everyone else doing something similar?",
    options: [
      { label: "A", text: "Yes, and it comes out the same every time I say it" },
      { label: "B", text: "Sort of, but it changes depending on who is asking" },
      { label: "C", text: "Honestly no, and that bothers me" },
    ],
  },
  {
    id: "q3",
    text: "What is most broken right now?",
    options: [
      { label: "A", text: "I am not clear on my positioning, my offer, or who it is really for" },
      { label: "B", text: "The foundations are there, but I cannot get consistent reach or growth" },
      { label: "C", text: "The strategy keeps drifting and nobody is holding it together" },
    ],
  },
  {
    id: "q4",
    text: "When growth slows down, what do you reach for first?",
    options: [
      { label: "A", text: "I post more, do more, push harder" },
      { label: "B", text: "I try a new tactic, a new channel, or a new tool" },
      { label: "C", text: "I stop and question whether the strategy underneath is still right" },
      { label: "D", text: "I keep going and hope it turns around" },
    ],
  },
  {
    id: "q5",
    text: "What kind of help are you actually after?",
    options: [
      { label: "A", text: "A focused, defined engagement that hands me a clear plan I can run" },
      { label: "B", text: "An ongoing strategic partner to guide the brand and marketing as I grow" },
      { label: "C", text: "A senior marketing leader inside the business, without a full-time hire" },
    ],
  },
];

const scoreMap = {
  q1: { A: "SPRINT", B: "ADVISORY", C: "CMO", weight: 2 },
  q3: { A: "SPRINT", B: "ADVISORY", C: "CMO", weight: 1 },
  q5: { A: "SPRINT", B: "ADVISORY", C: "CMO", weight: 1 },
};

function computeResult(answers) {
  const totals = { SPRINT: 0, ADVISORY: 0, CMO: 0 };
  for (const [qid, config] of Object.entries(scoreMap)) {
    const answer = answers[qid];
    if (answer && config[answer]) {
      totals[config[answer]] += config.weight;
    }
  }
  const priority = ["SPRINT", "ADVISORY", "CMO"];
  return priority.reduce((best, r) => (totals[r] > totals[best] ? r : best), "SPRINT");
}

const results = {
  SPRINT: {
    heading: "What your answers reveal",
    body: "At your stage the problem is almost never effort, it is clarity. You are not yet certain what you stand for or who it is really for, so everything downstream, the content, the offers, the selling, costs you more than it should. That is the fastest thing there is to fix.",
    subheading: "Your best fit: The Business Sprint.",
    recommendation: "Six weeks, four sessions, and you come out with your positioning, your offer, your message, and a 90-day plan you can run yourself. You do the building, I do the guiding. The fastest and most affordable way to get a senior strategic look at your business.",
    ctaLabel: "Book your 15-minute call",
    ctaLine: "15 minutes, no pitch. You will leave knowing your next move.",
    secondaryLabel: "See the full Business Sprint",
    secondaryLink: BUSINESS_SPRINT_LINK,
  },
  ADVISORY: {
    heading: "What your answers reveal",
    body: "Your answers point upstream. The foundations are there, but growth has stalled because the strategy holding it together has not kept pace with the business. If your instinct is to reach for more activity, that is the trap. More output will not fix a strategy problem. A clearer strategy will.",
    subheading: "Your best fit: An ongoing strategic partner.",
    recommendation: "Senior strategic support, scoped to what your business actually needs, holding the brand and marketing as you grow so you are not carrying all of it alone.",
    ctaLabel: "Book your 15-minute call",
    ctaLine: "15 minutes, no pitch, and we work out exactly what that looks like for you.",
    secondaryLabel: null,
    secondaryLink: null,
  },
  CMO: {
    heading: "What your answers reveal",
    body: "This is a familiar pattern in established businesses: plenty of activity, not enough compounding. When a capable team is busy but the numbers stay flat, the missing piece is almost always a single senior brain holding the strategy together, not more output from the people already at full stretch.",
    subheading: "Your best fit: A fractional CMO.",
    recommendation: "One senior brain holding brand, strategy, and revenue together, embedded in the business without the cost of a full-time hire. That is the work I do as a fractional and stand-in CMO.",
    ctaLabel: "Book your 15-minute call",
    ctaLine: "15 minutes, no pitch. You will leave knowing exactly where your growth is stuck.",
    secondaryLabel: null,
    secondaryLink: null,
  },
};

const variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function FindYourFit() {
  const [step, setStep] = useState(0); // 0-4 = questions, 5 = capture, 6 = result
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const totalQuestions = questions.length;
  const isQuestion = step < totalQuestions;
  const isCapture = step === totalQuestions;
  const isResult = step === totalQuestions + 1;

  function handleAnswer(label) {
    setSelected(label);
  }

  function handleNext() {
    if (selected === null) return;
    const qid = questions[step].id;
    setAnswers((prev) => ({ ...prev, [qid]: selected }));
    setSelected(null);
    setStep((s) => s + 1);
  }

  function handleBack() {
    if (step === 0) return;
    setSelected(null);
    if (isCapture) {
      setStep(totalQuestions - 1);
      const lastQ = questions[totalQuestions - 1].id;
      setSelected(answers[lastQ] || null);
    } else {
      setStep((s) => s - 1);
      const prevQ = questions[step - 1].id;
      setSelected(answers[prevQ] || null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const computed = computeResult(answers);
    setResult(computed);
    await base44.entities.QuizLead.create({
      name,
      email,
      q1: answers.q1 || "",
      q2: answers.q2 || "",
      q3: answers.q3 || "",
      q4: answers.q4 || "",
      q5: answers.q5 || "",
      result: computed,
      submittedAt: new Date().toISOString(),
    });
    setSubmitting(false);
    setStep(totalQuestions + 1);
  }

  const resultData = result ? results[result] : null;

  return (
    <div className="min-h-screen bg-[#F5EDE0] flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-2xl">

          {/* Progress bar — only during questions */}
          {isQuestion && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#5C1F2E]/50 font-sans">
                  Question {step + 1} of {totalQuestions}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#5C1F2E]/50 font-sans">
                  Find Your Fit
                </span>
              </div>
              <div className="h-px w-full bg-[#5C1F2E]/15">
                <div
                  className="h-px bg-[#5C1F2E] transition-all duration-500"
                  style={{ width: `${((step + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* Question screens */}
            {isQuestion && (
              <motion.div
                key={`q-${step}`}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-[#5C1F2E] mb-10">
                  {questions[step].text}
                </h2>
                <div className="flex flex-col gap-3">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(opt.label)}
                      className={`w-full text-left px-6 py-5 border transition-all duration-200 font-sans text-[15px] leading-relaxed ${
                        selected === opt.label
                          ? "border-[#5C1F2E] bg-[#5C1F2E] text-[#F5EDE0]"
                          : "border-[#5C1F2E]/25 bg-white/50 text-[#5C1F2E] hover:border-[#5C1F2E]/60 hover:bg-white/80"
                      }`}
                    >
                      <span className="font-serif italic text-[#C2858B] mr-3 text-base">{opt.label}.</span>
                      {opt.text}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-10">
                  {step > 0 ? (
                    <button
                      onClick={handleBack}
                      className="text-[11px] tracking-[0.18em] uppercase text-[#5C1F2E]/50 hover:text-[#5C1F2E] transition-colors font-sans"
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={handleNext}
                    disabled={selected === null}
                    className="inline-flex items-center gap-3 bg-[#5C1F2E] text-[#F5EDE0] px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-sans hover:bg-[#3d1420] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {step === totalQuestions - 1 ? "Continue" : "Next"}
                    <span className="inline-block">→</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Capture screen */}
            {isCapture && (
              <motion.div
                key="capture"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#5C1F2E]/50 font-sans mb-6">Almost there.</p>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-[#5C1F2E] mb-10">
                  Where should I send your diagnosis?
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#5C1F2E]/60 font-sans">Name</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border-b border-[#5C1F2E]/30 py-3 text-[#5C1F2E] placeholder-[#5C1F2E]/30 text-[15px] focus:outline-none focus:border-[#5C1F2E] transition-colors font-sans"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#5C1F2E]/60 font-sans">Email</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-b border-[#5C1F2E]/30 py-3 text-[#5C1F2E] placeholder-[#5C1F2E]/30 text-[15px] focus:outline-none focus:border-[#5C1F2E] transition-colors font-sans"
                      placeholder="your@email.com"
                    />
                  </div>
                  <p className="text-[13px] text-[#5C1F2E]/55 leading-relaxed font-sans">
                    I will show you what your answers reveal and your best-fit next step now, and send a short breakdown to keep. You can leave any time.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-[11px] tracking-[0.18em] uppercase text-[#5C1F2E]/50 hover:text-[#5C1F2E] transition-colors font-sans"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-3 bg-[#5C1F2E] text-[#F5EDE0] px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-sans hover:bg-[#3d1420] transition-all duration-200 disabled:opacity-50"
                    >
                      {submitting ? "Calculating..." : "See My Diagnosis"}
                      {!submitting && <span>→</span>}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Result screen */}
            {isResult && resultData && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C2858B] font-sans mb-6">
                  Your diagnosis
                </p>
                <h2 className="font-serif text-3xl md:text-4xl leading-[1.15] text-[#5C1F2E] mb-8">
                  {resultData.heading}
                </h2>
                <p className="text-[15px] text-[#5C1F2E]/75 leading-relaxed font-sans mb-10">
                  {resultData.body}
                </p>
                <div className="border-t border-[#5C1F2E]/15 pt-10 mb-10">
                  <p className="font-serif italic text-xl md:text-2xl text-[#5C1F2E] mb-5">
                    {resultData.subheading}
                  </p>
                  <p className="text-[15px] text-[#5C1F2E]/75 leading-relaxed font-sans">
                    {resultData.recommendation}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <a
                    href={CALENDLY_15MIN_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#5C1F2E] text-[#F5EDE0] px-8 py-5 text-[11px] tracking-[0.18em] uppercase font-sans hover:bg-[#3d1420] transition-all duration-200 self-start"
                  >
                    {resultData.ctaLabel}
                    <span>→</span>
                  </a>
                  <p className="text-[12px] text-[#5C1F2E]/50 font-sans">
                    {resultData.ctaLine}
                  </p>
                  {resultData.secondaryLabel && resultData.secondaryLink && (
                    <a
                      href={resultData.secondaryLink}
                      className="text-[11px] tracking-[0.18em] uppercase text-[#5C1F2E] underline underline-offset-4 font-sans hover:text-[#C2858B] transition-colors self-start mt-2"
                    >
                      {resultData.secondaryLabel}
                    </a>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}