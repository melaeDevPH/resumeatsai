import { Plus, Trash2 } from "lucide-react";
import { TextField } from "./FormFields.jsx";
import { EMPTY_EDUCATION } from "../utils/constants.js";

export default function EducationFields({ items, onChange }) {
  const updateItem = (id, field, value) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addItem = () => onChange([...items, EMPTY_EDUCATION()]);
  const removeItem = (id) => onChange(items.filter((item) => item.id !== id));

  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-lg border border-ink-300/50 bg-surface-soft/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wide text-ink-500">Education {index + 1}</span>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded p-1 text-ink-500 transition-colors hover:text-rose-600"
                aria-label={`Remove education ${index + 1}`}
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id={`edu-school-${item.id}`}
              label="School"
              value={item.school}
              onChange={(e) => updateItem(item.id, "school", e.target.value)}
              placeholder="Central Philippine State University"
            />
            <TextField
              id={`edu-degree-${item.id}`}
              label="Degree"
              value={item.degree}
              onChange={(e) => updateItem(item.id, "degree", e.target.value)}
              placeholder="BS Information Technology"
            />
            <TextField
              id={`edu-field-${item.id}`}
              label="Honors / distinction (optional)"
              value={item.field}
              onChange={(e) => updateItem(item.id, "field", e.target.value)}
              placeholder="Magna Cum Laude"
            />
            <div className="grid grid-cols-2 gap-3">
              <TextField
                id={`edu-start-${item.id}`}
                label="Start year"
                value={item.startDate}
                onChange={(e) => updateItem(item.id, "startDate", e.target.value)}
                placeholder="2019"
              />
              <TextField
                id={`edu-end-${item.id}`}
                label="End year"
                value={item.endDate}
                onChange={(e) => updateItem(item.id, "endDate", e.target.value)}
                placeholder="2023"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        <Plus size={15} />
        Add another
      </button>
    </div>
  );
}
