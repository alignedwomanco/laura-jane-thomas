import React from "react";

const clients = [
  "UBANK",
  "NEWMELLA HOLDINGS",
  "THE ALIGNED WOMAN CO",
  "ESTÉE & CO",
  "MAISON VERRE",
  "NORTH & NOBLE",
  "LA MAISON",
  "ATELIER SIX",
];

export default function ClientsMarquee() {
  return (
    <section className="bg-oxblood-deep text-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center mb-14">
        <p className="text-[10px] tracking-editorial uppercase text-ivory/60 mb-6">
          — 05 / Selected Partners
        </p>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
          Some of the <span className="italic">clients</span>
          <span className="block">I've worked with</span>
        </h2>
      </div>

      <div className="overflow-hidden border-y border-ivory/15 py-8">
        <div className="marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
              {clients.map((c, j) => (
                <span
                  key={`${i}-${j}`}
                  className="font-serif italic text-3xl md:text-4xl tracking-[0.08em] text-ivory/80"
                >
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}