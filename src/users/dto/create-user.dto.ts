import { IsString, IsEmail, Length, IsEnum } from "class-validator";
import { Education } from '../education.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 20)
  firstName: string;

  @IsString()
  @Length(5, 50)
  lastName: string;

  @IsEnum(Education)
  education: string;
}