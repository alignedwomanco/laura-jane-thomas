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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body = `
New Clarity Sprint Intake

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || "Not provided"}
Primary Situation: ${form.situation}

What are you hoping to get clarity on?
${form.clarityGoal}

Anything else:
${form.anythingElse || "Nothing added"}
    `.trim();

    await base44.integrations.Core.SendEmail({
      to: "hello@laurajanethomas.biz",
      subject: `Clarity Sprint Intake: ${form.name}`,
      body,
    });

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="bg-ivory">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-44 md:pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-12"
              >
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-6">— The Clarity Sprint</p>
                <h1 className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-4" style={{ color: "#1A1A1A" }}>
                  Your Clarity Sprint Intake
                </h1>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  Complete this short form so I understand where you are starting from. I will review it within 48 hours and be in touch to schedule your first call.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">Name *</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-foreground/60 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-foreground/60 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">Phone (optional)</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-foreground/60 transition-colors"
                    placeholder="+27 ..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">What is your primary situation right now? *</label>
                  <select
                    name="situation"
                    required
                    value={form.situation}
                    onChange={handleChange}
                    className="w-full border border-foreground/20 bg-ivory px-4 py-3 text-[14px] focus:outline-none focus:border-foreground/60 transition-colors"
                  >
                    <option value="">Select one</option>
                    <option value="Starting a business">Starting a business</option>
                    <option value="Repositioning">Repositioning</option>
                    <option value="Building">Building</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">What are you hoping to get clarity on? *</label>
                  <textarea
                    name="clarityGoal"
                    required
                    value={form.clarityGoal}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-foreground/60 transition-colors resize-none"
                    placeholder="Be as honest as you like. The more specific you are, the sharper our first call will be."
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">Anything else I should know? (optional)</label>
                  <textarea
                    name="anythingElse"
                    value={form.anythingElse}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-[14px] focus:outline-none focus:border-foreground/60 transition-colors resize-none"
                    placeholder="Anything at all."
                  />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 bg-foreground text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Submit Intake"}
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">— Received</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-6" style={{ color: "#1A1A1A" }}>
                Thank you.
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed max-w-md mx-auto mb-10">
                I will review your intake within 48 hours and be in touch to schedule your first call.
              </p>
              <Link
                to="/"
                className="text-[11px] tracking-editorial uppercase border-b border-foreground hover:text-oxblood transition-colors"
              >
                Return to site
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}