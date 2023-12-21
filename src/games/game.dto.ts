import { IsNumber, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}

export class BuyGameDto {
  @IsNotEmpty()
  @IsString()
  game_id: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}
