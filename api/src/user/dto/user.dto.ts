import { Exclude, Expose } from 'class-transformer';
import { PlayerInfoDto } from 'src/player/dto/PlayerInfo.dto';

export class UserDto {
  @Expose()
  id: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  isOnline: boolean;
  lastTimeOnline: Date;
  player: PlayerInfoDto;

  @Exclude()
  password: string;
}
