import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Linkedin } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Consulting", to: "/consulting" },
  { label: "Speaking", to: "/speaking" },
  { label: "The Reset Room", to: "/reset-room" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ivory/95 backdrop-blur-md border-b border-foreground/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
            laura<span className="italic">jane</span>thomas
          </span>
          <span className="text-[10px] tracking-editorial uppercase text-muted-foreground mt-1">
            Award-Winning Brand Strategist
          </span>
        </Link>

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
            className="text-[11px] tracking-editorial uppercase border border-foreground/80 px-5 py-2.5 hover:bg-foreground hover:text-ivory transition-all duration-300"
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
            <Link
              to="/"
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