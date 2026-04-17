import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-oxblood-deep text-ivory">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl leading-[1.05]">
              laura<span className="italic">jane</span>thomas
            </h3>
            <p className="text-[11px] tracking-editorial uppercase mt-3 text-ivory/60">
              Award-Winning Brand Strategist
            </p>
          </div>

          <div className="md:col-span-1">
            <p className="text-[11px] tracking-editorial uppercase text-ivory/60 mb-4">
              Explore
            </p>
            <ul className="space-y-3 font-serif text-lg">
              <li><Link to="/about" className="hover:italic transition-all">About</Link></li>
              <li><Link to="/consulting" className="hover:italic transition-all">Consulting</Link></li>
              <li><Link to="/speaking" className="hover:italic transition-all">Speaking</Link></li>
              <li><Link to="/reset-room" className="hover:italic transition-all">The Reset Room</Link></li>
              <li><Link to="/contact" className="hover:italic transition-all">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] tracking-editorial uppercase text-ivory/60 mb-4">
              Connect
            </p>
            <Link
              to="/contact"
              className="inline-block border border-ivory/40 px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-ivory hover:text-oxblood-deep transition-all duration-300"
            >
              Apply To Work With Me
            </Link>
            <div className="flex gap-5 mt-8 text-[11px] tracking-editorial uppercase text-ivory/60">
              <a href="#" className="hover:text-ivory transition">Instagram</a>
              <a href="#" className="hover:text-ivory transition">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-ivory/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-editorial uppercase text-ivory/50">
          <span>© {new Date().getFullYear()} Laura Jane Thomas</span>
          <span>Built with intention.</span>
        </div>
      </div>
    </footer>
  );
}