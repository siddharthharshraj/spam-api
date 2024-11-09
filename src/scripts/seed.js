const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function seed() {
  const users = [];
  
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        password: await hashPassword('password123'),
      },
    });
    users.push(user);
  }

  console.log('Seeded users:', users);
  await prisma.$disconnect();
}

seed();
