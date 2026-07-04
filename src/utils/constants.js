export const EMPTY_EXPERIENCE = () => ({
  id: crypto.randomUUID(),
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
});

export const EMPTY_PROJECT = () => ({
  id: crypto.randomUUID(),
  name: "",
  description: "",
  link: "",
});

export const EMPTY_EDUCATION = () => ({
  id: crypto.randomUUID(),
  school: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
});

export const INITIAL_FORM_STATE = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    portfolio: "",
  },
  summary: "",
  skills: "",
  experience: [EMPTY_EXPERIENCE()],
  projects: [EMPTY_PROJECT()],
  education: [EMPTY_EDUCATION()],
  certifications: "",
  targetJob: "",
  additionalNotes: "",
};
