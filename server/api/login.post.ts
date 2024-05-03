import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response, ResponseMessage } from "~/models/http.model";
import type { UserResponse } from '../../models/user.model';
import PrismaAuthRepository from '../repository/auth.repository';

export default defineEventHandler(async (event) => {
  const config: any = useRuntimeConfig()
  const req = await readBody(event)

  try {
    const username: string = req.username || ''
    const password: string = req.password || ''

    const authRepository = new PrismaAuthRepository();
    const user: UserResponse = await authRepository.login(username);
    if (!user) {
      throw new Error("Username or password incorrect.");
    }

    const isCompare = await bcrypt.compare(password, user?.password);
    if (!isCompare) {
      throw new Error("Username or password incorrect.");
    }

    const token = jwt.sign(
      { data: user, expiresIn: 60 * 60 * 24 * 7 },
      config.jwtSecret
    );

    event.node.res.statusCode = 200
    event.node.res.statusMessage = 'succes'

    const response: Response<string> = {
      status: {
        code: '200',
        message: 'Success.'
      },
      data: token
    }

    return response
  } catch (e) {
    event.node.res.statusCode = 400
    event.node.res.statusMessage = 'error'

    const response: ResponseMessage = {
      code: '400',
      message: 'Something went wrong.'
    }

    return response
  }
})
