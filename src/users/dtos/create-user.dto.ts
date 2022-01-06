import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(['INVESTOR', 'STORE_KEEPER', 'ADMIN'])
  userType: string
}