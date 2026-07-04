import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="container-app py-16">
      <div className="rounded-xl2 bg-brand-gradient px-8 py-14 text-center shadow-glow sm:px-14">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Your next application deserves a clean resume.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-50/90">
          Takes about the same time as writing one Slack message.
        </p>
        <Link
          to="/generate"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-brand-600 shadow-soft transition-transform hover:scale-[1.02]"
        >
          Build my resume
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
