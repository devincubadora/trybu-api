import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class AuthLoginBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
