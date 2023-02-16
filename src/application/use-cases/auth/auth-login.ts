import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/application/entities/user';
import { Crypto } from 'src/utils/crypto';
import { FindOneUserByEmail } from '../users/find-one-user-by-email';

interface AuthLoginProps {
  email: string;
  password: string;
}

@Injectable()
export class AuthLogin {
  constructor(
    private findUserByEmail: FindOneUserByEmail,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password: pass }: AuthLoginProps): Promise<any> {
    const user = await this.findUserByEmail.execute(email);
    const passwordMatches = user
      ? await Crypto.compare(pass, user.password)
      : null;

    if (!user || !passwordMatches) {
      throw new ForbiddenException('As credenciais não conferem.');
    }

    const { password, ...result } = user;
    return new User(result as User).toJSON();
  }

  async getToken(user: User) {
    const payload = {
      name: user.name,
      email: user.email,
      sub: user.id,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: 3600,
    });

    return {
      access_token,
    };
  }
}
