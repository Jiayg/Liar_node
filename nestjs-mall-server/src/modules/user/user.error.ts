import { CustomError } from './../../common/exceptions/custom.error';
import { ErrorCode } from 'src/common/decorators/error-code.decorator';

@ErrorCode(640, '用户未找到')
export class UserNotFoundException extends CustomError { }
@ErrorCode(641, '密码错误')
export class WrongPasswordException extends CustomError { }
@ErrorCode(642, '未给用户配置菜单权限')
export class UserNotConfiguredMenuException extends CustomError { }
@ErrorCode(643, '没有权限')
export class ForbiddenException extends CustomError { }