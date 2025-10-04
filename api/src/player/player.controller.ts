import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';

@Controller('player')
@ApiTags('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  //   @Get()
  //   @ApiOperation({ summary: 'Get all players' })
  //   @ApiResponse({ status: 200, description: 'Players fetched successfully' })
  //   async getPlayers() {
  //     return await this.playerService.getPlayers();
  //   }

  //   @Get(':id')
  //   @ApiOperation({ summary: 'Get player by ID' })
  //   @ApiResponse({ status: 200, description: 'Player fetched successfully' })
  //   @ApiResponse({ status: 404, description: 'Player not found' })
  //   async getPlayerById(@Param('id') id: string) {
  //     return await this.playerService.getPlayerById(id);
  //   }

  @Post(':ownerId')
  @ApiOperation({ summary: 'Create a player' })
  @ApiResponse({ status: 201, description: 'Player created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid player data' })
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
    @Param('ownerId', new ParseUUIDPipe()) ownerId: string,
  ) {
    return await this.playerService.createPlayer(createPlayerDto, ownerId);
  }
}
