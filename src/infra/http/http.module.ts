import { Module } from '@nestjs/common';
import { CreateUser } from 'src/application/use-cases/users/create-user';
import { GetUsers } from 'src/application/use-cases/users/get-users';
import { DatabaseModule } from '../database/database.module';
import { UsersContoller } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersContoller],
  providers: [CreateUser, GetUsers],
})
export class HttpModule {}
