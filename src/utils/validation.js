// Lightweight, dependency-free validation for the resume form.
// Keeps rules readable and centralised so the form component stays declarative.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForm(formData) {
  const errors = {};

  if (!formData.personal.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!formData.personal.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(formData.personal.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.summary.trim()) {
    errors.summary = "Add a few notes about your background — the AI expands on this.";
  }

  if (!formData.skills.trim()) {
    errors.skills = "List at least a few skills, separated by commas.";
  }

  const hasExperience = formData.experience.some((exp) => exp.role.trim() || exp.company.trim());
  if (!hasExperience) {
    errors.experience = "Add at least one role, even if it's brief.";
  }

  if (!formData.targetJob.trim()) {
    errors.targetJob = "Tell the AI what job or role you're targeting.";
  }

  return errors;
}

export function isFormValid(formData) {
  return Object.keys(validateForm(formData)).length === 0;
}
