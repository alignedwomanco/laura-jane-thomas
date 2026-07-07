import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const mediaItems = [
  {
    num: "01.",
    tag: "Live on ENCA",
    title: "Are women really \"uninspired,\" or are we just exhausted?",
    href: "https://youtu.be/Z6yoRCPHAo8?si=PpLYER1ZgQOPAwqT",
  },
  {
    num: "02.",
    tag: "Live on Cape Talk",
    title: "Are you a woman who's feeling burned out? There might be an answer for you.",
    href: "https://open.spotify.com/episode/1g3zDKfoTeUy1Tavw2GOho?si=wMvgpfZLSVCqLiAASwr9OA",
  },
  {
    num: "03.",
    tag: "Featured Article",
    title: "Read My Feature on Burnout",
    href: "https://www.bizcommunity.com/article/female-burnout-epidemic-in-advertising-and-media-industry-062295a",
  },
];

export default function InTheMedia() {
  return (
    <section className="bg-ivory pt-24 md:pt-36 pb-24 md:pb-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-6 text-center">— Press & Media</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.92] tracking-tight mb-12 md:mb-20 text-center">
          In The Media
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {mediaItems.map((item, i) => (
            <motion.a
              key={item.num}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border border-foreground/15 hover:border-oxblood bg-white/40 hover:bg-white px-6 md:px-10 py-8 transition-all duration-300"
            >
              <span className="font-serif text-2xl text-oxblood/60 group-hover:text-oxblood transition-colors">{item.num}</span>
              <div className="flex-1">
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-2">{item.tag}</p>
                <h3 className="font-serif text-xl md:text-2xl leading-snug text-foreground">{item.title}</h3>
              </div>
              <span className="inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase text-oxblood opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                View <ExternalLink className="w-4 h-4" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}