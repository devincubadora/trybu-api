import { Post, Body } from '@nestjs/common';
import { BadRequestException, Controller } from '@nestjs/common';
import { AuthLogin } from 'src/application/use-cases/auth/auth-login';
import { AuthLoginBody } from '../dto/auth-login-body';

@Controller('auth')
export class AuthController {
  constructor(private authLogin: AuthLogin) {}

  @Post('login')
  async login(@Body() body: AuthLoginBody) {
    const { email, password } = body;

    const user = await this.authLogin.validateUser({ email, password });

    if (!user) {
      throw new BadRequestException('Invalid credencials');
    }

    const { access_token } = await this.authLogin.getToken(user);
    return { access_token };
  }
}
