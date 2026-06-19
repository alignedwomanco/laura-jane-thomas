import React from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

export default function Footer({ ctaLabel, ctaHref }) {
  return (
    <footer className="bg-oxblood-deep text-ivory">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <a href="https://laurajanethomas.biz" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity duration-300">
              <h3 className="font-serif text-3xl md:text-4xl leading-[1.05]">
                laura<span className="italic">jane</span>thomas
              </h3>
            </a>
          </div>

          <div className="md:col-span-1">
            <p className="text-[10px] tracking-editorial uppercase text-ivory/50 mb-6">
              Explore
            </p>
            <ul className="space-y-4 font-serif text-xl">
              <li><Link to="/about" className="text-ivory hover:italic transition-all">About</Link></li>
              <li><Link to="/fractional-cmo" className="text-ivory hover:italic transition-all">Fractional CMO</Link></li>
              <li><Link to="/speaking" className="text-ivory hover:italic transition-all">Speaking</Link></li>
              <li><Link to="/services" className="text-ivory hover:italic transition-all">Coaching</Link></li>
              <li><Link to="/contact" className="text-ivory hover:italic transition-all">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-editorial uppercase text-ivory/50 mb-6">
              Connect
            </p>
            <a
              href={ctaHref || "/contact"}
              {...(!ctaHref ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="inline-block border border-ivory/60 px-6 py-3 text-[11px] tracking-editorial uppercase text-ivory hover:bg-ivory hover:text-oxblood-deep transition-all duration-300 btn-pulse"
            >
              {ctaLabel || "Apply To Work With Me"}
            </a>
            <div className="flex gap-5 mt-8">
              <a href="https://www.instagram.com/alignedlau/" target="_blank" rel="noopener noreferrer" className="text-ivory/70 hover:text-ivory transition" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/ljthomas/" target="_blank" rel="noopener noreferrer" className="text-ivory/70 hover:text-ivory transition" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
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