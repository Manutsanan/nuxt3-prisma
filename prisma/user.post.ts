import bcrypt from 'bcryptjs';
import { Response, ResponseMessage } from "~/models/http.model";
import type { CreateUser, UserResponse } from '../../models/user.model';
import PrismaUserRepository from '../repository/user.repository';

export default defineEventHandler(async (event) => {
  const req = await readBody(event)

  try {

    const payloads: CreateUser = {
      username: req?.username || '',
      password: bcrypt.hashSync(req?.password, 10)
    }

    const userRepository = new PrismaUserRepository();
    const user: UserResponse = await userRepository.createUser(payloads);

    event.node.res.statusCode = 200
    event.node.res.statusMessage = 'succes'

    const response: Response<UserResponse> = {
      status: {
        code: '200',
        message: 'Success.'
      },
      data: user
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
