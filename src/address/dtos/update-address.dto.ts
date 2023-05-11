import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  country: string;
}
