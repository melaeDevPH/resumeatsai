import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  };

  return (
    <section className="container-app py-16">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative overflow-hidden rounded-xl2 px-8 py-14 text-center shadow-glow sm:px-14"
      >
        <div
          className="absolute inset-0 bg-gradient-move"
          style={{
            backgroundImage:
              "linear-gradient(120deg, var(--brand-600, #466be5), var(--brand-400, #81b5f8), var(--brand-700, #4338ca), var(--brand-500, #6366f1))",
            backgroundSize: "300% 300%",
          }}
        />

        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16] mix-blend-overlay" aria-hidden="true">
          <filter id="cta-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="grayNoise" />
            <feComponentTransfer in="grayNoise">
              <feFuncR type="linear" slope="2.4" intercept="-0.7" />
              <feFuncG type="linear" slope="2.4" intercept="-0.7" />
              <feFuncB type="linear" slope="2.4" intercept="-0.7" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#cta-noise)" />
        </svg>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.2), transparent 70%)",
          }}
        />

        <div className="relative">
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
      </div>
    </section>
  );
}