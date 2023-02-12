import { Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user-repository';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, password } = request;

    const user = await this.userRepository.create(
      new User({
        name,
        email,
        password,
      }),
    );

    return { user } as any;
  }
}
