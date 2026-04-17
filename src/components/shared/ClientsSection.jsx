import React from "react";

const clients = [
  "UBANK", "NEWMELLA HOLDINGS", "THE ALIGNED WOMAN CO", "ESTÉE & CO",
  "MAISON VERRE", "NORTH & NOBLE", "LA MAISON", "ATELIER SIX",
];

export default function ClientsSection({ dark = false }) {
  return (
    <section className={`${dark ? "bg-oxblood-deep text-ivory" : "bg-ivory text-foreground"} py-20 border-y border-current/10`}>
      <p className={`text-center text-[10px] tracking-editorial uppercase mb-8 ${dark ? "text-ivory/60" : "text-muted-foreground"}`}>
        — Some of the clients I've worked with
      </p>
      <div className="overflow-hidden">
        <div className="marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 md:gap-24 pr-16">
              {clients.map((c, j) => (
                <span key={`${i}-${j}`} className={`font-serif italic text-2xl md:text-3xl tracking-[0.08em] ${dark ? "text-ivory/70" : "text-foreground/70"}`}>{c}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}