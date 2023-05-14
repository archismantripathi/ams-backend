import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.url == '/auth/signin' || req.url == '/auth/validate') {
      return true;
    }
    if (req.headers.authorization) {
      if (
        await this.authService.verifyToken(req.headers.authorization.slice(7))
      ) {
        return true;
      } else {
        throw new HttpException('Invaid Token.', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Token Not Sent.', HttpStatus.BAD_REQUEST);
    }
  }
}
