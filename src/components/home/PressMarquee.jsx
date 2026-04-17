import React from "react";

const outlets = [
  {
    name: "The Times",
    logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=80&fit=crop",
  },
  {
    name: "Forbes",
    logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=80&fit=crop",
  },
  {
    name: "Women's Health",
    logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=80&fit=crop",
  },
  {
    name: "Glamour",
    logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=80&fit=crop",
  },
  {
    name: "TechCrunch",
    logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=80&fit=crop",
  },
  {
    name: "Business Day",
    logo: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=80&fit=crop",
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
            <div key={i} className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
              {outlets.map((o, j) => (
                <img
                  key={`${i}-${j}`}
                  src={o.logo}
                  alt={o.name}
                  className="h-8 md:h-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}