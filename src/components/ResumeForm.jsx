import { Wand2, Mail } from "lucide-react";
import { TextField, TextAreaField, FormSection } from "./FormFields.jsx";
import ExperienceFields from "./ExperienceFields.jsx";
import ProjectFields from "./ProjectFields.jsx";
import EducationFields from "./EducationFields.jsx";

export default function ResumeForm({ formData, setFormData, errors, onGenerateResume, onGenerateCoverLetter, isLoading }) {
  const updatePersonal = (field, value) => {
    setFormData((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      className="card p-6 sm:p-8"
      onSubmit={(e) => e.preventDefault()}
      noValidate
    >
      <FormSection title="Personal Information" description="How employers should reach you.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="fullName"
            label="Full name"
            required
            value={formData.personal.fullName}
            onChange={(e) => updatePersonal("fullName", e.target.value)}
            error={errors.fullName}
            placeholder="Ame Dela Cruz"
          />
          <TextField
            id="email"
            type="email"
            label="Email"
            required
            value={formData.personal.email}
            onChange={(e) => updatePersonal("email", e.target.value)}
            error={errors.email}
            placeholder="ame@example.com"
          />
          <TextField
            id="phone"
            label="Phone"
            value={formData.personal.phone}
            onChange={(e) => updatePersonal("phone", e.target.value)}
            placeholder="+63 9XX XXX XXXX"
          />
          <TextField
            id="address"
            label="Address"
            value={formData.personal.address}
            onChange={(e) => updatePersonal("address", e.target.value)}
            placeholder="City, Country"
          />
          <TextField
            id="linkedin"
            label="LinkedIn"
            value={formData.personal.linkedin}
            onChange={(e) => updatePersonal("linkedin", e.target.value)}
            placeholder="linkedin.com/in/you"
          />
          <TextField
            id="portfolio"
            label="Portfolio"
            value={formData.personal.portfolio}
            onChange={(e) => updatePersonal("portfolio", e.target.value)}
            placeholder="yourname.dev"
          />
        </div>
      </FormSection>

      <FormSection title="Professional Summary" description="A few rough notes — the AI writes the polished version.">
        <TextAreaField
          id="summary"
          label="Tell us about your background"
          required
          rows={4}
          value={formData.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          error={errors.summary}
          placeholder="Full-stack developer with 3 years building government web systems in PHP and jQuery..."
        />
      </FormSection>

      <FormSection title="Skills" description="Separate with commas.">
        <TextField
          id="skills"
          label="Skills"
          required
          value={formData.skills}
          onChange={(e) => updateField("skills", e.target.value)}
          error={errors.skills}
          placeholder="PHP, MySQL, jQuery, React, Tailwind CSS"
        />
      </FormSection>

      <FormSection title="Experience" description="Add every role you want included, even briefly described.">
        <ExperienceFields
          items={formData.experience}
          onChange={(items) => updateField("experience", items)}
          error={errors.experience}
        />
      </FormSection>

      <FormSection title="Projects" description="Optional, but strong for portfolio-style applications.">
        <ProjectFields items={formData.projects} onChange={(items) => updateField("projects", items)} />
      </FormSection>

      <FormSection title="Education">
        <EducationFields items={formData.education} onChange={(items) => updateField("education", items)} />
      </FormSection>

      <FormSection title="Certifications" description="Optional. List any relevant certifications.">
        <TextField
          id="certifications"
          label="Certifications"
          value={formData.certifications}
          onChange={(e) => updateField("certifications", e.target.value)}
          placeholder="AWS Certified Cloud Practitioner, 2024"
        />
      </FormSection>

      <FormSection title="Target Job" description="The role and company you're applying to.">
        <TextField
          id="targetJob"
          label="Target job title / company"
          required
          value={formData.targetJob}
          onChange={(e) => updateField("targetJob", e.target.value)}
          error={errors.targetJob}
          placeholder="Full-Stack Developer at an Australian SaaS company"
        />
      </FormSection>

      <FormSection title="Additional Notes" description="Anything else the AI should know.">
        <TextAreaField
          id="additionalNotes"
          label="Additional notes"
          rows={3}
          value={formData.additionalNotes}
          onChange={(e) => updateField("additionalNotes", e.target.value)}
          placeholder="Willing to relocate, prefer remote roles, available from August..."
        />
      </FormSection>

      <div className="flex flex-col gap-3 pt-6 sm:flex-row">
        <button type="button" onClick={onGenerateResume} disabled={isLoading} className="btn-primary flex-1">
          <Wand2 size={17} />
          Generate Resume
        </button>
        <button type="button" onClick={onGenerateCoverLetter} disabled={isLoading} className="btn-secondary flex-1">
          <Mail size={17} />
          Generate Cover Letter
        </button>
      </div>
    </form>
  );
}
