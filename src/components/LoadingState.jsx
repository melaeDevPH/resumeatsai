import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const STEPS = ["Reading your input", "Structuring your experience", "Writing in your voice", "Finalizing layout"];

export default function LoadingState() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="card flex flex-col items-center gap-6 px-8 py-16 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-brand-gradient-soft"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-soft"
        >
          <FileText size={20} />
        </motion.span>
      </div>

      <div>
        <p className="font-display text-base font-semibold text-ink-900">Generating your documents</p>
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-ink-500"
        >
          {STEPS[stepIndex]}…
        </motion.p>
      </div>

      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-ink-300/40">
        <motion.div
          className="h-full rounded-full bg-brand-gradient"
          initial={{ width: "10%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
