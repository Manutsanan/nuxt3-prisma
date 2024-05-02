import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const config: any = useRuntimeConfig()
  const req = await readBody(event)

  const prisma = new PrismaClient();

  try {
    const getUser: any = await prisma.user.findUnique({
      where: {
        username: req.username,
      }
    });
    if (!getUser) {
      throw new Error("Username or password incorrect.");
    }

    const isCompare = await bcrypt.compare(req?.password, getUser?.password);
    if (!isCompare) {
      throw new Error("Username or password incorrect.");
    }

    const token = jwt.sign(
      { data: getUser, expiresIn: 60 * 60 * 24 * 7 },
      config.jwtSecret
    );

    await prisma.$disconnect()

    return {
      status: {
        code: '200',
        message: 'Success',
      },
      data: token
    }
  } catch (error: any) {
    await prisma.$disconnect()

    return {
      status: {
        code: '400',
        message: error.message,
      },
      data: null
    }
  }
})
