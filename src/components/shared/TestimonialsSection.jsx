import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Laura has an extraordinary gift for translating messy ideas into clear, compelling vision. She doesn't just 'get' what's in your head, she elevates it beyond what you thought was possible. Her blend of strategic insight, creative brilliance, and intuition is unmatched. I can't recommend her highly enough.",
    name: "Wendy Mahoney",
    company: "Newmella Holdings",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/1740575057226.jpg",
  },
  {
    quote: "Partnering with this team has been transformative for Ubank. We have never experienced such rapid and consistent elevation of our brand. Their strategic alignment of both our internal and external communications, coupled with their ability to manage high-level partnerships, has significantly advanced our business objectives, even earning us industry recognition. Their professionalism, dedication, and impact have been exceptional. We highly recommend their services.",
    name: "Luthando Vuthula",
    company: "CEO, Ubank",
    image: "https://laurajanethomas.biz/wp-content/uploads/2025/11/0000949563_resized_luthandovutula20211022.jpg",
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
        <p className={`text-[10px] tracking-editorial uppercase mb-10 ${dark ? "text-ivory/60" : "text-muted-foreground"}`}>
          — Words
        </p>
        <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-4xl mb-20">
          Hundreds of businesses from around the world have{" "}
          <span className="italic">trusted me</span> with their brands
        </h2>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="aspect-[4/5] overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:col-span-8 lg:pl-6">
            <span className={`font-serif italic text-[8rem] leading-none block -mb-20 select-none ${dark ? "text-ivory/15" : "text-oxblood/20"}`}>"</span>
            <AnimatePresence mode="wait">
              <motion.blockquote key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }}>
                <p className="font-serif text-2xl md:text-3xl leading-[1.3] tracking-tight mb-8">{t.quote}</p>
                <footer>
                  <p className="font-serif italic text-xl">{t.name}</p>
                  <p className={`text-[11px] tracking-editorial uppercase mt-1 ${dark ? "text-ivory/60" : "text-muted-foreground"}`}>{t.company}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
            <div className="flex items-center gap-4 mt-10">
              <button onClick={prev} className={`w-11 h-11 border flex items-center justify-center transition-all ${dark ? "border-ivory/40 hover:bg-ivory hover:text-oxblood-deep" : "border-foreground/40 hover:bg-foreground hover:text-ivory"}`}><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={next} className={`w-11 h-11 border flex items-center justify-center transition-all ${dark ? "border-ivory/40 hover:bg-ivory hover:text-oxblood-deep" : "border-foreground/40 hover:bg-foreground hover:text-ivory"}`}><ChevronRight className="w-4 h-4" /></button>
              <span className={`ml-3 text-[11px] tracking-editorial uppercase ${dark ? "text-ivory/50" : "text-muted-foreground"}`}>{String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}