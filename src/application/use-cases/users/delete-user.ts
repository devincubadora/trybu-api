import { Injectable } from '@nestjs/common';
import { OneUserParam } from 'src/@types';

import { UserRepository } from '../../repositories/user-repository';
import { RecordNotFoundError } from '../errors';

interface Response {
  result: boolean;
  message: string;
}

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(param: OneUserParam): Promise<Response> {
    const userLength = this.userRepository.count({
      where: param,
    });

    if (userLength) {
      throw new RecordNotFoundError('O usuário que tentou excluir não existe.');
    }

    await this.userRepository.delete(param);
    return {
      result: true,
      message: 'Usuário excluído com sucesso.',
    };
  }
}
