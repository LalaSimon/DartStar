import { Expose } from 'class-transformer';

export class PlayerInfoDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  nickname: string;

  @Expose()
  ownerId: string;

  @Expose()
  doubles: string;

  @Expose()
  scoring: string;

  @Expose()
  mentality: string;

  @Expose()
  charisma: string;

  @Expose()
  consistency: string;
}
