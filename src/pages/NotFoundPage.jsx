import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <FileQuestion size={26} />
      </span>
      <h1 className="font-display text-2xl font-bold text-ink-900">This page doesn't exist</h1>
      <p className="max-w-sm text-sm text-ink-700">
        The link you followed may be broken, or the page may have moved.
      </p>
      <Link to="/" className="btn-primary mt-2">
        Back to home
      </Link>
    </div>
  );
}
