// lib/ollama.ts
import { Ollama } from "ollama";

const ollama = new Ollama({
  host: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
});

export async function generateWithOllama(
  prompt: string,
  system?: string,
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    format?: "json";
  },
) {
  const model = options?.model || process.env.OLLAMA_MODEL || "phi4-mini:latest";

  const messages = [];
  if (system) {
    messages.push({ role: "system", content: system });
  }
  messages.push({ role: "user", content: prompt });

  try {
    const response = await ollama.chat({
      model,
      messages,
      options: {
        temperature: options?.temperature || 0.7,
        num_predict: options?.maxTokens || 1000,
      },
      format: options?.format,
    });

    return {
      content: response.message.content,
      tokens: response.eval_count || 0,
      model: response.model,
    };
  } catch (error) {
    console.error("Ollama API error:", error);
    throw error;
  }
}
