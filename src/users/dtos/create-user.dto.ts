import { IsEmail, IsNotEmpty, IsJSON, IsString, IsEnum, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['USER', 'STORE_KEEPER', 'ADMIN'])
  userType: string
}