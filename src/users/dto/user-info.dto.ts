import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsEnum } from "class-validator";
import { Gender } from "../gender.enum";

export class UserInfoDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  username: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}