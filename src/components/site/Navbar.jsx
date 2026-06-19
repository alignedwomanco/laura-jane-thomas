import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Linkedin, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Speaking", to: "/speaking" },
  { label: "Contact", to: "/contact" },
];


const fractionalDropdown = [
  { label: "The Business Sprint", to: "/businesssprint" },
];



export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileFractionalOpen, setMobileFractionalOpen] = useState(false);
  const location = useLocation();
  const isFractionalActive = location.pathname === "/fractional-cmo" || location.pathname === "/businesssprint";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="https://laurajanethomas.biz" target="_blank" rel="noopener noreferrer" className="flex flex-col leading-none hover:opacity-80 transition-opacity duration-300">
          <span className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
            laura<span className="italic">jane</span>thomas
          </span>
        </a>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex text-[11px] tracking-editorial uppercase border border-foreground/80 px-4 py-2 hover:bg-foreground hover:text-ivory transition-all duration-300"
          >
            Get in touch
          </Link>
          <a
            href="https://calendly.com/hello-laurajanethomas/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-[11px] tracking-editorial uppercase bg-foreground text-ivory px-4 py-2 hover:bg-oxblood transition-all duration-300"
          >
            Book a call
          </a>
          <button
            className="text-foreground ml-1"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-ivory border-t border-foreground/10"
          >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex flex-col gap-5">
              {links.slice(0, 2).map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-editorial uppercase text-foreground/80 hover:text-oxblood transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              {/* Fractional CMO Dropdown */}
              <div>
                <button
                  onClick={() => setMobileFractionalOpen(!mobileFractionalOpen)}
                  className={`flex items-center gap-2 text-sm tracking-editorial uppercase w-full ${isFractionalActive ? "text-oxblood" : "text-foreground/80"}`}
                >
                  Fractional CMO
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${mobileFractionalOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileFractionalOpen && (
                  <div className="mt-3 pl-4 flex flex-col gap-3 border-l border-foreground/15">
                    <Link
                      to="/fractional-cmo"
                      onClick={() => setOpen(false)}
                      className={`text-xs tracking-editorial uppercase transition-colors ${location.pathname === "/fractional-cmo" ? "text-oxblood" : "text-foreground/60"}`}
                    >
                      Fractional CMO
                    </Link>
                    {fractionalDropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={`text-xs tracking-editorial uppercase transition-colors ${location.pathname === item.to ? "text-oxblood" : "text-foreground/60"}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className={`text-sm tracking-editorial uppercase transition-colors ${location.pathname === "/services" ? "text-oxblood" : "text-foreground/80 hover:text-oxblood"}`}
              >
                Coaching
              </Link>
              {links.slice(3).map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-editorial uppercase text-foreground/80 hover:text-oxblood transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center gap-6 pt-2 border-t border-foreground/10 mt-2">
                <a
                  href="https://www.linkedin.com/in/ljthomas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-oxblood transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="text-[11px] tracking-editorial uppercase border border-foreground/80 px-5 py-2.5 hover:bg-foreground hover:text-ivory transition-all duration-300"
                >
                  Work With Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}