import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/application/repositories/user-repository';

interface Response {
  result: boolean;
  message: string;
}

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<Response> {
    await this.userRepository.deleteBYId(userId);
    return {
      result: true,
      message: 'Usuário excluído com sucesso.',
    };
  }
}
