// app/api/email/summarize/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { generateCompletion } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitResult = await rateLimit(userId);
    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    const body = await req.json();
    const { email } = schema.parse(body);

    // Generate summary
    const completion = await generateCompletion([
      {
        role: "system",
        content:
          "You are an email assistant. Summarize the following email in a concise way, extracting key points and action items. Format your response as JSON with fields: summary (string), keyPoints (array), sentiment (string).",
      },
      {
        role: "user",
        content: email,
      },
    ]);

    const result = JSON.parse(completion.content || "{}");

    // Store in database
    const emailSummary = await prisma.emailSummary.create({
      data: {
        userId,
        originalEmail: email,
        summary: result.summary,
        keyPoints: result.keyPoints,
        sentiment: result.sentiment,
      },
    });

    // Update usage
    await prisma.usage.upsert({
      where: {
        userId_date: {
          userId,
          date: new Date().setHours(0, 0, 0, 0),
        },
      },
      update: {
        tokensUsed: { increment: completion.tokens },
        requests: { increment: 1 },
      },
      create: {
        userId,
        tokensUsed: completion.tokens,
        requests: 1,
      },
    });

    return NextResponse.json(emailSummary);
  } catch (error) {
    console.error("Email summarization error:", error);
    return NextResponse.json(
      { error: "Failed to summarize email" },
      { status: 500 },
    );
  }
}
