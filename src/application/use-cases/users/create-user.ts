import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';
import { CreateUserBody } from '../../../infra/http/dto/create-user-body';
import { Crypto } from '../../../utils/crypto';

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async execute(request: CreateUserBody): Promise<CreateUserResponse> {
    const { name, username, email, password, phone, whatsapp } = request;

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

    return { user } as any;
  }
}
