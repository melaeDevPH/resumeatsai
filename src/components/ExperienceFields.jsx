import { Plus, Trash2 } from "lucide-react";
import { TextField, TextAreaField } from "./FormFields.jsx";
import { EMPTY_EXPERIENCE } from "../utils/constants.js";

export default function ExperienceFields({ items, onChange, error }) {
  const updateItem = (id, field, value) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addItem = () => onChange([...items, EMPTY_EXPERIENCE()]);
  const removeItem = (id) => onChange(items.filter((item) => item.id !== id));

  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-lg border border-ink-300/50 bg-surface-soft/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wide text-ink-500">Role {index + 1}</span>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded p-1 text-ink-500 transition-colors hover:text-rose-600"
                aria-label={`Remove role ${index + 1}`}
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id={`exp-role-${item.id}`}
              label="Job title"
              value={item.role}
              onChange={(e) => updateItem(item.id, "role", e.target.value)}
              placeholder="Software Engineer"
            />
            <TextField
              id={`exp-company-${item.id}`}
              label="Company"
              value={item.company}
              onChange={(e) => updateItem(item.id, "company", e.target.value)}
              placeholder="LGU San Carlos City"
            />
            <TextField
              id={`exp-location-${item.id}`}
              label="Location"
              value={item.location}
              onChange={(e) => updateItem(item.id, "location", e.target.value)}
              placeholder="City, Country"
            />
            <div className="grid grid-cols-2 gap-3">
              <TextField
                id={`exp-start-${item.id}`}
                label="Start date"
                value={item.startDate}
                onChange={(e) => updateItem(item.id, "startDate", e.target.value)}
                placeholder="Jan 2023"
              />
              <TextField
                id={`exp-end-${item.id}`}
                label="End date"
                value={item.endDate}
                onChange={(e) => updateItem(item.id, "endDate", e.target.value)}
                placeholder="Present"
              />
            </div>
          </div>

          <div className="mt-4">
            <TextAreaField
              id={`exp-desc-${item.id}`}
              label="What did you do?"
              rows={3}
              value={item.description}
              onChange={(e) => updateItem(item.id, "description", e.target.value)}
              placeholder="Rough notes are fine — the AI turns these into polished bullet points."
            />
          </div>
        </div>
      ))}

      {error && <p className="text-xs text-rose-600">{error}</p>}

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        <Plus size={15} />
        Add another role
      </button>
    </div>
  );
}
