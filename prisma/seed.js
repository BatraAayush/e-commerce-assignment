import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';


const prisma = new PrismaClient();

async function main() {
  await prisma.category.deleteMany();
  const categories = Array.from({ length: 100 }, () => ({
    name: faker.commerce.department()
  }));
  await prisma.category.createMany({
    data: categories,
  });
  
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
