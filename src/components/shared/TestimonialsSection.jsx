import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    headline: "Laura has an extraordinary gift for translating messy ideas into clear, compelling vision.",
    quote: "She doesn't just 'get' what's in your head, she elevates it beyond what you thought was possible. Her blend of strategic insight, creative brilliance, and intuition is unmatched. I can't recommend her highly enough.",
    name: "Wendy Mahoney",
    company: "Newmella Holdings",
  },
  {
    headline: "Partnering with this team has been transformative for Ubank.",
    quote: "We have never experienced such rapid and consistent elevation of our brand. Their strategic alignment of both our internal and external communications, coupled with their ability to manage high-level partnerships, has significantly advanced our business objectives, even earning us industry recognition. Their professionalism, dedication, and impact have been exceptional. We highly recommend their services.",
    name: "Luthando Vutula",
    company: "CEO, Ubank",
  },
  {
    headline: "This was a complete inside-out transformation of a business established for over 30 years.",
    quote: "Taking on this project was no small feat. The strategy and rebrand not only needed to resonate with our customers, but also with both internal and external stakeholders. Laura's presentation of the new brand direction received immediate buy-in from our external partners and was successfully rolled out internally to ensure alignment at every level. This rebrand combines visual appeal with real-world functionality, driving both engagement and execution.",
    name: "Kevin Vyvyan-Day",
    company: "CEO, Barron",
  },
  {
    headline: "For the first time in my business, everything feels aligned.",
    quote: "I came to Laura overwhelmed and unclear about how to position my brand. Within a matter of weeks, she helped me articulate exactly what I do, who I do it for, and how to confidently show up as a leader.",
    name: "Tasha Berrings",
    company: "The EQ Co",
  },
  {
    headline: "Working with Laura was like plugging my business into power.",
    quote: "She pulled the strategy, story, and messaging out of me in a way that felt effortless but the outcome was anything but. I now have a clear roadmap, a stronger offer, and marketing that finally makes sense and feels like ME. Game-changer!",
    name: "Vanessa Rathbone",
    company: "Founder & Coach, Wellness Consultancy",
  },
  {
    headline: "I thought I was just getting a logo, but what Laura delivered was an entire brand world.",
    quote: "She didn't just design something beautiful; she built a visual system that finally reflects the depth and direction of my business. It's cohesive, elevated, and powerful. I finally feel seen and so does my audience.",
    name: "Jenna Cummings",
    company: "Founder, Luxury Interior Studio",
  },
  {
    headline: "No one has Laura's ability to zoom out and zoom in with equal brilliance.",
    quote: "I've worked with other consultants before, but no one has Laura's ability to zoom out and zoom in with equal brilliance. Her mind is next level.",
    name: "Ashleigh",
    company: "Founder, Thee Lux Retreat Co.",
  },
  {
    headline: "Laura and her team take no prisoners and always aim for excellence.",
    quote: "We might live on the opposite sides of the world, but that hasn't stopped us from success. I hired Laura to help with Strategy for two clients. Both of these clients' social media accounts engagement rate and website visits went up as a result. I look forward to continuing to work with Laura!",
    name: "Stephanie O'Brien",
    company: "Founder, Carmella Consulting",
  },
  {
    headline: "Working with Laura and her team has been an amazing experience.",
    quote: "I would recommend 100%, very hands on, professional and understanding. I wished I had found her sooner. Continue being such an amazing company!!",
    name: "Christelle Dossous",
    company: "Onaturell Beauty",
  },
  {
    headline: "No matter whether you are local or international, this is the company to take your marketing to another level.",
    quote: "Laura and her team are able to beat time difference odds and provide us with extremely fast service. We have also been able to upscale our client delivery, because of Laura's insight in culture and marketing strategy. The keen eye for detail and gorgeous design is a huge bonus!",
    name: "Shanny Sommer",
    company: "CEO, Welcome To Influence",
  },
  {
    headline: "Laura and her team successfully captured the essence of our luxury mental wellness brand.",
    quote: "A brand transcends mere elements such as logos and visuals; it embodies the brand's personality. Healing Destinations holds personal significance to me, and this can present a formidable challenge for many. The result was an exemplary final product. For those seeking insight, creativity and a beautiful brand, I highly recommend.",
    name: "Mica Angel",
    company: "Mother, Founder & CEO, Healing Destinations",
  },
  {
    headline: "Laura isn't just a strategist — she's a brand therapist, coach, and visionary all in one.",
    quote: "Her ability to combine mindset work with razor-sharp strategy is unmatched. I walked away with more than a brand — I walked away with confidence, direction, and a business that's finally growing.",
    name: "Elena S.",
    company: "CEO, Luxury Wellness Brand",
  },
  {
    headline: "They listened attentively, grasped our needs and consistently exceeded our expectations.",
    quote: "From the moment we engaged with them, it was evident that they are deeply knowledgeable and invested in our brand's success. Their commitment to understanding our vision and goals was refreshing.",
    name: "Charen Nortje",
    company: "CEO, Ring Artisan",
  },
  {
    headline: "For the first time in my business, everything feels aligned and the results speak for themselves.",
    quote: "I came to Laura overwhelmed and unclear about how to position my brand. Within a matter of weeks, she helped me articulate exactly what I do, who I do it for, and how to confidently show up as a leader.",
    name: "Tasha Montgomery",
    company: "Founder, Clean Beauty Startup",
  },
  {
    headline: "Thank you for helping make our Women's Day celebration a HUGE success!",
    quote: "To the most amazing speaker and panellist, on behalf of the D&I team and EY, we would like to thank you for helping make our Women's Day celebration a HUGE success!",
    name: "Clayton Jordy Fowlds",
    company: "EY",
  },
  {
    headline: "The teams thoroughly enjoyed and were engaged in your H2H workshop.",
    quote: "Thank you for such a fantastic workshop. The teams thoroughly enjoyed and were engaged in your H2H workshop. They even stayed overtime!",
    name: "Cathy Stadler",
    company: "Oracle Director Marketing",
  },
];

export default function TestimonialsSection({ dark = false }) {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const next = () => setI((i + 1) % testimonials.length);
  const prev = () => setI((i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={`${dark ? "bg-oxblood-deep text-ivory" : "bg-ivory text-foreground"} py-24 md:py-36 border-t border-current/10`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <p className={`text-[10px] tracking-editorial uppercase mb-10 ${dark ? "text-ivory/60" : "text-muted-foreground"}`}>
            — Words
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-4xl mx-auto">
            Hundreds of businesses from around the world have{" "}
            <span className="italic">trusted me</span> with their brands
          </h2>
        </div>
        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h3 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight uppercase mb-8">
                {t.headline}
              </h3>
              <p className="text-[11px] md:text-xs tracking-widest uppercase text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                {t.quote}
              </p>
              <p className="font-serif italic text-xl text-foreground/80">
                — {t.name}{t.company ? ` | ${t.company}` : ""}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-16">
            <button
              onClick={prev}
              aria-label="Previous"
              className={`w-10 h-10 border flex items-center justify-center hover:bg-foreground hover:text-ivory transition-all ${dark ? "border-ivory/30" : "border-foreground/30"}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className={`text-[10px] tracking-editorial uppercase ${dark ? "text-ivory/50" : "text-muted-foreground"}`}>
              {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              aria-label="Next"
              className={`w-10 h-10 border flex items-center justify-center hover:bg-foreground hover:text-ivory transition-all ${dark ? "border-ivory/30" : "border-foreground/30"}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}