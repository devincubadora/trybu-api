import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class FindOneUser {
  constructor(private userRepository: UserRepository) {}
  async execute(param: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.userRepository.findOne(param);

    return user;
  }
}
