import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ResumeForm from "../components/ResumeForm.jsx";
import PreviewPanel from "../components/PreviewPanel.jsx";
import { useGenerate } from "../hooks/useGenerate.js";
import { useToast } from "../hooks/useToast.jsx";
import { INITIAL_FORM_STATE } from "../utils/constants.js";
import { validateForm, isFormValid } from "../utils/validation.js";

export default function GeneratorPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const { status, result, errorMessage, generate, reset } = useGenerate();
  const { notify } = useToast();

  const runGeneration = async (mode) => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (!isFormValid(formData)) {
      notify("Please fill in the required fields before generating.", "error");
      // Scroll to the first error field for a faster fix.
      const firstErrorId = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const data = await generate(formData, mode);
    if (data) {
      notify(
        mode === "cover_letter" ? "Cover letter generated." : "Resume generated.",
        "success"
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-surface-soft py-10">
        <div className="container-app">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-ink-900">Build your resume</h1>
            <p className="mt-2 max-w-xl text-ink-700">
              Fill in as much detail as you have. Rough notes are fine — the AI turns them into polished,
              ATS-friendly language.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_1fr]">
            <ResumeForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              isLoading={status === "loading"}
              onGenerateResume={() => runGeneration("resume")}
              onGenerateCoverLetter={() => runGeneration("cover_letter")}
            />

            <div className="lg:sticky lg:top-24 lg:self-start">
              <PreviewPanel
                status={status}
                result={result}
                errorMessage={errorMessage}
                onRetry={reset}
                personal={formData.personal}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
