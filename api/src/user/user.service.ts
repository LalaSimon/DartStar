import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user ?? null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user ?? null;
  }
}
