import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, Check } from "lucide-react";
import ResumePreview from "./ResumePreview.jsx";
import CoverLetterPreview from "./CoverLetterPreview.jsx";
import LoadingState from "./LoadingState.jsx";
import { EmptyPreviewState, ErrorPreviewState } from "./PreviewStates.jsx";
import { downloadResumeDocx, downloadCoverLetterDocx } from "../utils/docxGenerator.js";
import { useToast } from "../hooks/useToast.jsx";

const TABS = [
  { id: "resume", label: "Resume" },
  { id: "cover_letter", label: "Cover Letter" },
];

function resumePlainText(data) {
  const lines = [data.summary, "", "Skills: " + (data.skills || []).join(", ")];
  (data.experience || []).forEach((job) => {
    lines.push("", `${job.role} — ${job.company} (${job.dateRange || ""})`);
    (job.bullets || []).forEach((b) => lines.push(`• ${b}`));
  });
  return lines.join("\n");
}

export default function PreviewPanel({ status, result, errorMessage, onRetry, personal }) {
  const [activeTab, setActiveTab] = useState("resume");
  const [copied, setCopied] = useState(false);
  const { notify } = useToast();

  const handleCopy = async () => {
    try {
      const text = activeTab === "resume" ? resumePlainText(result) : result.cover_letter;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      notify("Copied to clipboard.", "success", 2500);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      notify("Couldn't copy to clipboard. Your browser may be blocking it.", "error");
    }
  };

  const handleDownload = async () => {
    try {
      if (activeTab === "resume") {
        await downloadResumeDocx(personal, result);
        notify("Resume.docx downloaded.", "success");
      } else {
        await downloadCoverLetterDocx(personal, result.cover_letter);
        notify("CoverLetter.docx downloaded.", "success");
      }
    } catch {
      notify("Couldn't build the .docx file. Please try again.", "error");
    }
  };

  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorPreviewState message={errorMessage} onRetry={onRetry} />;
  if (status === "idle" || !result) return <EmptyPreviewState />;

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-ink-300/40 px-4 pt-4 sm:px-6">
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-brand-500 text-brand-600"
                  : "text-ink-500 hover:text-ink-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pb-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink-700 transition-colors hover:bg-surface-soft"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100"
          >
            <Download size={14} />
            Download .docx
          </button>
        </div>
      </div>

     <div className="scroll-styled max-h-[70vh] overflow-y-auto bg-surface-soft/40 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "resume" ? (
              <ResumePreview personal={personal} data={result} />
            ) : (
              <CoverLetterPreview personal={personal} coverLetter={result.cover_letter} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
