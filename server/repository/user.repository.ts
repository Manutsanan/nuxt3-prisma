import type { UserResponse } from '../../models/user.model';
import prisma from '../client';

prisma.$connect();

interface IUserRepository {
  getUsers(): Promise<UserResponse[]>;
  getUserById(refId: string): Promise<UserResponse>;
}

class PrismaUserRepository implements IUserRepository {
  async getUsers(): Promise<UserResponse[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error('Something went wrong.');
    } finally {
      prisma.$disconnect()
    }
  }
  async getUserById(refId: string): Promise<UserResponse> {
    try {
      const user: any = await prisma.user.findUnique({
        where: {
          id: refId,
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
export default PrismaUserRepository;
