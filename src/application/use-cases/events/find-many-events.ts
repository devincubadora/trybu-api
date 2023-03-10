import { Injectable } from '@nestjs/common';
import { ManyEventsParams } from '../../../@types/event';
import { EventService } from '../../../event/event.service';
import { Event } from '../../entities/event';

interface CreateEventResponse {
  events: Event[];
}

@Injectable()
export class FindManyEvents {
  constructor(private eventRepository: EventService) {}

  async execute(params?: ManyEventsParams): Promise<CreateEventResponse> {
    const events = await this.eventRepository.findMany(params);
    return { events };
  }
}
