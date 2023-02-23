import { Event as RawEvent } from '@prisma/client';
import { Event } from '../../../../application/entities/event';

export class PrismaEventMapper {
  static toPrisma(event: Event) {
    return {
      title: event.title,
      picture: event.picture,
      startsAt: event.startsAt,
      endsAt: event.endsAt,
      address: event.address,
      price: Number(event.price),
      contact: event.contact,
      status: event.status,
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
      startsAt: raw.startsAt,
      endsAt: raw.endsAt,
      address: raw.address,
      price: raw.price,
      contact: raw.contact,
      status: raw.status as any,
      description: raw.description,
      authorId: raw.authorId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
