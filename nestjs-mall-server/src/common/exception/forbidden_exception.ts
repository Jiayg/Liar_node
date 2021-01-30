import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../decorators/error-code.decorator';
import { CustomError } from '../exceptions/custom.error';

@ErrorCode(HttpStatus.FORBIDDEN, '当前用户无权限')
export class ForbiddenException extends CustomError { }