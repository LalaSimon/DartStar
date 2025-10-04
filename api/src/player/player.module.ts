import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaClient } from 'generated/prisma';

@Module({
  providers: [PlayerService, PrismaClient],
  controllers: [PlayerController],
})
export class PlayerModule {}
