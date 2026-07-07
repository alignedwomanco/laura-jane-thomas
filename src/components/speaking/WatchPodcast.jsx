import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function WatchPodcast() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.functions.
    invoke("getChannelVideos", {}).
    then((res) => setVideos(res.data?.videos || [])).
    catch(() => setVideos([])).
    finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-oxblood text-ivory py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[10px] tracking-editorial uppercase text-ivory/55 mb-6">— The Aligned Woman Podcast</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.92] tracking-tight mb-6">
            Watch The Aligned Woman <span className="italic">Podcast</span>
          </h2>
          <p className="text-[15px] text-ivory/65 leading-relaxed max-w-2xl mx-auto">Real conversations with extraordinary women, on leadership, burnout, identity, wealth and joy.

          </p>
        </div>

        {loading ?
        <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-ivory/15 border-t-ivory rounded-full animate-spin" />
          </div> :
        videos.length === 0 ?
        <p className="text-center text-ivory/60">Episodes coming soon.</p> :

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((v, i) =>
          <motion.a
            key={v.videoId}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group block">
            
                <div className="relative overflow-hidden bg-oxblood-deep aspect-video mb-5">
                  <img
                src={v.thumbnail}
                alt={v.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                  <div className="absolute inset-0 bg-gradient-to-t from-oxblood-deep/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-ivory/0 group-hover:bg-ivory/10 transition-colors duration-300" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ivory/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <Play className="w-4 h-4 text-oxblood ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-base md:text-lg leading-snug text-ivory group-hover:text-ivory/80 transition-colors">
                    {v.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-ivory/40 group-hover:text-ivory transition-colors flex-shrink-0 mt-1" />
                </div>
              </motion.a>
          )}
          </div>
        }

        <div className="flex justify-center mt-14">
          <a
            href="https://www.youtube.com/@AlignedWomanCo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-ivory/50 text-ivory px-8 py-4 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood transition-all duration-300 group">
            
            View All Episodes on YouTube
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>);

}