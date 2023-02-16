import { Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user-repository';

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class FindOneUserById {
  constructor(private userRepository: UserRepository) {}
  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    return user;
  }
}
