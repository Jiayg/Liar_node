import { HttpException } from "@nestjs/common";

export class CustomError extends HttpException {
    constructor(message: string = '') {
        super(message, 400);
    }
}