import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  username: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  phone?: string;

  whatsapp?: string;
}
