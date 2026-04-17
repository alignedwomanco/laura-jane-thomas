import React from "react";
import { Link } from "react-router-dom";

export default function NavbarMinimal() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
            laura<span className="italic">jane</span>thomas
          </span>
          <span className="text-[10px] tracking-editorial uppercase text-muted-foreground mt-1">
            Award-Winning Brand Strategist
          </span>
        </Link>
      </div>
    </header>
  );
}