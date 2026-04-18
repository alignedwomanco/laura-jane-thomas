import React from "react";

const outlets = [
  {
    name: "The Times",
    logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/6bb7ca2df_1.png",
  },
  {
    name: "Forbes",
    logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/871613b6a_2.png",
  },
  {
    name: "Women's Health",
    logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/6378559e5_3.png",
  },
  {
    name: "Glamour",
    logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/1356abfbd_4.png",
  },
  {
    name: "TechCrunch",
    logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/164279a3f_6.png",
  },
  {
    name: "Business Day",
    logo: "https://media.base44.com/images/public/69e1e7f05d39205bc001ea00/71e3efbad_7.png",
  },
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
            <div key={i} className="flex items-center gap-32 md:gap-48 pr-32 md:pr-48">
              {outlets.map((o, j) => (
                <img
                  key={`${i}-${j}`}
                  src={o.logo}
                  alt={o.name}
                  className="h-7 md:h-9 w-auto max-w-[140px] object-contain opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}