// POST /api/generate
//
// This is the ONLY place the Gemini API key is used. It is read from an
// environment variable at runtime and never sent to, or referenced by, the
// browser. The frontend only ever talks to this endpoint.
//
// Expected body: { formData: {...}, mode: "resume" | "cover_letter" | "both" }
// Response:      { data: { summary, skills, experience, education, projects, cover_letter } }

const GEMINI_MODEL = "gemini-flash-latest";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in the environment.");
    return res.status(500).json({ error: "Server is not configured. Missing API key." });
  }

  const { formData, mode = "both" } = req.body || {};

  const validationError = validateRequestBody(formData, mode);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const prompt = buildPrompt(formData, mode);

    const geminiResponse = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errBody = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errBody);
      return res.status(502).json({ error: "The AI service failed to respond. Please try again." });
    }

    const geminiJson = await geminiResponse.json();
    const rawText = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error("Unexpected Gemini response shape:", JSON.stringify(geminiJson).slice(0, 500));
      return res.status(502).json({ error: "The AI service returned an empty response." });
    }

    const parsed = safeParseJson(rawText);
    if (!parsed) {
      console.error("Failed to parse Gemini output as JSON:", rawText.slice(0, 500));
      return res.status(502).json({ error: "The AI response could not be parsed. Please try again." });
    }

    return res.status(200).json({ data: normalizeAiResponse(parsed) });
  } catch (err) {
    console.error("Unhandled error in /api/generate:", err);
    return res.status(500).json({ error: "Something went wrong while generating your documents." });
  }
}

function validateRequestBody(formData, mode) {
  if (!formData || typeof formData !== "object") {
    return "Missing form data.";
  }
  if (!["resume", "cover_letter", "both"].includes(mode)) {
    return "Invalid generation mode.";
  }
  if (!formData.personal?.fullName?.trim()) {
    return "Full name is required.";
  }
  if (!formData.targetJob?.trim()) {
    return "Target job is required.";
  }
  return null;
}

function buildPrompt(formData, mode) {
  const { personal, summary, skills, experience, projects, education, certifications, targetJob, additionalNotes } =
    formData;

  const experienceText = (experience || [])
    .filter((e) => e.role || e.company)
    .map(
      (e) =>
        `- Role: ${e.role || "N/A"} at ${e.company || "N/A"} (${e.location || "N/A"}, ${e.startDate || "?"} to ${
          e.endDate || "?"
        }). Notes: ${e.description || "none"}`
    )
    .join("\n");

  const projectsText = (projects || [])
    .filter((p) => p.name)
    .map((p) => `- ${p.name}${p.link ? ` (${p.link})` : ""}: ${p.description || "no description"}`)
    .join("\n");

  const educationText = (education || [])
    .filter((e) => e.school || e.degree)
    .map(
      (e) =>
        `- ${e.degree || "N/A"} in ${e.field || "N/A"} from ${e.school || "N/A"} (${e.startDate || "?"}-${
          e.endDate || "?"
        })`
    )
    .join("\n");

  return `You are an expert resume writer and career coach. Using the candidate details below, produce content for ${
    mode === "resume" ? "a resume only" : mode === "cover_letter" ? "a cover letter only" : "a resume AND a cover letter"
  }.

CANDIDATE DETAILS
Name: ${personal.fullName}
Target job: ${targetJob}
Background notes: ${summary}
Raw skills list: ${skills}
Certifications: ${certifications || "none"}
Additional notes: ${additionalNotes || "none"}

Experience:
${experienceText || "none provided"}

Projects:
${projectsText || "none provided"}

Education:
${educationText || "none provided"}

INSTRUCTIONS
- Write a concise, ATS-friendly professional summary (2-4 sentences), tailored to the target job.
- Expand the raw skills list into a clean array of 8-14 relevant skills, prioritizing ones relevant to the target job.
- For each experience entry, write 2-4 strong, quantifiable-where-possible bullet points in active voice. Keep the same role/company/location, and format startDate-endDate into a single "dateRange" string.
- For each project, write 1-3 bullet points describing what it does and the impact/stack used.
- For each education entry, keep degree/school, format the years into "dateRange", and put any honors/distinction in "honors".
- Write a complete, tailored cover letter (3-4 paragraphs: opening hook, relevant experience/value, why this role/company, closing call to action). Do not include a greeting like "Dear Hiring Manager" as a separate field — write it as the first line of the letter text. Separate paragraphs with a double newline.
- Do not invent specific employers, metrics, or credentials that contradict what was given — you may reasonably phrase and expand on what was provided, but stay grounded in it.
- Return ONLY valid JSON, no markdown fences, no commentary, matching EXACTLY this shape:

{
  "summary": "string",
  "skills": ["string", "..."],
  "experience": [
    { "role": "string", "company": "string", "location": "string", "dateRange": "string", "bullets": ["string"] }
  ],
  "projects": [
    { "name": "string", "bullets": ["string"] }
  ],
  "education": [
    { "degree": "string", "school": "string", "dateRange": "string", "honors": "string" }
  ],
  "certifications": "string",
  "cover_letter": "string"
}`;
}

function safeParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    // Gemini occasionally wraps JSON in markdown fences despite instructions; strip and retry.
    const stripped = text.replace(/```json|```/g, "").trim();
    try {
      return JSON.parse(stripped);
    } catch {
      return null;
    }
  }
}

// Ensures every field the frontend expects is present, even if the model omits one.
function normalizeAiResponse(data) {
  return {
    summary: data.summary || "",
    skills: Array.isArray(data.skills) ? data.skills : [],
    experience: Array.isArray(data.experience) ? data.experience : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    education: Array.isArray(data.education) ? data.education : [],
    certifications: data.certifications || "",
    cover_letter: data.cover_letter || "",
  };
}
