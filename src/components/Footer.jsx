import { FileText, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ink-300/40 bg-surface-soft">
      <div className="container-app flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2 font-display text-sm font-semibold text-ink-900">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-gradient text-white">
            <FileText size={13} />
          </span>
          ResumeAI
        </div>

        <p className="text-xs text-ink-500">
          Built as a portfolio project. No resume data is stored — everything happens in your session.
        </p>

        <div className="flex items-center gap-4 text-ink-500">
          <a
            href="https://github.com/aemie-dev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-brand-600"
          >
            <Github size={18} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-brand-600"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
