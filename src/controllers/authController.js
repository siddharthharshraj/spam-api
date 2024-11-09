const prisma = require('../config/db');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

async function register(req, res) {
  const { name, phone, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: { name, phone, email, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
}

async function login(req, res) {
  const { phone, password } = req.body;
  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user.id);
  res.json({ token });
}

module.exports = { register, login };
