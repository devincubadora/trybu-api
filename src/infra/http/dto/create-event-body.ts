import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDateString,
  ValidateIf,
  Matches,
} from 'class-validator';
import { Event } from '../../../application/entities/event';
import { RegExUtils } from '../../../utils/reg-ex-utils';

export class CreateEventBody {
  @MinLength(5, {
    message: 'O título é muito curto.',
  })
  @MaxLength(50, {
    message: 'O título é muito longo.',
  })
  @IsNotEmpty({ message: 'Informe o título.' })
  title: string;

  picture: string;

  @IsDateString(
    {},
    {
      message: 'A date de início precisa ser um formato válido.',
    },
  )
  @IsNotEmpty({ message: 'Informe a data e hora de início.' })
  startsAt: Date;

  @IsNotEmpty({ message: 'Informe o endereço do evento.' })
  address: string;

  @IsDateString(
    {},
    {
      message: 'A date de fim precisa ser um formato válido.',
    },
  )
  @ValidateIf(
    (event: Event) => event.endsAt !== undefined && event.endsAt !== null,
  )
  endsAt: Date;

  @Matches(RegExUtils.numberFloat, {
    message: 'Informe um preço válido. Um valor numérico.',
  })
  @ValidateIf(
    (event: Event) => event.price !== undefined && event.price !== null,
  )
  price: number;

  contact: string;

  @IsNotEmpty({ message: 'Escreva uma descrição do evento.' })
  description: string;
}
