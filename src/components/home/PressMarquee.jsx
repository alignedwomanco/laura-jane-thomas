import React from "react";

const outlets = [
  "FORBES",
  "VOGUE BUSINESS",
  "THE TIMES",
  "ENTREPRENEUR",
  "FAST COMPANY",
  "HARPER'S BAZAAR",
  "BLOOMBERG",
  "MARIE CLAIRE",
];

export default function PressMarquee() {
  return (
    <section className="bg-ivory text-foreground border-y border-foreground/15 py-12">
      <p className="text-center text-[10px] tracking-editorial uppercase text-muted-foreground mb-8">
        — As Seen In
      </p>
      <div className="overflow-hidden">
        <div className="marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
              {outlets.map((o, j) => (
                <span
                  key={`${i}-${j}`}
                  className="font-serif text-2xl md:text-3xl tracking-[0.15em] text-foreground/70"
                >
                  {o}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}