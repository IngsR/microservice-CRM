import { IsString, IsNotEmpty, IsNumber, IsIn, IsInt } from 'class-validator';
import { DealStatus } from '../entities/deal.entity';

export class CreateDealDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  value: number;

  @IsIn([DealStatus.OPEN, DealStatus.WON, DealStatus.LOST])
  status: DealStatus;

  @IsInt()
  ownerId: number;

  @IsInt()
  customerId: number;

  @IsInt()
  companyId: number;
}
