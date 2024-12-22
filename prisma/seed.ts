import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initPosts: Prisma.PostCreateInput[] = [
  {
    title: "Hello, World!",
    author: {
      connectOrCreate: {
        where: { email: "test" },
        create: { email: "test", hashPassword: "password" },
      },
    },
    slug: "hello-world",
    content: "This is a test post",
  },
];

async function main() {
  console.log("Start seeding ...");
  for (const post of initPosts) {
    const newPost = await prisma.post.create({ data: post });
    console.log(`Created post with id: ${newPost.id}`);
  }
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
