import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLogin } from '../../application/use-cases/auth/auth-login';
import { CreateUser } from '../../application/use-cases/users/create-user';
import { DeleteUser } from '../../application/use-cases/users/delete-user';
import { FindOneUserByEmail } from '../../application/use-cases/users/find-one-user-by-email';
import { FindOneUserById } from '../../application/use-cases/users/find-one-user-by-id';
import { GetUsers } from '../../application/use-cases/users/get-users';
import { AtStarategy } from '../auth/jwt/at.strategy';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './controllers/auth.controller';
import { UsersContoller } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersContoller, AuthController],
  providers: [
    CreateUser,
    GetUsers,
    DeleteUser,
    AuthLogin,
    FindOneUserByEmail,
    FindOneUserById,
    JwtService,
    AtStarategy,
  ],
})
export class HttpModule {}
