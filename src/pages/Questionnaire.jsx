import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/site/NavbarMinimal";
import Footer from "@/components/site/FooterMinimal";

// ─── Design tokens ───────────────────────────────────────────────────────────
const ACCENT = "#4A3728"; // deep warm brown — consistent with brand

// ─── Section definitions ─────────────────────────────────────────────────────
const SECTIONS = [
  { id: 0, title: "Your Details", subtitle: "Let's start with who you are." },
  { id: 1, title: "Business Foundation", subtitle: "Start with what's real." },
  { id: 2, title: "Operations, Budget & Delivery", subtitle: "How we'll work together." },
  { id: 3, title: "Current Marketing Assets", subtitle: "What exists today." },
  { id: 4, title: "Audience Insight", subtitle: "Who you're really talking to." },
  { id: 5, title: "Positioning & Differentiation", subtitle: "What sets you apart." },
  { id: 6, title: "Brand Truth", subtitle: "Radical honesty." },
  { id: 7, title: "Brand Essence", subtitle: "The soul of your brand." },
  { id: 8, title: "Vision & Growth", subtitle: "Where you're heading." },
  { id: 9, title: "Legacy & Values", subtitle: "What will endure." },
];

const CORE_VALUES = ["Integrity", "Truth", "Growth", "Beauty", "Courage", "Simplicity", "Empowerment", "Connection"];

const ASSETS = [
  "Brand strategy document",
  "Brand guidelines",
  "Logo and visual identity",
  "Website",
  "Landing pages or sales pages",
  "Facebook page",
  "Instagram account",
  "LinkedIn page or profile",
  "TikTok account",
  "YouTube channel",
  "Email marketing platform",
  "Email database",
  "CRM system",
  "Paid advertising accounts",
  "Analytics or tracking tools",
  "Content library",
  "Case studies or testimonials",
  "Sales or pitch decks",
  "Product catalogue or service brochure",
];

// ─── Reusable field components ────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p className="text-[13px] tracking-wide uppercase font-medium mb-3" style={{ color: "rgba(20,20,20,0.55)", letterSpacing: "0.1em" }}>
      {children}
    </p>
  );
}

function Question({ number, children }) {
  return (
    <p className="font-serif text-xl md:text-2xl leading-[1.35] text-[#141414] mb-4">
      {number && <span className="text-sm font-sans mr-3" style={{ color: ACCENT, opacity: 0.7 }}>{number}.</span>}
      {children}
    </p>
  );
}

function LongText({ value, onChange, placeholder = "Your answer..." }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full resize-none bg-transparent border-b border-[#d0cac4] focus:border-[#141414] outline-none text-base leading-relaxed text-[#141414] placeholder:text-[#141414]/30 py-3 transition-colors duration-300 font-sans"
    />
  );
}

function ShortText({ value, onChange, placeholder = "Your answer..." }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-[#d0cac4] focus:border-[#141414] outline-none text-base text-[#141414] placeholder:text-[#141414]/30 py-3 transition-colors duration-300 font-sans"
    />
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 mt-1">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="px-5 py-2.5 text-sm border transition-all duration-200 font-sans"
          style={{
            borderColor: value === opt ? ACCENT : "#d0cac4",
            backgroundColor: value === opt ? ACCENT : "transparent",
            color: value === opt ? "white" : "#141414",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function MultiSelect({ options, value = [], onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(value.filter(v => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className="px-4 py-2 text-sm border transition-all duration-200 font-sans"
          style={{
            borderColor: value.includes(opt) ? ACCENT : "#d0cac4",
            backgroundColor: value.includes(opt) ? ACCENT : "transparent",
            color: value.includes(opt) ? "white" : "#141414",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function YesNoToggle({ value, onChange }) {
  return (
    <div className="flex gap-2 mt-1">
      {["Yes", "No"].map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="px-6 py-2 text-sm border transition-all duration-200 font-sans"
          style={{
            borderColor: value === opt ? ACCENT : "#d0cac4",
            backgroundColor: value === opt ? ACCENT : "transparent",
            color: value === opt ? "white" : "#141414",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function AssetRow({ label, value = {}, onChange }) {
  return (
    <div className="py-5 border-b border-[#ece8e3]">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
      <p className="font-sans text-base text-[#141414] flex-1 pt-1">{label}</p>
      <div className="flex-shrink-0">
        <YesNoToggle value={value.has} onChange={v => onChange({ ...value, has: v, detail: v === "No" ? "" : value.detail })} />
      </div>
    </div>
      <AnimatePresence>
        {value.has === "Yes" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              <ShortText
                value={value.detail || ""}
                onChange={v => onChange({ ...value, detail: v })}
                placeholder="Please provide link or details"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CoreValuesField({ value = [], custom = [], onChange, onCustomChange }) {
  const [newVal, setNewVal] = useState("");
  const addCustom = () => {
    if (newVal.trim() && !custom.includes(newVal.trim())) {
      onCustomChange([...custom, newVal.trim()]);
    }
    setNewVal("");
  };
  const toggleValue = (v) => {
    if (value.includes(v)) onChange(value.filter(x => x !== v));
    else onChange([...value, v]);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[...CORE_VALUES, ...custom].map(v => (
          <button
            key={v}
            type="button"
            onClick={() => toggleValue(v)}
            className="px-4 py-2 text-sm border transition-all duration-200 font-sans"
            style={{
              borderColor: value.includes(v) ? ACCENT : "#d0cac4",
              backgroundColor: value.includes(v) ? ACCENT : "transparent",
              color: value.includes(v) ? "white" : "#141414",
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={newVal}
          onChange={e => setNewVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCustom())}
          placeholder="Add your own value..."
          className="flex-1 bg-transparent border-b border-[#d0cac4] focus:border-[#141414] outline-none text-sm text-[#141414] placeholder:text-[#141414]/30 py-2 font-sans"
        />
        <button type="button" onClick={addCustom} className="text-sm px-3 py-2 border border-[#d0cac4] hover:border-[#141414] transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-12 h-px bg-[#ece8e3]" />;
}

function FieldBlock({ children }) {
  return <div className="mb-12">{children}</div>;
}

// ─── Section renderers ────────────────────────────────────────────────────────
function Section0({ data, set }) {
  return (
    <div>
      <FieldBlock>
        <Question>Full Name</Question>
        <ShortText value={data.fullName || ""} onChange={v => set({ ...data, fullName: v })} placeholder="Your full name" />
      </FieldBlock>
      <FieldBlock>
        <Question>Position / Title</Question>
        <ShortText value={data.position || ""} onChange={v => set({ ...data, position: v })} placeholder="e.g. Founder, CEO, Marketing Director" />
      </FieldBlock>
      <FieldBlock>
        <Question>Company Name</Question>
        <ShortText value={data.company || ""} onChange={v => set({ ...data, company: v })} placeholder="Your company or brand name" />
      </FieldBlock>
      <FieldBlock>
        <Question>Email Address</Question>
        <input
          type="email"
          value={data.email || ""}
          onChange={e => set({ ...data, email: e.target.value })}
          placeholder="your@email.com"
          className="w-full bg-transparent border-b border-[#d0cac4] focus:border-[#141414] outline-none text-base text-[#141414] placeholder:text-[#141414]/30 py-3 transition-colors duration-300 font-sans"
        />
      </FieldBlock>
      <FieldBlock>
        <Question>Contact Number</Question>
        <input
          type="tel"
          value={data.phone || ""}
          onChange={e => set({ ...data, phone: e.target.value })}
          placeholder="+1 000 000 0000"
          className="w-full bg-transparent border-b border-[#d0cac4] focus:border-[#141414] outline-none text-base text-[#141414] placeholder:text-[#141414]/30 py-3 transition-colors duration-300 font-sans"
        />
      </FieldBlock>
    </div>
  );
}

function Section1({ data, set }) {
  const q = [
    "What are you actually selling — not the category, but the outcome?",
    "If someone paid you tomorrow, what exactly would they receive?",
    "What would someone Google to find you, honestly?",
    "What problem are you solving that people are already paying to fix?",
    "Where does your business make money first, and where does it scale later?",
    "If this business worked perfectly, how would it generate revenue?",
    "If you could not sell your current offer, what would you sell instead?",
  ];
  return (
    <div>
      {q.map((question, i) => (
        <FieldBlock key={i}>
          <Question number={i + 1}>{question}</Question>
          <LongText value={data[`q${i}`] || ""} onChange={v => set({ ...data, [`q${i}`]: v })} />
        </FieldBlock>
      ))}
    </div>
  );
}

function Section2({ data, set }) {
  return (
    <div>
      <FieldBlock>
        <Question number={1}>What is your budget for this project?</Question>
        <ShortText value={data.budget || ""} onChange={v => set({ ...data, budget: v })} placeholder="e.g. $10,000 – $20,000" />
      </FieldBlock>
      <FieldBlock>
        <Question number={2}>What is your target timeframe or deadline?</Question>
        <input
          type="date"
          value={data.deadline || ""}
          onChange={e => set({ ...data, deadline: e.target.value })}
          className="bg-transparent border-b border-[#d0cac4] focus:border-[#141414] outline-none text-base text-[#141414] py-3 font-sans w-full md:w-auto"
        />
      </FieldBlock>
      <FieldBlock>
        <Question number={3}>What type of support do you need?</Question>
        <MultiSelect
          options={["Strategy", "Execution", "Full Service"]}
          value={data.support || []}
          onChange={v => set({ ...data, support: v })}
        />
      </FieldBlock>
      <FieldBlock>
        <Question number={4}>Do you have an existing internal team?</Question>
        <YesNoToggle value={data.hasTeam} onChange={v => set({ ...data, hasTeam: v })} />
        <AnimatePresence>
          {data.hasTeam === "Yes" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="mt-6">
                <Label>Team capabilities</Label>
                <MultiSelect
                  options={["Design", "Copywriting", "Development", "Social Media", "PR", "Sales", "Video"]}
                  value={data.teamCaps || []}
                  onChange={v => set({ ...data, teamCaps: v })}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FieldBlock>
      <FieldBlock>
        <Question number={5}>What is your preferred working model?</Question>
        <RadioGroup
          options={["Work with your team", "Lead your team", "Use our team"]}
          value={data.workingModel}
          onChange={v => set({ ...data, workingModel: v })}
        />
      </FieldBlock>
      <FieldBlock>
        <Question number={6}>Describe your past experience working with agencies.</Question>
        <LongText value={data.agencyExp || ""} onChange={v => set({ ...data, agencyExp: v })} />
      </FieldBlock>
      <FieldBlock>
        <Question number={7}>What needs to be different this time?</Question>
        <LongText value={data.different || ""} onChange={v => set({ ...data, different: v })} />
      </FieldBlock>
    </div>
  );
}

function Section3({ data, set }) {
  const updateAsset = (label, val) => set({ ...data, assets: { ...(data.assets || {}), [label]: val } });
  return (
    <div>
      <div className="mb-8">
        {ASSETS.map(asset => (
          <AssetRow
            key={asset}
            label={asset}
            value={(data.assets || {})[asset] || {}}
            onChange={v => updateAsset(asset, v)}
          />
        ))}
      </div>
      <Divider />
      <FieldBlock>
        <Question>What is currently working well from your existing assets and channels?</Question>
        <LongText value={data.working || ""} onChange={v => set({ ...data, working: v })} />
      </FieldBlock>
    </div>
  );
}

function Section4({ data, set }) {
  const q = [
    "Who frustrates you the most in your audience and why?",
    "Who do you want more of?",
    "What do your best clients have in common?",
    "What does your audience say they want vs. what they actually need?",
    "What are they tired of hearing in your industry?",
    "If your audience was in a room, what would they be too embarrassed to admit?",
  ];
  return (
    <div>
      {q.map((question, i) => (
        <FieldBlock key={i}>
          <Question number={i + 1}>{question}</Question>
          <LongText value={data[`q${i}`] || ""} onChange={v => set({ ...data, [`q${i}`]: v })} />
        </FieldBlock>
      ))}
    </div>
  );
}

function Section5({ data, set }) {
  const q = [
    "What do you do that others technically do, but not like you?",
    "What do you believe your industry gets wrong?",
    "Where are you playing small to stay palatable?",
    "If you removed 80% of your offer, what would remain?",
    "What are you over-explaining that should be obvious?",
    "If a competitor copied you, what could they never replicate?",
  ];
  return (
    <div>
      {q.map((question, i) => (
        <FieldBlock key={i}>
          <Question number={i + 1}>{question}</Question>
          <LongText value={data[`q${i}`] || ""} onChange={v => set({ ...data, [`q${i}`]: v })} />
        </FieldBlock>
      ))}
    </div>
  );
}

function Section6({ data, set }) {
  const q = [
    "What part of your brand is performative?",
    "Where are you trying to sound like someone else?",
    "What are you afraid to say publicly?",
    "What would your brand say if it had nothing to lose?",
    "What do people misunderstand about your brand?",
    "If your business became wildly successful overnight, what would you lose?",
  ];
  return (
    <div>
      {q.map((question, i) => (
        <FieldBlock key={i}>
          <Question number={i + 1}>{question}</Question>
          <LongText value={data[`q${i}`] || ""} onChange={v => set({ ...data, [`q${i}`]: v })} />
        </FieldBlock>
      ))}
    </div>
  );
}

function Section7({ data, set }) {
  const q = [
    "If your brand were a character or guide, who would it be?",
    "What deeper truth does your brand stand for?",
    "What do you want people to feel when they interact with your brand?",
  ];
  return (
    <div>
      {q.map((question, i) => (
        <FieldBlock key={i}>
          <Question number={i + 1}>{question}</Question>
          <LongText value={data[`q${i}`] || ""} onChange={v => set({ ...data, [`q${i}`]: v })} />
        </FieldBlock>
      ))}
    </div>
  );
}

function Section8({ data, set }) {
  const q = [
    "What future are you building through this brand?",
    "What needs to change to get there?",
    "What opportunities are you not pursuing but should be?",
  ];
  return (
    <div>
      {q.map((question, i) => (
        <FieldBlock key={i}>
          <Question number={i + 1}>{question}</Question>
          <LongText value={data[`q${i}`] || ""} onChange={v => set({ ...data, [`q${i}`]: v })} />
        </FieldBlock>
      ))}
    </div>
  );
}

function Section9({ data = {}, set }) {
  const q = [
    "What would people say about your brand if you were not in the room?",
    "What do you want to be known for in 10 years?",
    "What would make your brand irreplaceable?",
    "What would matter most if you had to teach this business to someone else?",
    "What does your brand protect?",
  ];
  return (
    <div>
      {q.map((question, i) => (
        <FieldBlock key={i}>
          <Question number={i + 1}>{question}</Question>
          <LongText value={data[`q${i}`] || ""} onChange={v => set({ ...data, [`q${i}`]: v })} />
        </FieldBlock>
      ))}
      <Divider />
      <FieldBlock>
        <Question>Core Values</Question>
        <p className="text-sm text-[#141414]/50 mb-5 font-sans">Select all that resonate, or add your own.</p>
        <CoreValuesField
          value={data.values || []}
          custom={data.customValues || []}
          onChange={v => set({ ...data, values: v })}
          onCustomChange={v => set({ ...data, customValues: v })}
        />
      </FieldBlock>
    </div>
  );
}

const SECTION_COMPONENTS = [Section0, Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Questionnaire() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0); // 0-indexed
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("bsd_form");
      const base = saved ? JSON.parse(saved) : Array(10).fill({});

      // Apply prefill from portal (only if section 0 is mostly empty)
      const prefill = localStorage.getItem("bsd_prefill");
      if (prefill) {
        const p = JSON.parse(prefill);
        const s0 = base[0] || {};
        const hasData = s0.fullName || s0.email || s0.company;
        if (!hasData) {
          base[0] = { ...s0, ...p };
        }
        localStorage.removeItem("bsd_prefill");
      }
      return base;
    } catch { return Array(10).fill({}); }
  });
  const [processing, setProcessing] = useState(false);

  // Auto-save
  useEffect(() => {
    try { localStorage.setItem("bsd_form", JSON.stringify(formData)); } catch {}
  }, [formData]);

  const setSection = (data) => {
    const next = [...formData];
    next[current] = data;
    setFormData(next);
  };

  const progress = ((current) / SECTIONS.length) * 100;
  const SectionComp = SECTION_COMPONENTS[current];
  const section = SECTIONS[current];

  const handleSubmit = async () => {
    setProcessing(true);
    try {
      const response = await base44.functions.invoke("processBrandStrategy", { formData });
      try { localStorage.removeItem("bsd_form"); } catch {}
      navigate(`/strategy-report/${response.data.id}`);
    } catch (err) {
      setProcessing(false);
      alert("Something went wrong. Please try again.");
    }
  };

  if (processing) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-lg"
          >
            <div className="flex justify-center mb-10">
              <div className="w-12 h-12 border-2 border-[#ece8e3] rounded-full" style={{ borderTopColor: ACCENT, animation: "spin 1.2s linear infinite" }} />
            </div>
            <p className="text-[11px] tracking-editorial uppercase font-sans mb-5" style={{ color: ACCENT, letterSpacing: "0.2em" }}>
              Brand Strategy Diagnostic
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#141414] leading-tight mb-4">
              Saving your responses…
            </h2>
          </motion.div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Progress bar — fixed below navbar */}
      <div className="fixed top-20 inset-x-0 z-40 h-px bg-[#ece8e3]">
        <motion.div
          className="h-full"
          style={{ backgroundColor: ACCENT }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Header */}
      <section className="pt-36 pb-16 px-6 border-b border-[#ece8e3]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] tracking-editorial uppercase font-sans mb-6" style={{ color: ACCENT, letterSpacing: "0.2em" }}>
            Brand Strategy Diagnostic
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#141414] leading-[0.95] tracking-tight mb-6">
            Clarity before <span className="italic font-normal">creativity.</span>
          </h1>
          <p className="text-[#141414]/55 text-base md:text-lg leading-relaxed font-sans max-w-2xl">
            This questionnaire is designed to help us understand your business, your audience, and your ambitions. The more honest and specific your answers, the more effective your brand strategy will be.
          </p>
        </div>
      </section>

      {/* Section navigation tabs */}
      <div className="border-b border-[#ece8e3] overflow-x-auto scrollbar-hide">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex gap-0">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrent(i)}
                className="relative flex-shrink-0 px-4 py-4 text-[11px] tracking-wide uppercase font-sans transition-colors duration-200 whitespace-nowrap"
                style={{
                  color: i === current ? ACCENT : "rgba(20,20,20,0.35)",
                  fontWeight: i === current ? 500 : 400,
                }}
              >
                {i + 1}
                {i === current && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 inset-x-0 h-0.5" style={{ backgroundColor: ACCENT }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main form area */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-14">
                <p className="text-[11px] tracking-editorial uppercase font-sans mb-3" style={{ color: ACCENT, opacity: 0.7, letterSpacing: "0.18em" }}>
                  Section {current + 1} of {SECTIONS.length}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#141414] leading-tight mb-2">
                  {section.title}
                </h2>
                <p className="text-[#141414]/45 text-sm font-sans italic">{section.subtitle}</p>
                <div className="mt-8 h-px bg-[#ece8e3]" />
              </div>

              {/* Section fields */}
              <SectionComp data={formData[current]} set={setSection} />

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 mt-4 border-t border-[#ece8e3]">
                <button
                  type="button"
                  onClick={() => setCurrent(c => Math.max(0, c - 1))}
                  disabled={current === 0}
                  className="flex items-center gap-2 text-sm font-sans transition-colors duration-200 disabled:opacity-0"
                  style={{ color: ACCENT }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="hidden sm:flex items-center gap-2">
                  {SECTIONS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrent(i)}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{ backgroundColor: i === current ? ACCENT : "#d0cac4", transform: i === current ? "scale(1.4)" : "scale(1)" }}
                    />
                  ))}
                </div>
                <span className="sm:hidden text-xs font-sans" style={{ color: "rgba(20,20,20,0.4)" }}>
                  {current + 1} / {SECTIONS.length}
                </span>

                {current < SECTIONS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrent(c => Math.min(SECTIONS.length - 1, c + 1))}
                    className="flex items-center gap-2 text-sm font-sans transition-colors duration-200"
                    style={{ color: ACCENT }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-5 py-3 sm:px-8 sm:py-3.5 text-[11px] tracking-editorial uppercase font-sans text-white transition-all duration-300"
                    style={{ backgroundColor: ACCENT }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  >
                    Submit Questionnaire
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}