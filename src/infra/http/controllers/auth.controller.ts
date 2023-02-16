import { Post, Body } from '@nestjs/common';
import { BadRequestException, Controller } from '@nestjs/common';
import { AuthLogin } from 'src/application/use-cases/auth/auth-login';
import { CreateUser } from 'src/application/use-cases/users/create-user';
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

    if (!user) {
      throw new BadRequestException('Invalid credencials');
    }

    const { access_token } = await this.authLogin.getToken(user);
    return { access_token };
  }

  @Post('signup')
  async signup(@Body() body: CreateUserBody) {
    console.log('body', body);

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
