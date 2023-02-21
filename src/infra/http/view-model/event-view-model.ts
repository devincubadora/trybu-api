import { Event } from 'src/application/entities/event';

export class EventViewModel {
  static toHTTP(event: Event) {
    return {
      id: event.id,
      title: event.title,
      picture: event.picture,
      startsAt: event.startsAt,
      endsAt: event.endsAt,
      address: event.address,
      price: event.price,
      contact: event.contact,
      status: event.status,
      description: event.description,
      authorId: event.authorId,
    };
  }
}
