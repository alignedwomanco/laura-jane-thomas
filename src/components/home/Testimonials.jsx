import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Laura has an extraordinary gift for translating messy ideas into clear, compelling vision. She doesn't just 'get' what's in your head, she elevates it beyond what you thought was possible. Her blend of strategic insight, creative brilliance, and intuition is unmatched. I can't recommend her highly enough.",
    name: "Wendy Mahoney",
    company: "Newmella Holdings",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/5de2751e1_generated_1b8fa87c.png",
  },
  {
    quote:
      "Partnering with this team has been transformative for Ubank. We have never experienced such rapid and consistent elevation of our brand. Their strategic alignment of both our internal and external communications, coupled with their ability to manage high-level partnerships, has redefined what is possible.",
    name: "Ubank Leadership",
    company: "Ubank",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/3d4c4e6e7_generated_b375fafb.png",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  const next = () => setI((i + 1) % testimonials.length);
  const prev = () => setI((i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-ivory text-foreground py-24 md:py-36 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-10">
          — 07 / Words
        </p>

        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-5xl mb-20">
          Hundreds of businesses from around the world have{" "}
          <span className="italic">trusted me</span> with their brands
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="aspect-[4/5] overflow-hidden"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-8 lg:pl-6">
            <span className="font-serif italic text-[8rem] md:text-[12rem] leading-none text-oxblood/20 block -mb-16 md:-mb-24 select-none">
              "
            </span>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-serif text-2xl md:text-3xl lg:text-[34px] leading-[1.3] tracking-tight mb-10">
                  {t.quote}
                </p>
                <footer>
                  <p className="font-serif italic text-2xl">{t.name}</p>
                  <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mt-1">
                    {t.company}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-12">
              <button
                onClick={prev}
                aria-label="Previous"
                className="w-12 h-12 border border-foreground/40 flex items-center justify-center hover:bg-foreground hover:text-ivory transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="w-12 h-12 border border-foreground/40 flex items-center justify-center hover:bg-foreground hover:text-ivory transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="ml-4 text-[11px] tracking-editorial uppercase text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}