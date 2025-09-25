import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.problem.createMany({
    data: [
      {
        title: "Two Sum",
        description: "Given an array of integers, return indices of the two numbers such that they add up to a target.",
        difficulty: "Easy",
        tags: ["array", "hashmap"],
        constraints: "Only one valid answer exists.",
        examples: [
          { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }
        ],
        testCases: [
          { input: [2,7,11,15], target: 9, output: [0,1] },
          { input: [3,2,4], target: 6, output: [1,2] }
        ],
      },
      {
        title: "Reverse String",
        description: "Write a function that reverses a string.",
        difficulty: "Easy",
        tags: ["string"],
        examples: [
          { input: "hello", output: "olleh" }
        ],
        testCases: [
          { input: "hello", output: "olleh" },
          { input: "world", output: "dlrow" }
        ],
      }
    ],
  });

  console.log("Problems seeded!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
