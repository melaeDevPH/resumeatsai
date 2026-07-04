// Small, reusable field primitives used across the resume form.
// Keeping these separate avoids repeating label/error markup for every input.

export function TextField({ label, error, hint, required, ...inputProps }) {
  return (
    <div>
      <label className="field-label" htmlFor={inputProps.id}>
        {label}
        {required && <span className="ml-0.5 text-brand-500">*</span>}
      </label>
      <input className="field-input" {...inputProps} />
      {hint && !error && <p className="field-hint">{hint}</p>}
      {error && <p className="field-hint text-rose-600">{error}</p>}
    </div>
  );
}

export function TextAreaField({ label, error, hint, required, rows = 4, ...inputProps }) {
  return (
    <div>
      <label className="field-label" htmlFor={inputProps.id}>
        {label}
        {required && <span className="ml-0.5 text-brand-500">*</span>}
      </label>
      <textarea className="field-input resize-y" rows={rows} {...inputProps} />
      {hint && !error && <p className="field-hint">{hint}</p>}
      {error && <p className="field-hint text-rose-600">{error}</p>}
    </div>
  );
}

export function FormSection({ title, description, children }) {
  return (
    <div className="border-b border-ink-300/40 py-7 first:pt-0 last:border-b-0">
      <h3 className="font-display text-base font-semibold text-ink-900">{title}</h3>
      {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  );
}
