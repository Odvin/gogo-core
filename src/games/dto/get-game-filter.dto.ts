import { IsOptional, IsNotEmpty, IsEnum } from "class-validator";
import { GameStatus } from "../game-status.enum";

export class GetGameFilterDto {
  @IsOptional()
  @IsEnum(GameStatus)
  status: GameStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}