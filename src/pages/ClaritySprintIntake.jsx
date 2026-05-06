import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const BRAND = "#26030F";

export default function ClaritySprintIntake() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    situation: "",
    clarityGoal: "",
    anythingElse: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = `
New Clarity Sprint Intake Form Submission

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || "Not provided"}
Primary situation: ${form.situation}
What they want clarity on: ${form.clarityGoal}
Anything else: ${form.anythingElse || "Nothing additional"}
    `.trim();

    await base44.integrations.Core.SendEmail({
      to: "hello@laurajanethomas.biz",
      subject: `New Clarity Sprint Intake — ${form.name}`,
      body,
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <Navbar />

      <section
        className="relative min-h-[40vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-16"
        style={{ backgroundColor: BRAND }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/9c5ae9111_efca8aa6761e6e74544ba4e9681156c9.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.15 }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(38,3,15,0.6)" }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] tracking-editorial uppercase text-white/50 mb-6"
          >
            — The Clarity Sprint
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-[1.0] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Your Clarity Sprint Intake
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-white/65 text-[15px] leading-relaxed"
          >
            Complete this short form. I will review it within 48 hours and be in touch to schedule your first call.
          </motion.p>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <p className="font-serif text-3xl text-foreground mb-6">Thank you.</p>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
                  I will review your intake within 48 hours and be in touch to schedule your first call.
                </p>
                <Link
                  to="/claritysprint"
                  className="inline-flex items-center gap-2 border border-foreground/30 px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-foreground hover:text-ivory transition-all"
                >
                  Back to The Clarity Sprint
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">
                    Name <span className="text-oxblood">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border-b border-foreground/30 bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-oxblood transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">
                    Email <span className="text-oxblood">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border-b border-foreground/30 bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-oxblood transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">
                    Phone <span className="text-muted-foreground/50">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border-b border-foreground/30 bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-oxblood transition-colors"
                    placeholder="+27 ..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">
                    What is your primary situation right now? <span className="text-oxblood">*</span>
                  </label>
                  <select
                    name="situation"
                    required
                    value={form.situation}
                    onChange={handleChange}
                    className="w-full border-b border-foreground/30 bg-transparent py-3 text-[15px] text-foreground focus:outline-none focus:border-oxblood transition-colors"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Starting a business">Starting a business</option>
                    <option value="Repositioning">Repositioning</option>
                    <option value="Building">Building</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">
                    What are you hoping to get clarity on? <span className="text-oxblood">*</span>
                  </label>
                  <textarea
                    name="clarityGoal"
                    required
                    rows={4}
                    value={form.clarityGoal}
                    onChange={handleChange}
                    className="w-full border-b border-foreground/30 bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-oxblood transition-colors resize-none"
                    placeholder="Tell me what you are hoping to work through..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">
                    Anything else I should know? <span className="text-muted-foreground/50">(optional)</span>
                  </label>
                  <textarea
                    name="anythingElse"
                    rows={3}
                    value={form.anythingElse}
                    onChange={handleChange}
                    className="w-full border-b border-foreground/30 bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-oxblood transition-colors resize-none"
                    placeholder="Any context that would help me understand your situation..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-foreground text-ivory py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Submit My Intake Form"}
                  </button>
                  <p className="text-[11px] tracking-editorial uppercase text-muted-foreground text-center mt-4">
                    I will review your intake within 48 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}