import { ValidationError } from 'class-validator';
import { HttpException } from '@nestjs/common';

export class CustomValidationError extends HttpException {
  errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super('ValidationError', 421);
    this.errors = errors;
  }
}
