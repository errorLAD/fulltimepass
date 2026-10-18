import { PrismaClient } from "@prisma/client";
import { TOOLS } from "../src/lib/data/tools";
import {
  RED_FLAG_QUESTIONS,
  EX_YAAD_QUESTIONS,
  SHAADI_QUESTIONS,
  AUKAAT_QUESTIONS,
  PERSONALITY_QUESTIONS,
  KALESH_QUESTIONS,
  PERSONALITY_RESULTS,
  ROAST_STYLES,
  CHAT_ROLES_POOL,
  MAIN_CHARACTER_QUESTIONS,
} from "../src/lib/data/toolData";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding FullTimePass database...");

  for (const t of TOOLS) {
    const tool = await prisma.tool.upsert({
      where: { slug: t.slug },
      update: {
        title: t.title,
        description: t.description,
        category: t.category,
        icon: t.icon,
        displayOrder: t.displayOrder,
        enabled: true,
      },
      create: {
        id: t.id,
        slug: t.slug,
        title: t.title,
        description: t.description,
        category: t.category,
        icon: t.icon,
        displayOrder: t.displayOrder,
        enabled: true,
      },
    });

    // Seed questions for quiz-based tools
    if (t.slug === "red-flag-meter") {
      await prisma.question.deleteMany({ where: { toolId: tool.id } });
      for (let i = 0; i < RED_FLAG_QUESTIONS.length; i++) {
        const q = RED_FLAG_QUESTIONS[i];
        await prisma.question.create({
          data: {
            toolId: tool.id,
            questionText: q.question,
            displayOrder: i + 1,
            answerOptions: q.options,
            scoringConfig: { hint: q.hint },
          },
        });
      }
    } else if (t.slug === "ex-yaad-meter") {
      await prisma.question.deleteMany({ where: { toolId: tool.id } });
      for (let i = 0; i < EX_YAAD_QUESTIONS.length; i++) {
        const q = EX_YAAD_QUESTIONS[i];
        await prisma.question.create({
          data: {
            toolId: tool.id,
            questionText: q.question,
            displayOrder: i + 1,
            answerOptions: q.options,
          },
        });
      }
    } else if (t.slug === "personality-test") {
      await prisma.question.deleteMany({ where: { toolId: tool.id } });
      for (let i = 0; i < PERSONALITY_QUESTIONS.length; i++) {
        const q = PERSONALITY_QUESTIONS[i];
        await prisma.question.create({
          data: {
            toolId: tool.id,
            questionText: q.question,
            displayOrder: i + 1,
            answerOptions: q.options,
          },
        });
      }

      // Seed result templates
      await prisma.resultTemplate.deleteMany({ where: { toolId: tool.id } });
      for (const [key, res] of Object.entries(PERSONALITY_RESULTS)) {
        await prisma.resultTemplate.create({
          data: {
            toolId: tool.id,
            resultTitle: res.title,
            resultDescription: res.desc,
            tag: key,
            templateVars: {
              quote: res.quote,
              badge: res.badge,
              desiQuote: res.desiQuote,
              strengths: res.strengths,
              weaknesses: res.weaknesses,
            },
          },
        });
      }
    } else if (t.slug === "shaadi-kalesh-predictor") {
      await prisma.question.deleteMany({ where: { toolId: tool.id } });
      for (let i = 0; i < KALESH_QUESTIONS.length; i++) {
        const q = KALESH_QUESTIONS[i];
        await prisma.question.create({
          data: {
            toolId: tool.id,
            questionText: q.question,
            displayOrder: i + 1,
            answerOptions: q.options,
          },
        });
      }
    } else if (t.slug === "aukaat-checker") {
      await prisma.question.deleteMany({ where: { toolId: tool.id } });
      for (let i = 0; i < AUKAAT_QUESTIONS.length; i++) {
        const q = AUKAAT_QUESTIONS[i];
        await prisma.question.create({
          data: {
            toolId: tool.id,
            questionText: q.question,
            displayOrder: i + 1,
            answerOptions: q.options,
          },
        });
      }
    } else if (t.slug === "main-character-syndrome") {
      await prisma.question.deleteMany({ where: { toolId: tool.id } });
      for (let i = 0; i < MAIN_CHARACTER_QUESTIONS.length; i++) {
        const q = MAIN_CHARACTER_QUESTIONS[i];
        await prisma.question.create({
          data: {
            toolId: tool.id,
            questionText: q.question,
            displayOrder: i + 1,
            answerOptions: q.options,
          },
        });
      }
    }
  }

  console.log("Seeding complete! All 20 tools and templates loaded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
