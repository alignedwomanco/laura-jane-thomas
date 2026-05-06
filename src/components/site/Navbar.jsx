import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Linkedin, ChevronDown } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Consulting", to: "/consulting" },
  { label: "Speaking", to: "/speaking" },
  {
    label: "Coaching",
    dropdown: [
      { label: "Full Coaching Suite", to: "/services" },
      { label: "The Clarity Sprint", to: "/claritysprint" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [coachingOpen, setCoachingOpen] = useState(false);
  const [mobileCoachingOpen, setMobileCoachingOpen] = useState(false);
  const location = useLocation();
  const hoverTimeout = useRef(null);

  const isCoachingActive = location.pathname === "/services" || location.pathname === "/claritysprint";

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setCoachingOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setCoachingOpen(false), 150);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="https://laurajanethomas.biz" target="_blank" rel="noopener noreferrer" className="flex flex-col leading-none hover:opacity-80 transition-opacity duration-300">
          <span className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
            laura<span className="italic">jane</span>thomas
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) =>
            l.dropdown ? (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 text-[11px] tracking-editorial uppercase transition-colors duration-300 ${isCoachingActive ? "text-oxblood" : "text-foreground/80 hover:text-oxblood"}`}
                >
                  {l.label}
                  <ChevronDown className={`w-3 h-3 transition-transform ${coachingOpen ? "rotate-180" : ""}`} />
                </button>
                {coachingOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-ivory border border-foreground/10 shadow-lg min-w-[200px] z-50">
                    {l.dropdown.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        onClick={() => setCoachingOpen(false)}
                        className={`block px-5 py-3 text-[11px] tracking-editorial uppercase hover:text-oxblood hover:bg-foreground/5 transition-colors ${location.pathname === child.to ? "text-oxblood" : "text-foreground/80"}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className={`text-[11px] tracking-editorial uppercase transition-colors duration-300 ${location.pathname === l.to ? "text-oxblood" : "text-foreground/80 hover:text-oxblood"}`}
              >
                {l.label}
              </Link>
            )
          )}
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
            {links.map((l) =>
              l.dropdown ? (
                <div key={l.label}>
                  <button
                    onClick={() => setMobileCoachingOpen(!mobileCoachingOpen)}
                    className="flex items-center gap-1 text-sm tracking-editorial uppercase text-foreground/80 w-full"
                  >
                    {l.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ml-1 ${mobileCoachingOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileCoachingOpen && (
                    <div className="mt-3 ml-4 flex flex-col gap-3">
                      {l.dropdown.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          onClick={() => { setOpen(false); setMobileCoachingOpen(false); }}
                          className="text-sm tracking-editorial uppercase text-foreground/70 hover:text-oxblood transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-editorial uppercase text-foreground/80"
                >
                  {l.label}
                </Link>
              )
            )}
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