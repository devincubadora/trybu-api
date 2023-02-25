import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLogin } from '../../application/use-cases/auth/auth-login';
import { CreateUser } from '../../application/use-cases/users/create-user';
import { DeleteUser } from '../../application/use-cases/users/delete-user';
import { FindOneUser } from '../../application/use-cases/users/find-one-user';
import { FindManyUsers } from '../../application/use-cases/users/find-many-users';
import { AtStarategy } from '../auth/jwt/at.strategy';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './controllers/auth.controller';
import { UsersContoller } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersContoller, AuthController],
  providers: [
    CreateUser,
    FindManyUsers,
    DeleteUser,
    AuthLogin,
    FindOneUser,
    FindOneUser,
    JwtService,
    AtStarategy,
  ],
})
export class HttpModule {}
