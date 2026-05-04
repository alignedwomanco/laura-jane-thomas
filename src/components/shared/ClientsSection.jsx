import React from "react";

const clients = [
  { name: "HBO", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/3c16a10bb_1.png" },
  { name: "British Airways", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/92fd3c8ce_2.png" },
  { name: "Best 10", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/3e26e1445_6990.png" },
  { name: "Mask Group 2", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/ce93fc3a7_Maskgroup-2.png" },
  { name: "Ubank", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/f7bbffad0_Maskgroup-3.png" },
  { name: "Bio Sculpture", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/58f19d5d0_Maskgroup-4.png" },
  { name: "The Diamond Channel", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/1fd0cf947_Maskgroup-5.png" },
  { name: "MTN MoMo", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/05c430e27_Maskgroup-6.png" },
  { name: "Barron", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/756f9031d_Maskgroup-7.png" },
  { name: "Coca-Cola", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/b12151857_Maskgroup-8.png" },
  { name: "Oracle", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/2485f06ba_Maskgroup-9.png" },
  { name: "Trova", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/87df26e03_Maskgroup-10.png" },
  { name: "EY", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/745ac4fed_Maskgroup-11.png" },
  { name: "RockCorps", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/e5d73cab4_Maskgroup-12.png" },
  { name: "Dermalogica", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/333bd2198_Maskgroup-13.png" },
  { name: "Fertily", logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/be9718442_Maskgroup.png" },
];

export default function ClientsSection({ dark = false }) {
  return (
    <section className={`${dark ? "bg-oxblood-deep text-ivory" : "bg-ivory text-foreground"} py-24 md:py-32`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center mb-14">
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
          Some of the <span className="italic">clients</span>
          <span className="block">I've worked with</span>
        </h2>
      </div>

      <div className={`overflow-hidden border-y py-8 ${dark ? "border-ivory/15" : "border-current/10"}`}>
        <div className="marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="inline-flex items-center">
              {clients.map((c, j) => (
                <div key={`${i}-${j}`} className="inline-flex items-center justify-center px-12 md:px-16 flex-shrink-0">
                  <img
                    src={c.logo}
                    alt={c.name}
                    className={`h-10 md:h-12 w-auto max-w-[140px] object-contain transition-opacity ${dark ? "opacity-80 hover:opacity-100" : "opacity-70 hover:opacity-100"}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}