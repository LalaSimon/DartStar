import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaClient } from 'generated/prisma';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaClient],
  exports: [UserService, PrismaClient], // Eksportujemy też PrismaClient dla AuthModule
})
export class UserModule {}
