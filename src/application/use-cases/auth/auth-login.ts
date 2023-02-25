import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user';
import { Crypto } from '../../../utils/crypto';
import { FindOneUser } from '../users/find-one-user';

interface AuthLoginProps {
  email: string;
  password: string;
}

@Injectable()
export class AuthLogin {
  constructor(
    private findOneUser: FindOneUser,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password: pass }: AuthLoginProps): Promise<User> {
    const user = await this.findOneUser.execute({ email });
    const passwordMatches = user
      ? await Crypto.compare(pass, user.password)
      : null;

    if (!user || !passwordMatches) {
      throw new ForbiddenException('As credenciais não conferem.');
    }

    return user;
  }

  async getToken(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      sub: user.id,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN ?? 3600,
    });

    return {
      access_token,
    };
  }
}
