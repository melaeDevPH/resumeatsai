import { Plus, Trash2 } from "lucide-react";
import { TextField, TextAreaField } from "./FormFields.jsx";
import { EMPTY_PROJECT } from "../utils/constants.js";

export default function ProjectFields({ items, onChange }) {
  const updateItem = (id, field, value) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addItem = () => onChange([...items, EMPTY_PROJECT()]);
  const removeItem = (id) => onChange(items.filter((item) => item.id !== id));

  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-lg border border-ink-300/50 bg-surface-soft/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wide text-ink-500">Project {index + 1}</span>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded p-1 text-ink-500 transition-colors hover:text-rose-600"
                aria-label={`Remove project ${index + 1}`}
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id={`proj-name-${item.id}`}
              label="Project name"
              value={item.name}
              onChange={(e) => updateItem(item.id, "name", e.target.value)}
              placeholder="Project #1"
            />
            <TextField
              id={`proj-link-${item.id}`}
              label="Link (optional)"
              value={item.link}
              onChange={(e) => updateItem(item.id, "link", e.target.value)}
              placeholder="github.com/you/project"
            />
          </div>

          <div className="mt-4">
            <TextAreaField
              id={`proj-desc-${item.id}`}
              label="What did you build?"
              rows={3}
              value={item.description}
              onChange={(e) => updateItem(item.id, "description", e.target.value)}
              placeholder="Stack, what it does, and any notable outcome."
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        <Plus size={15} />
        Add another project
      </button>
    </div>
  );
}
