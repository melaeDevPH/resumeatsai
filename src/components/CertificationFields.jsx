import { Plus, Trash2 } from "lucide-react";
import { TextField } from "./FormFields.jsx";

const emptyCertification = () => ({
  id: crypto.randomUUID(),
  name: "",
  issuer: "",
  date: "",
});

export default function CertificationFields({ items, onChange }) {
  const certifications = items?.length ? items : [emptyCertification()];

  const updateItem = (id, field, value) => {
    onChange(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const addItem = () => {
    onChange([...certifications, emptyCertification()]);
  };

  const removeItem = (id) => {
    onChange(certifications.filter((cert) => cert.id !== id));
  };

  return (
    <div className="space-y-5">
      {certifications.map((cert, index) => (
        <div key={cert.id} className="rounded-lg border border-ink-200 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-ink-500">Certificate {index + 1}</span>
            {certifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(cert.id)}
                className="text-ink-400 hover:text-ink-900"
                aria-label="Remove certificate"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id={`cert-name-${cert.id}`}
              label="Certificate name"
              value={cert.name}
              onChange={(e) => updateItem(cert.id, "name", e.target.value)}
              placeholder="AWS Certified Cloud Practitioner"
            />
            <TextField
              id={`cert-issuer-${cert.id}`}
              label="Issuing organization"
              value={cert.issuer}
              onChange={(e) => updateItem(cert.id, "issuer", e.target.value)}
              placeholder="Amazon Web Services"
            />
            <TextField
              id={`cert-date-${cert.id}`}
              label="Date earned"
              value={cert.date}
              onChange={(e) => updateItem(cert.id, "date", e.target.value)}
              placeholder="March 2024"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 text-sm font-medium text-ink-900 hover:underline"
      >
        <Plus size={16} />
        Add certificate
      </button>
    </div>
  );
}