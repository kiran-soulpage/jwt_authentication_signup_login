import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const main = async () => {
  console.log(`Start seeding ...`);
 
  console.log(`Ended seeding ...`);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
