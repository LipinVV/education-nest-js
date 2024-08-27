import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class BookBodyValidatorPipe implements PipeTransform {
  private readonly schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(5).required(),
    description: Joi.string().min(5).max(50).optional(),
    authors: Joi.string().min(5).max(50).optional(),
    favourite: Joi.string().valid('0', '1').optional(),
    fileCover: Joi.string().min(5).max(30).optional(),
    fileName: Joi.string().min(5).max(30).optional(),
    fileBook: Joi.string().min(5).max(30).optional(),
  });

  transform(value: unknown): unknown {
    const { error, value: validatedValue } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(`Validation failed: ${error.message}`);
    }

    return validatedValue;
  }
}
