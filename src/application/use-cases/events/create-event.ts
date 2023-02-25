import { Injectable } from '@nestjs/common';
import { EventService } from '../../../event/event.service';
import { PrismaEventMapper } from '../../../infra/database/prisma/mappers/prisma-event-mapper';
import { Event } from '../../entities/event';
import { RecordAlreadyExistsError } from '../errors';

interface CreateEventResponse {
  event: Event;
}

type ValidationResponse = {
  result: boolean;
  message: string;
};

@Injectable()
export class CreateEvent {
  constructor(private eventRespository: EventService) {}

  async execute(event: Event): Promise<CreateEventResponse> {
    const validator = await this.validator(event);

    if (!validator.result) {
      throw new RecordAlreadyExistsError(validator.message);
    }

    const newEvent = await this.eventRespository.create(event);

    return { event: PrismaEventMapper.toDomain(newEvent) };
  }

  private async validator({
    title,
    authorId,
    startsAt,
    address,
  }: Event): Promise<ValidationResponse> {
    const response = { result: true, message: '' };

    const eventAlreadyExists = await this.eventRespository.findMany({
      where: {
        title,
        authorId,
        startsAt,
        address,
      },
    });
    if (eventAlreadyExists.length > 0) {
      response.result = false;
      response.message = 'Este evento já foi adicionado por si.';
    }
    return response;
  }
}
