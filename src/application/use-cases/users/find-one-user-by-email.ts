import { Injectable } from '@nestjs/common';
import { User as UserRaw } from 'prisma/prisma-client';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class FindOneUserByEmail {
  constructor(private userRepository: UserRepository) {}
  async execute(email: string): Promise<UserRaw> {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }
}
