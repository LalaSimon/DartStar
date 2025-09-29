import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from 'src/auth/dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from './dto/userResponse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: LoginUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(user.password, existingUser.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const loggedUser = await this.prisma.user.update({
      where: { email: user.email },
      data: { lastTimeOnline: new Date(), isOnline: true },
    });

    const jwtPayload = {
      email: loggedUser.email,
      sub: loggedUser.id,
    };

    const accessToken = this.jwtService.sign(jwtPayload);

    return { accessToken, user: plainToInstance(UserResponseDto, loggedUser) };
  }

  async register(user: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await hash(user.password, 10);

    const newUser = await this.prisma.user.create({
      data: { ...user, password: hashedPassword },
    });

    const tokenPayload = {
      email: newUser.email,
      sub: newUser.id,
    };

    const accessToken = this.jwtService.sign(tokenPayload);

    return { accessToken, user: plainToInstance(UserResponseDto, newUser) };
  }

  async updateUser(user: UpdateUserDto, id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...user, updatedAt: new Date() },
    });

    const tokenPayload = {
      email: updatedUser.email,
      sub: updatedUser.id,
      userId: updatedUser.id,
    };

    const accessToken = this.jwtService.sign(tokenPayload);

    return { accessToken, user: plainToInstance(UserResponseDto, updatedUser) };
  }

  async deleteUser(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }

  async logout(id: string) {
    const lastLoggedOut = await this.prisma.user.update({
      where: { id },
      data: { lastTimeOnline: new Date(), isOnline: false },
    });

    return lastLoggedOut;
  }
}
