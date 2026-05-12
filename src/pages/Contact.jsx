import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const enquiryTypes = [
  "1:1 Coaching",
  "Business Mentorship",
  "Fractional CMO Consulting",
  "Speaking or Panelist Opportunities",
  "Podcast Collaboration",
  "Something Else",
];

const engagementTypes = [
  "Bringing someone in house to lead strategy",
  "Once off consulting or audit",
  "Ongoing partnership",
];

const howHeard = [
  "Instagram", "LinkedIn", "Podcast", "Referral", "Event", "Other",
];

function FormField({ label, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] tracking-editorial uppercase text-muted-foreground">
        {label}{required && <span className="text-oxblood ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "bg-transparent border-b border-foreground/30 py-3 text-foreground placeholder-muted-foreground/50 text-[15px] focus:outline-none focus:border-foreground transition-colors";
const textareaClass = `${inputClass} resize-none min-h-[100px]`;

export default function Contact() {
  const [enquiry, setEnquiry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target));

    // Save to ContactSubmission entity
    const nameParts = (data.name || "").trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    await base44.entities.ContactSubmission.create({
      firstName,
      lastName,
      email: data.email || "",
      phone: data.phone || "",
      subject: enquiry,
      message: JSON.stringify({ enquiryType: enquiry, ...data }, null, 2),
      source: "contact_page",
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    // Also send email notification
    const lines = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
    await base44.integrations.Core.SendEmail({
      to: "hello@laurajanethomas.biz",
      subject: `New Contact Form Submission: ${data.name || "Unknown"} — ${enquiry}`,
      body: `New contact form submission received.\n\nEnquiry type: ${enquiry}\n\n${lines}`,
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory">
      <Navbar />

      {/* Hero */}
      <section className="bg-oxblood text-ivory pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-10">
            — Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif leading-[0.92] tracking-tight"
          >
            <span className="block text-[14vw] md:text-[10vw] lg:text-[8vw] font-medium">Let's build</span>
            <span className="block text-[10vw] md:text-[7.5vw] lg:text-[6.5vw] italic font-normal">something real</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-10 text-xl text-ivory/75 max-w-2xl leading-relaxed"
          >
            Whether you are here to evolve your business, elevate your brand, or step into your next chapter, this is where it begins. Every collaboration starts with a conversation.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-4 text-[13px] text-ivory/60 font-serif italic">
            I personally read every message that comes through.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="font-serif text-5xl md:text-7xl italic mb-6">Thank you.</h2>
              <p className="text-lg text-muted-foreground">I'll be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Personal */}
              <div>
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8 border-b border-foreground/15 pb-4">— The Basics</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField label="Name" required>
                    <input name="name" required className={inputClass} placeholder="Your full name" />
                  </FormField>
                  <FormField label="Email Address" required>
                    <input name="email" required type="email" className={inputClass} placeholder="your@email.com" />
                  </FormField>
                  <FormField label="Phone" required>
                    <input name="phone" required className={inputClass} placeholder="+44..." />
                  </FormField>
                  <FormField label="Company Name" required>
                    <input name="company" required className={inputClass} placeholder="Your company" />
                  </FormField>
                </div>
              </div>

              {/* Enquiry type */}
              <div>
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8 border-b border-foreground/15 pb-4">— What Brings You Here</p>
                <FormField label="What brings you here today?" required>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {enquiryTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setEnquiry(t)}
                        className={`px-4 py-2 text-[11px] tracking-editorial uppercase border transition-all ${enquiry === t ? "bg-foreground text-ivory border-foreground" : "border-foreground/30 hover:border-foreground"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </FormField>
              </div>

              {/* Coaching-specific */}
              {(enquiry === "1:1 Coaching" || enquiry === "Business Mentorship") && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8 border-b border-foreground/15 pb-4">— Tell Me More</p>
                  <div className="space-y-8">
                    <FormField label="What area of your life feels most stuck right now?" required>
                      <textarea className={textareaClass} placeholder="Share openly..." />
                    </FormField>
                    <FormField label="What would feeling unstuck look like for you six months from now?" required>
                      <textarea className={textareaClass} placeholder="Paint the picture..." />
                    </FormField>
                    <FormField label="Have you ever worked with a coach before?" required>
                      <div className="flex gap-4 mt-2">
                        {["No", "Yes"].map((o) => (
                          <label key={o} className="flex items-center gap-2 text-[13px] cursor-pointer">
                            <input type="radio" name="prev_coach" value={o} className="accent-oxblood" /> {o}
                          </label>
                        ))}
                      </div>
                    </FormField>
                    <FormField label="Tell me about your business. What stage are you in?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                    <FormField label="What are you hoping to gain clarity on?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                    <FormField label="Are you currently operating solo or with a team?" required>
                      <div className="flex gap-4 mt-2">
                        {["Solo", "Team"].map((o) => (
                          <label key={o} className="flex items-center gap-2 text-[13px] cursor-pointer">
                            <input type="radio" name="team" value={o} className="accent-oxblood" /> {o}
                          </label>
                        ))}
                      </div>
                    </FormField>
                    <FormField label="What would success look like after working together?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                  </div>
                </motion.div>
              )}

              {/* Consulting-specific */}
              {enquiry === "Fractional CMO Consulting" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8 border-b border-foreground/15 pb-4">— About Your Business</p>
                  <div className="space-y-8">
                    <FormField label="What industry are you in and what are your growth goals?">
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                    <FormField label="Do you have an internal team or agency partners?" required>
                      <input className={inputClass} placeholder="..." />
                    </FormField>
                    <FormField label="What kind of engagement are you looking for?">
                      <div className="flex flex-col gap-3 mt-2">
                        {engagementTypes.map((o) => (
                          <label key={o} className="flex items-center gap-2 text-[13px] cursor-pointer">
                            <input type="radio" name="engagement" value={o} className="accent-oxblood" /> {o}
                          </label>
                        ))}
                      </div>
                    </FormField>
                    <FormField label="What does success look like for you from this engagement?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                    <FormField label="What is your ideal timeline for getting started?">
                      <input className={inputClass} placeholder="e.g. Immediately, Q2 2026..." />
                    </FormField>
                  </div>
                </motion.div>
              )}

              {/* Speaking-specific */}
              {enquiry === "Speaking or Panelist Opportunities" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8 border-b border-foreground/15 pb-4">— Event Details</p>
                  <div className="space-y-8">
                    <FormField label="What is the event name?" required>
                      <input required className={inputClass} placeholder="..." />
                    </FormField>
                    <FormField label="Event Date" required>
                      <input required type="date" className={inputClass} />
                    </FormField>
                    <FormField label="Who is the audience and what topic would you like me to speak on?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                    <FormField label="Is this a paid or sponsored engagement?" required>
                      <div className="flex gap-4 mt-2">
                        {["Paid", "Sponsored"].map((o) => (
                          <label key={o} className="flex items-center gap-2 text-[13px] cursor-pointer">
                            <input type="radio" name="paid" value={o} className="accent-oxblood" /> {o}
                          </label>
                        ))}
                      </div>
                    </FormField>
                    <FormField label="Where will the event take place?" required>
                      <input required className={inputClass} placeholder="City, Country or Virtual" />
                    </FormField>
                  </div>
                </motion.div>
              )}

              {/* Podcast-specific */}
              {enquiry === "Podcast Collaboration" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8 border-b border-foreground/15 pb-4">— Podcast Details</p>
                  <div className="space-y-8">
                    <FormField label="What is your podcast name and focus?" required>
                      <input required className={inputClass} placeholder="..." />
                    </FormField>
                    <FormField label="Who is your audience?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                    <FormField label="What topic or theme would you like to explore together?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                    <FormField label="How can I best add value to your listeners?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                  </div>
                </motion.div>
              )}

              {/* Something Else */}
              {enquiry === "Something Else" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8 border-b border-foreground/15 pb-4">— Tell Me More</p>
                  <div className="space-y-8">
                    <FormField label="Tell me more about what you are navigating or dreaming up right now." required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                    <FormField label="What kind of support do you feel would help most?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                  </div>
                </motion.div>
              )}

              {/* Always shown at end */}
              {enquiry && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-8 border-b border-foreground/15 pb-4">— Almost There</p>
                  <div className="space-y-8">
                    <FormField label="How did you hear about me?" required>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {howHeard.map((o) => (
                          <label key={o} className="flex items-center gap-2 text-[13px] border border-foreground/30 px-4 py-2 cursor-pointer hover:border-foreground transition-colors">
                            <input type="radio" name="how_heard" value={o} className="accent-oxblood" /> {o}
                          </label>
                        ))}
                      </div>
                    </FormField>
                    <FormField label="What are you hoping to walk away with from our time together?" required>
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                    <FormField label="Is there anything else you would like to share before we connect?">
                      <textarea className={textareaClass} placeholder="..." />
                    </FormField>
                  </div>
                </motion.div>
              )}

              {enquiry && (
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 bg-foreground text-ivory px-10 py-5 text-[11px] tracking-editorial uppercase hover:bg-oxblood transition-all duration-300 group disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send It. Let's Begin."}
                    {!loading && <span className="inline-block transition-transform group-hover:translate-x-1">→</span>}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}