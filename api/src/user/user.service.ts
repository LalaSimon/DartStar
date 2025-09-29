import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, User } from 'generated/prisma';
import { CreateUserDto } from './dto/createUser.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

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

  async createUser(user: CreateUserDto): Promise<User> {
    const existingUser = await this.getUserByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await hash(user.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async deleteUser(id: string) {
    const existingUser = await this.getUserById(id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    } else {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    }
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const existingUser = await this.getUserById(id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...user,
        password: user.password
          ? await hash(user.password, 10)
          : existingUser.password,
      },
    });

    return updatedUser;
  }
}
