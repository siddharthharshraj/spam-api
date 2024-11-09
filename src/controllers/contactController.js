const prisma = require('../config/db');

async function addContact(req, res) {
  const { name, phone, isSpam } = req.body;
  const contact = await prisma.contact.create({
    data: { userId: req.userId, name, phone, isSpam },
  });
  res.status(201).json(contact);
}

async function searchByName(req, res) {
  const { query } = req.query;
  const results = await prisma.contact.findMany({
    where: {
      OR: [
        { name: { startsWith: query } },
        { name: { contains: query } },
      ],
    },
  });
  res.json(results);
}

async function searchByPhone(req, res) {
  const { phone } = req.query;
  const result = await prisma.contact.findMany({ where: { phone } });
  res.json(result);
}

module.exports = { addContact, searchByName, searchByPhone };
