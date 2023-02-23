import { Injectable } from '@nestjs/common';
import { Event } from '../application/entities/event';
import { PrismaEventMapper } from '../infra/database/prisma/mappers/prisma-event-mapper';
import { PrismaService } from '../infra/database/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.event.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async create(event: Event) {
    await this.prisma.event.create({
      data: PrismaEventMapper.toPrisma(event),
    });
  }
}
