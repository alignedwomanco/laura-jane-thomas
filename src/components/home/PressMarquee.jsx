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

export default function PressMarquee({ isDark = false }) {
  return (
    <div className={`overflow-hidden ${isDark ? 'bg-gradient-to-t from-black/40 to-black/0' : 'bg-transparent'}`}>
      <div className="marquee whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-32 md:gap-48 pr-32 md:pr-48 py-6 md:py-6">
            {outlets.map((o, j) => (
              <img
                key={`${i}-${j}`}
                src={o.logo}
                alt={o.name}
                className={`h-8 md:h-10 w-auto max-w-[160px] object-contain transition-opacity flex-shrink-0 ${
                  isDark 
                    ? 'opacity-70 hover:opacity-100 brightness-0 invert' 
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}