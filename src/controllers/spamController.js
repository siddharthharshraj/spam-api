const prisma = require('../config/db');

async function markSpam(req, res) {
  const { phone } = req.body;
  const existingSpam = await prisma.spam.findUnique({ where: { phone } });

  if (existingSpam) {
    await prisma.spam.update({
      where: { phone },
      data: { reports: existingSpam.reports + 1 },
    });
  } else {
    await prisma.spam.create({ data: { phone, reports: 1 } });
  }

  res.json({ message: 'Spam marked successfully' });
}

module.exports = { markSpam };
