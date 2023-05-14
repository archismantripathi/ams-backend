import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('validate')
  validate(@Body() data: { token: string }) {
    if (data.token) {
      return this.authService.verifyToken(data.token);
    } else {
      return false;
    }
  }
}
