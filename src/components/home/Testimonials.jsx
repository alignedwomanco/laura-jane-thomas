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
    headline: "Laura will leave you feeling empowered.",
    quote: "Laura provides actionable support to help you thrive. If you're considering her for consulting or coaching, I can hands down say you're getting your moneys worth! And if you're attending her events like her aligned masterclass, you will leave with valuable insights and practical easy techniques to help navigate and reconnect with what truly drives you, all while protecting your energy so you don't end up overworked and burnt out. Especially ideal for women in the workplace! One session Laura will leave you feeling empowered. I highly recommend her services!",
    name: "Tharunisa Reddy",
    company: "",
  },
  {
    headline: "She taught me to back myself more.",
    quote: "Laura is just phenomenal. She's helped me connect to my core and feel more confident about what I do and the value I provide to others. I feel far less uncomfortable or awkward selling myself or my services. She taught me to back myself more, and to detach my sense of self-worth from how much I make. It's set me free, and I'm excited for the next chapter in my career!",
    name: "Iris Smyth",
    company: "",
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

export default function Testimonials() {
  const [i, setI] = useState(0);
  const total = testimonials.length;

  const next = () => setI((prev) => (prev + 1) % total);
  const prev = () => setI((prev) => (prev - 1 + total) % total);

  const getIndex = (offset) => (i + offset + total) % total;

  return (
    <section className="bg-ivory text-foreground py-24 md:py-40 border-t border-foreground/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <p className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-foreground/70 mb-20 max-w-4xl mx-auto leading-[1.05] tracking-tight">
          Hundreds of businesses from around the world have trusted me with their brands
        </p>

        {/* Scrolling carousel */}
        <div className="relative flex items-start justify-center gap-8 md:gap-16">
          {/* Previous */}
          <div
            className="hidden md:block flex-1 text-left cursor-pointer select-none transition-opacity duration-500"
            style={{ opacity: 0.4 }}
            onClick={prev}
          >
            <h2 className="font-serif font-bold text-2xl md:text-3xl leading-[1.05] tracking-tight uppercase mb-4">
              {testimonials[getIndex(-1)].headline}
            </h2>
            <p className="text-[10px] tracking-widest uppercase text-foreground/70 leading-relaxed mb-4">
              {testimonials[getIndex(-1)].quote}
            </p>
            <p className="font-serif italic text-base text-foreground/80">
              — {testimonials[getIndex(-1)].name}{testimonials[getIndex(-1)].company ? ` | ${testimonials[getIndex(-1)].company}` : ""}
            </p>
          </div>

          {/* Active */}
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-full md:w-[44%] text-center"
            >
              <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight uppercase mb-8">
                {testimonials[i].headline}
              </h2>
              <p className="text-[11px] md:text-xs tracking-widest uppercase text-foreground/70 leading-relaxed max-w-xl mx-auto mb-8">
                {testimonials[i].quote}
              </p>
              <p className="font-serif italic text-xl text-foreground/80">
                — {testimonials[i].name}{testimonials[i].company ? ` | ${testimonials[i].company}` : ""}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          <div
            className="hidden md:block flex-1 text-right cursor-pointer select-none transition-opacity duration-500"
            style={{ opacity: 0.4 }}
            onClick={next}
          >
            <h2 className="font-serif font-bold text-2xl md:text-3xl leading-[1.05] tracking-tight uppercase mb-4">
              {testimonials[getIndex(1)].headline}
            </h2>
            <p className="text-[10px] tracking-widest uppercase text-foreground/70 leading-relaxed mb-4">
              {testimonials[getIndex(1)].quote}
            </p>
            <p className="font-serif italic text-base text-foreground/80">
              — {testimonials[getIndex(1)].name}{testimonials[getIndex(1)].company ? ` | ${testimonials[getIndex(1)].company}` : ""}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-10 h-10 border border-foreground/30 flex items-center justify-center hover:bg-foreground hover:text-ivory transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] tracking-editorial uppercase text-muted-foreground">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={next}
            aria-label="Next"
            className="w-10 h-10 border border-foreground/30 flex items-center justify-center hover:bg-foreground hover:text-ivory transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>


      </div>
    </section>
  );
}