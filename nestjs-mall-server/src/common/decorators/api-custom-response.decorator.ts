import { ApiResponse } from '@nestjs/swagger';

export const ApiCustomResponse = (type: any, options: any = {}) => {
  const reflect = Reflect.getMetadata('error-code', type);
  return ApiResponse({
    ...options,
    status: reflect.code,
    description: reflect.description
  });
};
