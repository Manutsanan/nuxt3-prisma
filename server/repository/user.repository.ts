import type { UserResponse } from '../../models/user.model';
import prisma from '../client';

prisma.$connect();

interface IUserRepository {
  getUsers(): Promise<UserResponse[]>;
}

class PrismaUserRepository implements IUserRepository {
  async getUsers(): Promise<UserResponse[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error('Error getting users');
    }
  }
}
export default PrismaUserRepository;
