import { CustomError } from './../../common/exceptions/custom.error';
import { ErrorCode } from 'src/common/decorators/error-code.decorator';

@ErrorCode(640, '未找到用户名')
export class UserNotFoundException extends CustomError { }
@ErrorCode(642, '该账户已被禁用')
export class UserDisableException extends CustomError { }
@ErrorCode(642, '密码错误')
export class WrongPasswordException extends CustomError { }
@ErrorCode(643, '未给用户配置菜单权限')
export class UserNotConfiguredMenuException extends CustomError { }
@ErrorCode(644, '没有权限')
export class ForbiddenException extends CustomError { }