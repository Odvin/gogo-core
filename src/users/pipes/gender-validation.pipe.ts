import { PipeTransform, BadRequestException } from "@nestjs/common";
import { Gender } from '../gender.enum';

export class GenderValidationPipe implements PipeTransform {
  transform(value: string) {
    value = value.toLowerCase();

    if (!Gender[value]) {
      throw new BadRequestException(`< ${value} > is invalid gender`)
    }

    return value;
  }
}