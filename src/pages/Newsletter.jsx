import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function Newsletter() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await base44.entities.NewsletterSubscriber.create({
        firstName: firstName.trim() || undefined,
        email: email.trim().toLowerCase(),
        source: "newsletter_page",
        subscribedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 pt-32 pb-24">
        <div className="max-w-xl w-full text-center">
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-6">
                — The Newsletter
              </p>
              <h1 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight text-foreground mb-6">
                Letters from <span className="italic">Laura.</span>
              </h1>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-10">
                Honest, unfiltered notes on building a life and business that actually feels like yours. The products, places, tools and people I actually rate. Nothing polished, nothing recycled. Just the things I wish I'd been told sooner.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">
                    First Name <span className="opacity-40">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-transparent border border-foreground/20 px-4 py-3 text-sm focus:outline-none focus:border-oxblood transition-colors"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-foreground/20 px-4 py-3 text-sm focus:outline-none focus:border-oxblood transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-oxblood text-ivory py-4 text-[11px] tracking-editorial uppercase hover:bg-oxblood-deep transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? "Subscribing…" : "Subscribe"}
                </button>
              </form>

              <p className="text-[11px] text-muted-foreground/60 mt-6">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oxblood/10 mb-8">
                <Check className="w-7 h-7 text-oxblood" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight text-foreground mb-6">
                You're in.
              </h1>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
                Thank you for trusting me with your inbox. Watch out for the first letter soon.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}