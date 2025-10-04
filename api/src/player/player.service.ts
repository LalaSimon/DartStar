import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaClient) {}

  async createPlayer(createPlayerDto: CreatePlayerDto, ownerId: string) {
    // Check if user already has a player
    const existingPlayer = await this.prisma.player.findUnique({
      where: { ownerId },
    });

    if (existingPlayer) {
      throw new NotAcceptableException('User already has a player');
    }

    // Create new player and update user with playerId in a transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // Create new player
      const player = await tx.player.create({
        data: {
          name: createPlayerDto.name,
          lastname: createPlayerDto.lastname,
          nickname: createPlayerDto.nickname,
          owner: {
            connect: { id: ownerId },
          },
        },
      });

      // Update user with playerId
      await tx.user.update({
        where: { id: ownerId },
        data: { playerId: player.id },
      });

      return player;
    });

    return result;
  }
}
