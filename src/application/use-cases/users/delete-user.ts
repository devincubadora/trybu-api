import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/application/repositories/user-repository';

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    await this.userRepository.deleteBYId(userId);
  }
}
