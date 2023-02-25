import { Post, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthLogin } from '../../../application/use-cases/auth/auth-login';
import { CreateUser } from '../../../application/use-cases/users/create-user';
import { AuthLoginBody } from '../dto/auth-login-body';
import { CreateUserBody } from '../dto/create-user-body';
import { UserViewModel } from '../view-model/user-view-model';

@Controller('auth')
export class AuthController {
  constructor(private authLogin: AuthLogin, private createUser: CreateUser) {}

  @Post('login')
  async login(@Body() body: AuthLoginBody) {
    const { email, password } = body;

    const user = await this.authLogin.validateUser({ email, password });

    const { access_token } = await this.authLogin.getToken(user);
    return { access_token };
  }

  @Post('signup')
  async signup(@Body() body: CreateUserBody) {
    const { name, username, email, password, phone, whatsapp } = body;

    const { user } = await this.createUser.execute({
      name,
      username,
      email,
      password,
      phone,
      whatsapp,
    });

    return { user: UserViewModel.toHTTP(user) };
  }
}
