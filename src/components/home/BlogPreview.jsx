import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "Is Your Agency Built to Burn You Out or Light You Up?",
    date: "Nov 05, 2025",
    comments: "10 comments",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/b613b8fc4_generated_59bb91e2.png",
  },
  {
    title: "Is Your Agency Built to Burn You Out or Light You Up?",
    date: "Nov 05, 2025",
    comments: "10 comments",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/b8c532b18_generated_448740f3.png",
  },
  {
    title: "Is Your Agency Built to Burn You Out or Light You Up?",
    date: "Nov 05, 2025",
    comments: "10 comments",
    image: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/c9dec195a_generated_c395fd3a.png",
  },
];

export default function BlogPreview() {
  return (
    <section className="bg-ivory text-foreground py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-6">
              — 06 / Journal
            </p>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Now on the <span className="italic">blog</span>
            </h2>
          </div>
          <Link
            to="/"
            className="self-start md:self-end text-[11px] tracking-editorial uppercase border-b border-foreground/50 pb-1 hover:border-oxblood hover:text-oxblood transition-colors"
          >
            View All Articles →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {posts.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              className="group"
            >
              <Link to="/" className="block">
                <div className="aspect-[4/5] overflow-hidden mb-6">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-[10px] tracking-editorial uppercase text-muted-foreground mb-3">
                  {p.date} · {p.comments}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl leading-[1.1] tracking-tight group-hover:italic group-hover:text-oxblood transition-all duration-500">
                  {p.title}
                </h3>
                <span className="mt-5 inline-block text-[11px] tracking-editorial uppercase border-b border-foreground/40 pb-1">
                  Read Article
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}