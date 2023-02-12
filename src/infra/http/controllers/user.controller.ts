import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUser } from 'src/application/use-cases/users/create-user';
import { GetUsers } from 'src/application/use-cases/users/get-users';
import { CreateUserBody } from '../dto/create-user-body';
import { UserViewModel } from '../view-model/user-view-model';

@Controller('users')
export class UsersContoller {
  constructor(private createUser: CreateUser, private getUsers: GetUsers) {}
  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;
    const { user } = await this.createUser.execute({
      name,
      email,
      password,
    });
    return { user: UserViewModel.toHTTP(user) };
  }

  @Get()
  async index() {
    const { users } = await this.getUsers.execute();

    return { users: users.map(UserViewModel.toHTTP) };
  }
}
