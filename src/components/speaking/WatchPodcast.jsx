import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function WatchPodcast() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.functions
      .invoke("getChannelVideos", {})
      .then((res) => setVideos(res.data?.videos || []))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-6 text-center">— The Aligned Woman Podcast</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.92] tracking-tight mb-12 md:mb-20 text-center">
          Watch The Aligned Woman Podcast
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-foreground/10 border-t-oxblood rounded-full animate-spin" />
          </div>
        ) : videos.length === 0 ? (
          <p className="text-center text-muted-foreground">Episodes coming soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((v, i) => (
              <motion.a
                key={v.videoId}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group block"
              >
                <div className="relative overflow-hidden bg-oxblood/5 aspect-video mb-4">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-oxblood/0 group-hover:bg-oxblood/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-ivory/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-5 h-5 text-oxblood ml-0.5" fill="currentColor" />
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-lg md:text-xl leading-snug text-foreground group-hover:text-oxblood transition-colors">
                  {v.title}
                </h3>
              </motion.a>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <a
            href="https://www.youtube.com/@AlignedWomanCo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-oxblood text-oxblood px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-oxblood hover:text-ivory transition-all"
          >
            View All on YouTube →
          </a>
        </div>
      </div>
    </section>
  );
}