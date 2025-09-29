import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SELF_ONLY_KEY } from '../decorators/self-only.decorator';

@Injectable()
export class SelfOnlyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isSelfOnly = this.reflector.getAllAndOverride<boolean>(
      SELF_ONLY_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isSelfOnly) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.userId !== request.params.id) {
      throw new ForbiddenException('You can only modify your own account');
    }

    return true;
  }
}
