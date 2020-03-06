import { IsString, IsEmail, Length, IsEnum } from "class-validator";
import { Gender } from '../gender.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 50)
  username: string;

  @IsEnum(Gender)
  gender: string;
}