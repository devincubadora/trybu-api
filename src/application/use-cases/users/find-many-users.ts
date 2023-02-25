import { Injectable } from '@nestjs/common';
import { ManyUsersParams } from '../../../@types/users-params';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';

interface CreateUserResponse {
  users: User[];
}

@Injectable()
export class FindManyUsers {
  constructor(private userRepository: UserRepository) {}
  async execute(params?: ManyUsersParams): Promise<CreateUserResponse> {
    const users = await this.userRepository.findMany(params);

    return { users };
  }
}
