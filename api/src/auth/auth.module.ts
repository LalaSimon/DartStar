import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from 'generated/prisma';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { SelfOnlyGuard } from './guard/selft-only.guard';

@Module({
  providers: [
    AuthService,
    PrismaClient,
    JwtStrategy,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    SelfOnlyGuard,
  ],
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
