import { PipeTransform, BadRequestException } from "@nestjs/common";
import { GameStatus } from "../game-status.enum";


export class GameStatusValidationPipe implements PipeTransform {
  transform(value: string) {
    value = value.toLowerCase();

    if (!GameStatus[value]) {
      throw new BadRequestException(`< ${value} > is invalid game status`)
    }

    return value;
  }
}