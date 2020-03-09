 
import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}