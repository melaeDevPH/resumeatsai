export default function CoverLetterPreview({ personal, coverLetter }) {
  const paragraphs = (coverLetter || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="mx-auto max-w-2xl bg-white p-8 font-body text-sm leading-relaxed text-ink-900 sm:p-10">
      <p className="font-semibold text-ink-900">{personal.fullName || "Your Name"}</p>
      <p className="text-xs text-ink-500">
        {[personal.email, personal.phone, personal.address].filter(Boolean).join("  |  ")}
      </p>
      <p className="mt-6 text-xs text-ink-500">{today}</p>

      <div className="mt-6 space-y-4 text-ink-800">
        {paragraphs.length ? (
          paragraphs.map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p className="text-ink-500">Your cover letter will appear here once generated.</p>
        )}
      </div>

      <p className="mt-8">Sincerely,</p>
      <p className="mt-6 font-semibold text-ink-900">{personal.fullName || "Your Name"}</p>
    </div>
  );
}
