import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // ✅ Check if route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      'isPublic',
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  // 🔥 IMPORTANT for cookies
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  // 🔥 Better error handling
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}