import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  ValidateIf,
} from 'class-validator';

export class CreateUserBody {
  @MaxLength(50, { message: 'Nome muito longo' })
  @MinLength(5, { message: 'Nome muito curto' })
  @IsNotEmpty({ message: 'Informe o nome' })
  name: string;

  @IsEmail({}, { message: 'O email informado não á válido' })
  @IsNotEmpty({ message: 'Informe o email' })
  email: string;

  @MaxLength(20, { message: 'O nome de usuário muito longo' })
  @MinLength(5, { message: 'O nome de usuário muito curto' })
  @IsNotEmpty({ message: 'NOm' })
  @ValidateIf((o) => o.username !== undefined && o.username !== null)
  username: string;

  @MaxLength(50, { message: 'Essa senha é muito longa' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: 'Infrome a senha' })
  password: string;

  phone?: string;

  whatsapp?: string;
}
