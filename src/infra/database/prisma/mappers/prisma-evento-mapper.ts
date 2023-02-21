import { Event as RawEvent } from '@prisma/client';
import { Event } from 'src/application/entities/event';

export class PrismaEventMapper {
  static toPrisma(event: Event) {
    return {
      title: event.title,
      picture: event.picture,
      startTime: event.startTime,
      endTime: event.endTime,
      address: event.address,
      price: Number(event.price),
      contact: event.contact,
      description: event.description,
      authorId: event.authorId,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }

  static toDomain(raw: RawEvent) {
    return new Event({
      id: raw.id,
      title: raw.title,
      picture: raw.picture ? raw.picture : null,
      startTime: raw.startTime,
      endTime: raw.endTime,
      address: raw.address,
      price: raw.price,
      contact: raw.contact,
      description: raw.description,
      authorId: raw.authorId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
