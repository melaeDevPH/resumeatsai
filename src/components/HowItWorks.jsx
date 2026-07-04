import { motion } from "framer-motion";
import { ClipboardList, Cpu, FileCheck2 } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Tell it about your work",
    description: "Fill in your experience, skills, projects, and the job you're targeting.",
  },
  {
    icon: Cpu,
    title: "AI structures the content",
    description: "Your input is sent to a secure backend function, which calls the Gemini API and gets back structured JSON — never raw prose.",
  },
  {
    icon: FileCheck2,
    title: "Preview, then download",
    description: "Review the formatted resume and cover letter on screen, then export both as .docx.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16">
      <div className="container-app">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink-900">Three steps, one form</h2>
          <p className="mt-3 text-ink-700">The whole flow runs in a single page — no sign-up, no saved accounts.</p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-ink-300/50 md:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-start"
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft">
                <step.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
