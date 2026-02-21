// app/api/code/explain/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { generateCompletion } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(1),
  language: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { code, language } = schema.parse(body);

    const completion = await generateCompletion([
      {
        role: "system",
        content: `You are a code explanation assistant. Explain the following ${language} code in detail. Format as JSON with fields: explanation (string), suggestions (array), complexity (string).`,
      },
      {
        role: "user",
        content: code,
      },
    ]);

    const result = JSON.parse(completion.content || "{}");

    const analysis = await prisma.codeAnalysis.create({
      data: {
        userId,
        code,
        language,
        explanation: result.explanation,
        suggestions: result.suggestions,
        complexity: result.complexity,
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
s;
