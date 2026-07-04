import { motion } from "framer-motion";
import { ScanSearch, FileStack, DownloadCloud, Wand2 } from "lucide-react";

const FEATURES = [
  {
    icon: ScanSearch,
    title: "ATS-friendly by default",
    description:
      "Clean structure, standard headings, and keyword-aware phrasing so applicant tracking systems can actually parse your resume.",
  },
  {
    icon: Wand2,
    title: "Resume and cover letter together",
    description:
      "Both documents are generated from the same input in one pass, so tone and details stay consistent across the two.",
  },
  {
    icon: FileStack,
    title: "Live preview before you commit",
    description:
      "See the formatted resume and letter rendered on screen before downloading anything — no surprises in the .docx.",
  },
  {
    icon: DownloadCloud,
    title: "Real .docx, not a PDF screenshot",
    description:
      "Downloads are genuine Word documents built with proper headings and bullet styles, ready to edit further.",
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="container-app py-16">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <h2 className="font-display text-3xl font-bold text-ink-900">Built for the actual hiring pipeline</h2>
        <p className="mt-3 text-ink-700">
          Not just a text generator — a small tool that mirrors what recruiters and ATS software expect.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="card group relative overflow-hidden border border-transparent p-6 transition-colors duration-300 hover:border-brand-200 hover:shadow-lg"
          >
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white"
              whileHover={{ rotate: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              <feature.icon size={19} />
            </motion.span>
            <h3 className="mt-4 font-display text-base font-semibold text-ink-900">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{feature.description}</p>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-gradient transition-transform duration-300 group-hover:scale-x-100" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}