

ResumeAI takes a single structured form (personal info, experience, projects, education, target job) and turns it into:

- An **ATS-friendly resume**, structured with standard headings so applicant tracking systems can parse it
- A **tailored cover letter**, written to match the tone of the resume and the target role
- A **live preview** of both, rendered as real typography — not raw JSON
- **Downloadable `.docx` files** for each, built with the `docx` npm package
- **Copy to clipboard** for quick pasting into other tools

The AI call happens entirely on the backend. The API key is never sent to, or accessible from, the browser.

---

## Features

- Multi-section resume form: personal info, summary, skills, experience (repeatable), projects (repeatable), education (repeatable), certifications, target job, additional notes
- Client-side validation with inline error messages
- Backend returns structured JSON (not prose), so the frontend can render a real layout
- Resume and cover letter preview with tabs
- Real `.docx` export for both documents
- Toast notifications for success/error states
- Animated loading state with step-by-step progress while the AI generates content
- Empty state and error state (with retry) for the preview panel
- Responsive, desktop-first layout with a light theme and blue gradient accent

---

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React icons

**Backend**
- Vercel Serverless Functions (Node.js)
- Google Gemini API (`gemini-flash-latest`, structured JSON output)

**Document generation**
- `docx` (build real Word documents)
- `file-saver` (trigger browser downloads)

**Deployment**
- Vercel (static frontend + serverless API in one project)

---

## Architecture

```
Browser (React)
   │
   │  POST /api/generate  { formData, mode }
   ▼
Vercel Serverless Function (api/generate.js)
   │
   │  builds a prompt from formData
   │  calls Gemini with responseMimeType: "application/json"
   ▼
Gemini API
   │
   │  returns structured JSON
   ▼
Vercel Function
   │  validates + normalizes the JSON shape
   │  returns { data: {...} } to the browser
   ▼
React
   │  renders ResumePreview / CoverLetterPreview from the JSON
   │  on "Download", builds a .docx with the `docx` package
   ▼
User's browser downloads Resume.docx / CoverLetter.docx
```

The Gemini API key lives only in the Vercel Function's environment (`process.env.GEMINI_API_KEY`). The frontend has no knowledge of it and only ever calls `POST /api/generate`.

---

## Folder Structure

```
resumeai/
├── api/
│   └── generate.js          # Vercel serverless function — the only place the Gemini key is used
├── src/
│   ├── components/          # Reusable UI: forms, previews, navbar, footer, states
│   ├── pages/                # LandingPage, GeneratorPage, NotFoundPage
│   ├── hooks/                # useGenerate (async lifecycle), useToast
│   ├── services/             # api.js — thin fetch wrapper for /api/generate
│   ├── utils/                 # docxGenerator.js, validation.js, constants.js
│   └── styles/                # Tailwind entry point
├── public/
├── .env.example
├── vercel.json
├── tailwind.config.js
└── vite.config.js
```

---

## Installation

```bash
git clone <your-repo-url>
cd resumeai
npm install
```

## Environment Variables

Copy the example file and add your own Gemini API key (free at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)):

```bash
cp .env.example .env
```

```
GEMINI_API_KEY=your_gemini_api_key_here
```

## Running Locally

The frontend and the serverless API run separately in local development:

```bash
# Terminal 1 — serves the serverless function at localhost:3000
npx vercel dev --listen 3000

# Terminal 2 — serves the React app at localhost:5173, proxying /api to :3000
npm run dev
```

Then open `http://localhost:5173`.

> If you don't want to install the Vercel CLI, you can also adapt `api/generate.js` into an Express route for local-only development — the logic is framework-agnostic.

## Deployment

1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/new).
3. In the Vercel project settings, add the environment variable `GEMINI_API_KEY`.
4. Deploy — Vercel automatically detects the Vite frontend and the `api/` serverless function.

---

## Notes on the AI Response Contract

`api/generate.js` prompts Gemini to return JSON in this exact shape, and normalizes the response so the frontend never has to guard against missing fields:

```json
{
  "summary": "string",
  "skills": ["string"],
  "experience": [
    { "role": "string", "company": "string", "location": "string", "dateRange": "string", "bullets": ["string"] }
  ],
  "projects": [{ "name": "string", "bullets": ["string"] }],
  "education": [{ "degree": "string", "school": "string", "dateRange": "string", "honors": "string" }],
  "certifications": "string",
  "cover_letter": "string"
}
