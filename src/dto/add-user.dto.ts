import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
