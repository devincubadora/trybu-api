import { Injectable } from '@nestjs/common';
import { User as UserRaw } from 'prisma/prisma-client';
import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user-repository';

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
