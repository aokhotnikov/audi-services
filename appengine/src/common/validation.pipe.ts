import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      // throw new BadRequestException(errors[0].constraints);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Validation failed',
        message: errors[0].constraints
      }, HttpStatus.BAD_REQUEST)
    }

    return value;
  }

  /**
   * The method is responsible for bypassing the validation step when the current argument being processed is a native
   * JavaScript type (these can't have schemas attached, so there's no reason to run them through the validation step)
   * @param {Function} metatype
   * @return {boolean}
   */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
