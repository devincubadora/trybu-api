import { Event } from 'src/application/entities/event';

export class EventViewModel {
  static toHTTP(event: Event) {
    return {
      id: event.id,
      title: event.title,
      picture: event.picture,
      startTime: event.startTime,
      endTime: event.endTime,
      address: event.address,
      price: event.price,
      contact: event.contact,
      description: event.description,
      authorId: event.authorId,
    };
  }
}
