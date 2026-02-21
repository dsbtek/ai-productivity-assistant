import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateWithOllama } from "@/lib/ollama";
import { selectModel } from "@/lib/model-selector";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(1),
  language: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { code, language } = schema.parse(body);

    const systemPrompt = `You are a code explanation assistant. Explain the following ${language} code in detail. Format as JSON with fields: explanation (string), suggestions (array), complexity (string).`;
    const userPrompt = code;

    const model = selectModel("code");

    const completion = await generateWithOllama(
      userPrompt,
      systemPrompt,
      {
        model,
        format: "json",
        temperature: 0.2
      }
    );

    let result;
    try {
      result = JSON.parse(completion.content || "{}");
    } catch (e) {
      result = {};
    }

    const analysis = await prisma.codeAnalysis.create({
      data: {
        userId,
        code,
        language,
        explanation: result.explanation || completion.content,
        suggestions: result.suggestions || [],
        complexity: result.complexity || "Unknown",
      },
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Code explanation error:", error);
    return NextResponse.json(
      { error: "Failed to explain code" },
      { status: 500 },
    );
  }
}
