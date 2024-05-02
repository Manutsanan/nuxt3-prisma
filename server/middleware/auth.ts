import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const headers = getHeaders(event)

  setResponseHeaders(event, {
    "access-control-allow-origin": "*"
  });

  const authorization: string[] = headers?.authorization?.split(" ") || []
  const decode: any = authorization[1] && jwt.verify(authorization[1], config.jwtSecret) || null;
  if (decode) {
    const user: any = await prisma.user.findUnique({
      where: {
        id: decode?.data?.id,
      }
    });
    event.context.auth = user
  } else {
    event.context.auth = null
  }
})