// lib/openai.ts
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCompletion(
  messages: any[],
  model: string = "gpt-4-turbo-preview",
) {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      content: response.choices[0].message.content,
      tokens: response.usage?.total_tokens || 0,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}
