import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;
}
