import { useCallback, useState } from "react";
import { generateDocuments } from "../services/api.js";

/**
 * Encapsulates the async generation lifecycle: idle -> loading -> success/error.
 * Keeping this in a hook lets the page component stay focused on layout.
 */
export function useGenerate() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const generate = useCallback(async (formData, mode = "both") => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const data = await generateDocuments(formData, mode);
      setResult(data);
      setStatus("success");
      return data;
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong while generating your documents.");
      setStatus("error");
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setErrorMessage("");
  }, []);

  return { status, result, errorMessage, generate, reset };
}
