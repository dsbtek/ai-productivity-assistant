export function selectModel(task: string): string {
  const models = {
    email: process.env.OLLAMA_EMAIL_MODEL || "mistral",
    code: process.env.OLLAMA_CODE_MODEL || "codellama",
    qa: process.env.OLLAMA_QA_MODEL || "llama2:7b",
    summary: process.env.OLLAMA_SUMMARY_MODEL || "llama2:7b",
  };

  return (
    models[task as keyof typeof models] || process.env.OLLAMA_MODEL || "llama2"
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
