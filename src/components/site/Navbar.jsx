import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Linkedin, ChevronDown } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Consulting", to: "/consulting" },
  { label: "Speaking", to: "/speaking" },
  { label: "Contact", to: "/contact" },
];

const coachingDropdown = [
  { label: "Full Coaching Suite", to: "/services" },
  { label: "The Clarity Sprint", to: "/businesssprint" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [coachingOpen, setCoachingOpen] = useState(false);
  const [mobileCoachingOpen, setMobileCoachingOpen] = useState(false);
  const location = useLocation();
  const isCoachingActive = location.pathname === "/services" || location.pathname === "/businesssprint";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="https://laurajanethomas.biz" target="_blank" rel="noopener noreferrer" className="flex flex-col leading-none hover:opacity-80 transition-opacity duration-300">
          <span className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
            laura<span className="italic">jane</span>thomas
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-[11px] tracking-editorial uppercase text-foreground/80 hover:text-oxblood transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
          {/* Coaching Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCoachingOpen(true)}
            onMouseLeave={() => setTimeout(() => setCoachingOpen(false), 150)}
          >
            <button
              className={`flex items-center gap-1 text-[11px] tracking-editorial uppercase transition-colors duration-300 ${isCoachingActive ? "text-oxblood" : "text-foreground/80 hover:text-oxblood"}`}
            >
              Coaching
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${coachingOpen ? "rotate-180" : ""}`} />
            </button>
            {coachingOpen && (
              <div className="absolute top-full left-0 pt-2 w-52">
                <div className="bg-ivory border border-foreground/10 shadow-lg py-2">
                  {coachingDropdown.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={`block px-5 py-3 text-[10px] tracking-editorial uppercase transition-colors duration-200 hover:text-oxblood hover:bg-foreground/5 ${location.pathname === item.to ? "text-oxblood" : "text-foreground/80"}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
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
            className="text-[11px] tracking-editorial uppercase border border-foreground/80 px-5 py-2.5 hover:bg-foreground hover:text-ivory transition-all duration-300 btn-pulse"
          >
            Work With Me
          </Link>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ivory border-t border-foreground/10">
          <div className="px-6 py-8 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm tracking-editorial uppercase text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
            {/* Mobile Coaching Dropdown */}
            <div>
              <button
                onClick={() => setMobileCoachingOpen(!mobileCoachingOpen)}
                className={`flex items-center gap-2 text-sm tracking-editorial uppercase w-full ${isCoachingActive ? "text-oxblood" : "text-foreground/80"}`}
              >
                Coaching
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${mobileCoachingOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileCoachingOpen && (
                <div className="mt-3 pl-4 flex flex-col gap-3 border-l border-foreground/15">
                  {coachingDropdown.map((item) => (
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
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 text-center text-[11px] tracking-editorial uppercase border border-foreground px-5 py-3"
            >
              Work With Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}