export function selectModel(task: string): string {
  const models = {
    email: process.env.OLLAMA_EMAIL_MODEL || "smollm2:latest",
    code: process.env.OLLAMA_CODE_MODEL || "deepseek-coder:latest",
    qa: process.env.OLLAMA_QA_MODEL || "phi4-mini:latest",
    summary: process.env.OLLAMA_SUMMARY_MODEL || "smollm2:latest",
  };

  return (
    models[task as keyof typeof models] || process.env.OLLAMA_MODEL || "phi4-mini:latest"
  );
}

// Response caching
const responseCache = new Map<
  string,
  { response: string; timestamp: number }
>();
const CACHE_TTL = 3600000; // 1 hour

export function getCachedResponse(key: string): string | null {
  const cached = responseCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.response;
  }
  return null;
}
