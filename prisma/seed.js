const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.profile.create({
      data: {
        username: "lithking",
        password: "@Ashley532904",
        email: "mestre@lithking.com.br",
        coins: 50000,
        xp: 0,
        statistics: {
          wins: 0,
          deaths: 0,
          battles: 0,
        },
      },
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
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
