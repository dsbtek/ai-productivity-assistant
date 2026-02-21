import { generateWithOllama } from "./ollama";

async function generateWithCloud(prompt: string, system?: string) {
  console.log("Cloud fallback requested but not implemented");
  throw new Error("Cloud fallback not implemented");
}

export async function generateWithFallback(prompt: string, system?: string) {
  try {
    // Try local Ollama first
    return await generateWithOllama(prompt, system);
  } catch (error) {
    console.log("Ollama failed, falling back to cloud API");
    // Fallback to OpenAI or other cloud provider
    return await generateWithCloud(prompt, system);
  }
}
