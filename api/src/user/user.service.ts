import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaClient } from 'generated/prisma';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsers(): Promise<UserDto[]> {
    return (
      this.prisma.user
        .findMany()
        .then((users) => users.map((user) => plainToInstance(UserDto, user))) ??
      []
    );
  }

  async getUserById(id: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user ? plainToInstance(UserDto, user) : null;
  }

  async getUserByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user ? plainToInstance(UserDto, user) : null;
  }
}
