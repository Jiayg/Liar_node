import { SetMetadata } from "@nestjs/common"

export function ErrorCode(code: number, description: string): any {
    const meta = SetMetadata('error-code', {
        code,
        description
    });

    const item = (constructor: any, key?: any, descriptor?: any) => {
        constructor.prototype.description = description;
        constructor.prototype.code = code;
        return meta(constructor, key, descriptor);
    };
    return item;
}