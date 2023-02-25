import { Injectable } from '@nestjs/common';
import { ManyEventsParams } from 'src/@types/event';
import { Event } from '../application/entities/event';
import { PrismaEventMapper } from '../infra/database/prisma/mappers/prisma-event-mapper';
import { PrismaService } from '../infra/database/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async findMany(params?: ManyEventsParams) {
    const events = await this.prisma.event.findMany(params);
    if (!events || events.length < 1) return [];

    return events.map(PrismaEventMapper.toDomain);
  }

  async create(event: Event) {
    const newEvent = await this.prisma.event.create({
      data: PrismaEventMapper.toPrisma(event),
    });

    return PrismaEventMapper.toDomain(newEvent);
  }
}
