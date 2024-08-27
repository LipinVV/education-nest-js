import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class BookUrlValidatorPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      throw new BadRequestException('Validation failed: Not a number');
    }

    if (parsedValue <= 0) {
      throw new BadRequestException(
        'Validation failed: Number must be positive',
      );
    }

    return parsedValue;
  }
}
