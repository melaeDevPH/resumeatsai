import { useState } from "react";
import { Wand2, Mail, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { TextField, TextAreaField, FormSection } from "./FormFields.jsx";
import ExperienceFields from "./ExperienceFields.jsx";
import ProjectFields from "./ProjectFields.jsx";
import EducationFields from "./EducationFields.jsx";
import CertificationFields from "./CertificationFields.jsx";
import { validateForm } from "../utils/validation.js";

const STEPS = [
  { id: "personal", label: "Personal", requiredKeys: ["fullName", "email"] },
  { id: "background", label: "Background", requiredKeys: ["summary", "skills"] },
  { id: "experience", label: "Experience", requiredKeys: ["experience"] },
  { id: "projects", label: "Projects", requiredKeys: [] },
  { id: "education", label: "Education", requiredKeys: [] },
  { id: "certifications", label: "Certifications", requiredKeys: [] },
  { id: "target", label: "Target Job", requiredKeys: ["targetJob"] },
];

function StepIndicator({ steps, currentStep, furthestStep, onStepClick }) {
  const progressPercent = steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="absolute left-4 right-4 top-4 h-px bg-ink-200" />
        <div
          className="absolute left-4 top-4 h-px bg-ink-900 transition-all duration-300"
          style={{ width: `calc(${progressPercent}% - ${progressPercent > 0 ? "2rem" : "0px"} * ${progressPercent / 100})` }}
        />

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;
            const isReachable = index <= furthestStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isReachable && onStepClick(index)}
                disabled={!isReachable}
                className="flex flex-col items-center gap-2 bg-white disabled:cursor-not-allowed"
              >
                <span
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                    isCurrent
                      ? "border-ink-900 bg-ink-900 text-white"
                      : isComplete
                      ? "border-ink-900 bg-white text-ink-900"
                      : "border-ink-300 bg-white text-ink-400",
                  ].join(" ")}
                >
                  {isComplete ? <Check size={15} /> : index + 1}
                </span>
                <span
                  className={[
                    "hidden text-xs font-medium sm:block",
                    isCurrent ? "text-ink-900" : "text-ink-500",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-xs font-medium text-ink-500 sm:hidden">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
      </p>
    </div>
  );
}

export default function ResumeForm({ formData, setFormData, errors, onGenerateResume, onGenerateCoverLetter, isLoading }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [stepErrors, setStepErrors] = useState({});

  const updatePersonal = (field, value) => {
    setFormData((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  const handleNext = () => {
    const allErrors = validateForm(formData);
    const { requiredKeys } = STEPS[currentStep];
    const blockingErrors = Object.fromEntries(
      Object.entries(allErrors).filter(([key]) => requiredKeys.includes(key))
    );

    setStepErrors(blockingErrors);

    if (Object.keys(blockingErrors).length > 0) {
      const firstErrorId = requiredKeys.find((key) => blockingErrors[key]);
      document.getElementById(firstErrorId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const next = currentStep + 1;
    setCurrentStep(next);
    setFurthestStep((prev) => Math.max(prev, next));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const isLastStep = currentStep === STEPS.length - 1;
  const mergedErrors = { ...stepErrors, ...errors };

  return (
    <form
      className="card p-6 sm:p-8 border-black-5"
      onSubmit={(e) => e.preventDefault()}
      noValidate
    >
      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        furthestStep={furthestStep}
        onStepClick={goToStep}
      />

      {currentStep === 0 && (
        <FormSection title="Personal Information" description="How employers should reach you.">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="fullName"
              label="Full name"
              required
              value={formData.personal.fullName}
              onChange={(e) => updatePersonal("fullName", e.target.value)}
              error={mergedErrors.fullName}
              placeholder="Ame Dela Cruz"
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              required
              value={formData.personal.email}
              onChange={(e) => updatePersonal("email", e.target.value)}
              error={mergedErrors.email}
              placeholder="youremail@example.com"
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
      )}

      {currentStep === 1 && (
        <>
          <FormSection title="Professional Summary" description="A few rough notes — the AI writes the polished version.">
            <TextAreaField
              id="summary"
              label="Tell us about your background"
              required
              rows={4}
              value={formData.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              error={mergedErrors.summary}
              placeholder="Full-stack developer with 3 years building web systems in PHP and jQuery..."
            />
          </FormSection>

          <FormSection title="Skills" description="Separate with commas.">
            <TextField
              id="skills"
              label="Skills"
              required
              value={formData.skills}
              onChange={(e) => updateField("skills", e.target.value)}
              error={mergedErrors.skills}
              placeholder="PHP, MySQL, jQuery, React, Tailwind CSS"
            />
          </FormSection>
        </>
      )}

      {currentStep === 2 && (
        <FormSection title="Experience" description="Add every role you want included, even briefly described.">
          <ExperienceFields
            items={formData.experience}
            onChange={(items) => updateField("experience", items)}
            error={mergedErrors.experience}
          />
        </FormSection>
      )}

      {currentStep === 3 && (
        <FormSection title="Projects" description="Optional, but strong for portfolio-style applications.">
          <ProjectFields items={formData.projects} onChange={(items) => updateField("projects", items)} />
        </FormSection>
      )}

      {currentStep === 4 && (
        <FormSection title="Education">
          <EducationFields items={formData.education} onChange={(items) => updateField("education", items)} />
        </FormSection>
      )}

      {currentStep === 5 && (
  <FormSection title="Certifications" description="Optional. List any relevant certifications.">
    <CertificationFields
      items={formData.certifications}
      onChange={(items) => updateField("certifications", items)}
    />
  </FormSection>
)}

{currentStep === 6 && (
  <>
    <FormSection title="Target Job" description="The role and company you're applying to.">
      <TextField
        id="targetJob"
        label="Target job title / company"
        required
        value={formData.targetJob}
        onChange={(e) => updateField("targetJob", e.target.value)}
        error={mergedErrors.targetJob}
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
  </>
)}

      <div className="flex items-center justify-between gap-3 pt-6">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-40"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {!isLastStep && (
          <button type="button" onClick={handleNext} className="btn-primary flex items-center gap-2">
            Next
            <ArrowRight size={16} />
          </button>
        )}

   {isLastStep && (
  <div className="flex flex-wrap justify-end gap-2">
    <button
      type="button"
      onClick={onGenerateResume}
      disabled={isLoading}
      className="btn-primary flex items-center px-2 py-2 "
    >
      <Wand2 size={16} />
      Generate CV
    </button>
   
  </div>
)}
      </div>
    </form>
  );
}