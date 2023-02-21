import { IsNotEmpty, Length, IsDateString } from 'class-validator';

export class CreateEventBody {
  @IsNotEmpty()
  @Length(5, 50)
  title: string;

  picture: string;

  @IsNotEmpty()
  @IsDateString()
  startsAt: Date;

  endsAt: Date;

  address: string;

  price: number;

  contact: string;

  description: string;
}
