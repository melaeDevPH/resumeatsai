// Renders the structured AI response as a recruiter-style resume layout.
// Never renders raw JSON — every field is mapped to real typography.

export default function ResumePreview({ personal, data }) {
  const contactParts = [personal.email, personal.phone, personal.address, personal.linkedin, personal.portfolio].filter(
    Boolean
  );

  return (
    <div className="mx-auto max-w-2xl bg-white p-8 font-body text-sm text-ink-900 sm:p-10" id="resume-preview">
      <header className="text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900">{personal.fullName || "Your Name"}</h1>
        <p className="mt-1 text-xs text-ink-500">{contactParts.join("  |  ")}</p>
      </header>

      {data.summary && (
        <Section title="Professional Summary">
          <p className="leading-relaxed text-ink-700">{data.summary}</p>
        </Section>
      )}

      {!!data.skills?.length && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {!!data.experience?.length && (
        <Section title="Experience">
          <div className="space-y-4">
            {data.experience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-semibold text-ink-900">
                    {job.role}
                    {job.company && <span className="font-normal text-ink-700"> — {job.company}</span>}
                  </p>
                  <p className="whitespace-nowrap text-xs italic text-ink-500">{job.dateRange}</p>
                </div>
                {job.location && <p className="text-xs text-ink-500">{job.location}</p>}
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-ink-700">
                  {(job.bullets || []).map((bullet, bi) => (
                    <li key={bi} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {!!data.projects?.length && (
        <Section title="Projects">
          <div className="space-y-4">
            {data.projects.map((project, i) => (
              <div key={i}>
                <p className="font-semibold text-ink-900">{project.name}</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-ink-700">
                  {(project.bullets || []).map((bullet, bi) => (
                    <li key={bi} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {!!data.education?.length && (
        <Section title="Education">
          <div className="space-y-2">
            {data.education.map((edu, i) => (
              <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="font-semibold text-ink-900">
                  {edu.degree}
                  {edu.school && <span className="font-normal text-ink-700"> — {edu.school}</span>}
                </p>
                <p className="whitespace-nowrap text-xs italic text-ink-500">
                  {[edu.honors, edu.dateRange].filter(Boolean).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.certifications && (
        <Section title="Certifications">
          <p className="leading-relaxed text-ink-700">{data.certifications}</p>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-5">
      <h2 className="border-b-2 border-brand-500 pb-1 text-xs font-bold uppercase tracking-wide text-brand-700">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
