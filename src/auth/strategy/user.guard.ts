import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  // даже пустой вернёт {"timestamp":"2024-08-28T16:53:05.017Z","status":"fail","data":{"message":"Unauthorized","statusCode":401},"code":401}
  // в случае отсутствия авторизации
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
