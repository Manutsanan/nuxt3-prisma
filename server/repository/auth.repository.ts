import type { UserResponse } from '../../models/user.model';
import prisma from '../client';

prisma.$connect();

interface IAuthRepository {
  login(username: string): Promise<UserResponse>;
}

class PrismaAuthRepository implements IAuthRepository {
  async login(username: string): Promise<UserResponse> {
    try {
      const user: any = await prisma.user.findUnique({
        where: {
          username: username,
        }
      });

      return user;
    } catch (error) {
      throw new Error('Something went wrong.');
    } finally {
      prisma.$disconnect()
    }
  }
}
export default PrismaAuthRepository;
