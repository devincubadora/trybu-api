import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUser } from 'src/application/use-cases/users/create-user';
import { GetUsers } from 'src/application/use-cases/users/get-users';
import { DeleteUser } from 'src/application/use-cases/users/delete-user';
import { CreateUserBody } from '../dto/create-user-body';
import { UserViewModel } from '../view-model/user-view-model';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersContoller {
  constructor(
    private createUser: CreateUser,
    private getUsers: GetUsers,
    private deleteUser: DeleteUser,
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
    const { users } = await this.getUsers.execute();

    return { users: users.map(UserViewModel.toHTTP) };
  }

  @Delete(':userId')
  async deletes(@Param('userId') userId: string) {
    const { result, message } = await this.deleteUser.execute(userId);
    return { result, message };
  }
}
