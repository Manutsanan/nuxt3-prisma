
import { Response, ResponseMessage } from "~/models/http.model";
import type { UserResponse } from '../../models/user.model';
import PrismaUserRepository from '../repository/user.repository';


export default defineEventHandler(async (event) => {
  try {
    const userRepository = new PrismaUserRepository();
    const users: UserResponse[] = await userRepository.getUsers();

    event.node.res.statusCode = 200
    event.node.res.statusMessage = 'succes'

    let response: Response<UserResponse[]> = {
      status: {
        code: '200',
        message: 'Success.'
      },
      data: users
    }

    return response
  } catch (e) {
    event.node.res.statusCode = 400
    event.node.res.statusMessage = 'error'

    let response: ResponseMessage = {
      code: '400',
      message: 'Something went wrong.'
    }

    return response
  }
})
