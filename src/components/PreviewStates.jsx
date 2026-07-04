import { FileWarning, FileEdit } from "lucide-react";

export function EmptyPreviewState() {
  return (
    <div className="card flex flex-col items-center gap-3 px-8 py-16 text-center text-ink-500">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
        <FileEdit size={22} />
      </span>
      <p className="font-display text-base font-semibold text-ink-900">Nothing to preview yet</p>
      <p className="max-w-xs text-sm">
        Fill in the form and click "Generate Resume" or "Generate Cover Letter" to see a formatted preview here.
      </p>
    </div>
  );
}

export function ErrorPreviewState({ message, onRetry }) {
  return (
    <div className="card flex flex-col items-center gap-3 border-rose-200 bg-rose-50/40 px-8 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
        <FileWarning size={22} />
      </span>
      <p className="font-display text-base font-semibold text-ink-900">Generation failed</p>
      <p className="max-w-xs text-sm text-ink-700">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-2">
          Try again
        </button>
      )}
    </div>
  );
}
