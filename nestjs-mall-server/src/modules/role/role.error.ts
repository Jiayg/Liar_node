import { CustomError } from './../../common/exceptions/custom.error';
import { ErrorCode } from 'src/common/decorators/error-code.decorator';

@ErrorCode(740, '未找到角色')
export class RoleNotFoundException extends CustomError { }