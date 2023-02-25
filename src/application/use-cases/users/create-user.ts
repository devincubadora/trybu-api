import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';
import { CreateUserBody } from '../../../infra/http/dto/create-user-body';
import { Crypto } from '../../../utils/crypto';
import { RecordAlreadyExistsError } from '../errors';

interface CreateUserResponse {
  user: User;
}

type ValidationResponse = {
  result: boolean;
  message: string;
};

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async execute(request: CreateUserBody): Promise<CreateUserResponse> {
    const { name, username, email, password, phone, whatsapp } = request;

    const validation = await this.validate(request);

    if (!validation.result) {
      throw new RecordAlreadyExistsError(validation.message);
    }
    const hashedPassword = await Crypto.encrypt(password);
    const user = await this.userRepository.create(
      new User({
        name,
        username,
        email,
        password: hashedPassword,
        phone,
        whatsapp,
      }),
    );
    return { user };
  }

  private async validate({
    email,
    phone,
    whatsapp,
    username,
  }: CreateUserBody): Promise<ValidationResponse> {
    const response = { result: true, message: '' };

    const userAlredyExists = await this.userRepository.findMany({
      where: {
        OR: [{ email }, { phone }, { username }, { whatsapp }],
      },
    });

    if (userAlredyExists.length > 0) {
      response.result = false;
      const user = userAlredyExists[0];

      if (email == user.email) {
        response.message = 'Este email já está registado.';
      } else if (phone == user.phone) {
        response.message = 'Este telefone já está registado.';
      } else if (whatsapp == user.whatsapp) {
        response.message = 'Este whatsapp já está registado.';
      } else if (username == user.username) {
        response.message = 'Este nome de usuário já está registado.';
      }
    }
    return response;
  }
}
