import React from "react";

export default function FooterMinimal() {
  return (
    <footer className="bg-oxblood-deep text-ivory">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-editorial uppercase text-ivory/50">
          <span className="font-serif text-2xl text-ivory">
            laura<span className="italic">jane</span>thomas
          </span>
          <span>© {new Date().getFullYear()} Laura Jane Thomas</span>
        </div>
      </div>
    </footer>
  );
}