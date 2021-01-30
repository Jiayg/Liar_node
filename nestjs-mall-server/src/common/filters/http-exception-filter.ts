import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomValidationError } from '../exceptions/custom-validation.error';
import { CustomError } from '../exceptions/custom.error';

/**
 *捕捉过滤http异常
*/
@Catch(SyntaxError, BadRequestException, CustomValidationError, CustomError, HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private response(
        exception: CustomValidationError | BadRequestException | SyntaxError | Error | HttpException,
        host: ArgumentsHost,
        data: any,
        status?: number
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        response.status(status ? status : HttpStatus.BAD_REQUEST).json(data);
    }

    catch(exception: CustomValidationError | BadRequestException | SyntaxError | Error | HttpException, host: ArgumentsHost) {
        const errors = {};
        if (exception instanceof CustomValidationError) {
            exception.errors.forEach((error: ValidationError) => {
                Object.keys(error.constraints).forEach((key: string) => {
                    if (!errors[error.property]) {
                        errors[error.property] = [];
                    }
                    errors[error.property].push(error.constraints[key]);
                });
            });
            return this.response(
                exception,
                host,
                {
                    code: exception.getStatus(),
                    success: false,
                    message: errors
                },
                exception.getStatus()
            );
        }

        if (exception instanceof CustomError) {
            let r = {};
            let code = exception.getStatus();
            if ((exception as any).code) {
                code = (exception as any).code
                r = {
                    code,
                    success: false,
                    message: (exception as any).description
                };
            } else {
                r = {
                    code,
                    success: false,
                    message: exception.message
                };
            }

            // 确保 status code 合法
            if (code < 400 || code >= 1000) code = 999
            return this.response(exception, host, r, code);
        }

        if (exception instanceof SyntaxError) {
            return this.response(exception, host, {
                code: -1,
                success: false,
                message: 'Syntax error'
            });
        }

        if (exception instanceof BadRequestException) {
            const res = JSON.parse(JSON.stringify(exception.getResponse()));
            return this.response(
                exception,
                host,
                {
                    code: 400,
                    success: false,
                    message: res.message[0]
                },
                exception.getStatus()
            );
        }

        if (exception instanceof HttpException) {
            return this.response(
                exception,
                host,
                {
                    code: exception.getStatus(),
                    success: false,
                    message: exception.message
                },
                exception.getStatus()
            );
        }
    }
}
