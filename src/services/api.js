// Thin wrapper around the single backend endpoint. Keeping this isolated means
// the rest of the app never needs to know the request shape or error format.

const ENDPOINT = "/api/generate";

/**
 * Calls the serverless /api/generate function.
 * @param {object} formData - the full resume form state
 * @param {"resume"|"cover_letter"|"both"} mode - what the AI should produce
 * @returns {Promise<{summary, skills, experience, education, projects, cover_letter}>}
 */
export async function generateDocuments(formData, mode = "both") {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData, mode }),
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error("The server returned an unreadable response. Please try again.");
  }

  if (!response.ok) {
    throw new Error(payload?.error || "Generation failed. Please try again.");
  }

  return payload.data;
}
