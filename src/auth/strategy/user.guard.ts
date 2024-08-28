import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }
  // даже пустой вернёт {"timestamp":"2024-08-28T16:53:05.017Z","status":"fail","data":{"message":"Unauthorized","statusCode":401},"code":401}
  // в случае отсутствия авторизации
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
