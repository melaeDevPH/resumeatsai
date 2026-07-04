import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-300/40 bg-surface-soft/80 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
            <FileText size={17} />
          </span>
          ResumeAI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/generate"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-soft transition-transform hover:scale-[1.03]"
          >
            Build my resume
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-ink-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-300/40 bg-surface-soft px-6 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink-700"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/generate"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gradient px-4 py-2.5 text-sm font-medium text-white"
            >
              Build my resume
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
