import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthLogin } from 'src/application/use-cases/auth/auth-login';
import { CreateUser } from 'src/application/use-cases/users/create-user';
import { DeleteUser } from 'src/application/use-cases/users/delete-user';
import { FindOneUserByEmail } from 'src/application/use-cases/users/find-one-user-by-email';
import { GetUsers } from 'src/application/use-cases/users/get-users';
import { AtStarategy } from '../auth/jwt/at.strategy';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './controllers/auth.controller';
import { UsersContoller } from './controllers/user.controller';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secretOrPrivateKey: 'Secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [UsersContoller, AuthController],
  providers: [
    CreateUser,
    GetUsers,
    DeleteUser,
    AuthLogin,
    FindOneUserByEmail,
    JwtService,
    AtStarategy,
  ],
})
export class HttpModule {}
