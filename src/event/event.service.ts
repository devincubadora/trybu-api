import { Injectable } from '@nestjs/common';
import { Event } from 'src/application/entities/event';
import { PrismaEventMapper } from 'src/infra/database/prisma/mappers/prisma-event-mapper';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.event.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async create(event: Event) {
    await this.prisma.event.create({
      data: PrismaEventMapper.toPrisma(event),
    });
  }
}
