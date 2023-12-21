import { IsNumber, IsNotEmpty, IsString, Min, IsInt } from 'class-validator';

export class DepositDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}

export class RollbackDto {
  @IsNotEmpty()
  @IsString()
  deposit_id: string;
}
