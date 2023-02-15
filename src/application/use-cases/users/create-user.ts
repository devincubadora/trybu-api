import { Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user-repository';
import { CreateUserBody } from 'src/infra/http/dto/create-user-body';

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async execute(request: CreateUserBody): Promise<CreateUserResponse> {
    const { name, email, password, phone, whatsapp } = request;

    const user = await this.userRepository.create(
      new User({
        name,
        email,
        password,
        phone,
        whatsapp,
      }),
    );

    return { user } as any;
  }
}
