import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample prompt templates
  const prompts = await Promise.all([
    prisma.prompt.create({
      data: {
        title: "Email Summary Template",
        content: "Summarize this email in 3 bullet points: {{email_content}}",
        category: "email",
        tags: ["email", "summary"],
        isPublic: true,
        userId: "sample-user-id", // Replace with actual user ID
      },
    }),
    prisma.prompt.create({
      data: {
        title: "Code Explainer",
        content: "Explain this {{language}} code: {{code}}",
        category: "coding",
        tags: ["code", "explanation"],
        isPublic: true,
        userId: "sample-user-id",
      },
    }),
  ]);

  console.log({ prompts });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
