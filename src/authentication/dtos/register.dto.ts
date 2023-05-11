import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateAddressDto } from 'src/address/dtos/create-address.dto';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  address: CreateAddressDto;
}

export default RegisterDto;
