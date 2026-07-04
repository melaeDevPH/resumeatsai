import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const DOC_LINES = [
  { width: "72%", tone: "strong" },
  { width: "40%", tone: "soft" },
  { width: "88%", tone: "faint" },
  { width: "82%", tone: "faint" },
  { width: "65%", tone: "faint" },
  { width: "50%", tone: "soft" },
  { width: "90%", tone: "faint" },
  { width: "78%", tone: "faint" },
];

const TONE_CLASS = {
  strong: "bg-ink-900/80",
  soft: "bg-brand-500/50",
  faint: "bg-ink-300",
};

export default function Hero() {
  return (
    <section className="container-app grid items-center gap-12 pb-20 pt-14 md:grid-cols-2 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          <Sparkles size={13} />
          AI-generated, ATS-checked
        </span>

        <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-ink-900 sm:text-5xl">
          Fill one form.
          <br />
          Walk away with{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">two finished documents.</span>
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-ink-700">
          ResumeAI turns your work history into a tailored, ATS-friendly resume and a matching cover
          letter — previewed instantly, downloadable as real .docx files.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/generate" className="btn-primary">
            Build my resume
            <ArrowRight size={17} />
          </Link>
          <a href="#how-it-works" className="btn-secondary">
            See how it works
          </a>
        </div>

        <div className="mt-8 flex items-center gap-6 text-xs text-ink-500">
          <span>No account required</span>
          <span className="h-1 w-1 rounded-full bg-ink-300" />
          <span>Docs generated in ~15s</span>
        </div>
      </motion.div>

      {/* Signature element: a document that assembles itself line by line, like paper feeding through a printer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="relative mx-auto w-full max-w-sm"
      >
        <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-gradient-soft blur-2xl" aria-hidden="true" />

        <div className="card relative overflow-hidden p-6 shadow-glow">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wide text-ink-500">Resume.docx</span>
          </div>

          <div className="space-y-3">
            {DOC_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ width: "0%", opacity: 0 }}
                animate={{ width: line.width, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                className={`h-2.5 rounded-full ${TONE_CLASS[line.tone]}`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.4 }}
            className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700"
          >
            <Sparkles size={13} />
            Ready to download
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
