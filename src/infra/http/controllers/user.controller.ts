import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUser } from '../../../application/use-cases/users/create-user';
import { FindManyUsers } from '../../../application/use-cases/users/find-many-users';
import { DeleteUser } from '../../../application/use-cases/users/delete-user';
import { CreateUserBody } from '../dto/create-user-body';
import { UserViewModel } from '../view-model/user-view-model';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FindOneUser } from '../../../application/use-cases/users/find-one-user';
import { User } from 'src/application/entities/user';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersContoller {
  constructor(
    private createUser: CreateUser,
    private findMany: FindManyUsers,
    private deleteUser: DeleteUser,
    private findOneUser: FindOneUser,
  ) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
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

  @Get()
  async index() {
    const { users } = await this.findMany.execute();

    return { users: users.map(UserViewModel.toHTTP) };
  }

  @Get('me')
  async me(@Req() req: Request) {
    const user = req.user as User;
    const logeedUser = await this.findOneUser.execute({ id: user.id });

    return UserViewModel.toHTTP(logeedUser);
  }

  @Delete(':userId')
  async deletes(@Param('userId') userId: string) {
    const { result, message } = await this.deleteUser.execute({ id: userId });
    return { result, message };
  }
}
