import { Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user-repository';

interface CreateUserResponse {
  users: User[];
}

@Injectable()
export class GetUsers {
  constructor(private userRepository: UserRepository) {}
  async execute(): Promise<CreateUserResponse> {
    const users = await this.userRepository.getAll();

    return { users };
  }
}
