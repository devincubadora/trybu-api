import { User } from './user';

type StatusProps = 'Publicado' | 'Pendente' | 'Inactivo';
export interface EventProps {
  id?: string;
  title: string;
  picture?: string;
  startsAt: Date;
  endsAt?: Date;
  address: string;
  price?: number;
  contact: string;
  status: StatusProps;
  description: string;
  authorId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: User;
}
export class Event {
  constructor(private props: EventProps) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  set id(id: string) {
    this.props.id = id;
  }
  get id() {
    return this.props.id;
  }
  set title(title: string) {
    this.props.title = title;
  }
  get title() {
    return this.props.title;
  }
  set picture(picture: string) {
    this.props.picture = picture;
  }
  get picture() {
    return this.props.picture;
  }
  set startsAt(startsAt: Date) {
    this.props.startsAt = startsAt;
  }
  get startsAt() {
    return this.props.startsAt;
  }
  set endsAt(endsAt: Date) {
    this.props.endsAt = endsAt;
  }
  get endsAt() {
    return this.props.endsAt;
  }
  set address(address: string) {
    this.props.address = address;
  }
  get address() {
    return this.props.address;
  }
  set price(price: number) {
    this.props.price = price;
  }
  get price() {
    return this.props.price;
  }
  set contact(contact: string) {
    this.props.contact = contact;
  }
  get contact() {
    return this.props.contact;
  }
  set status(status: StatusProps) {
    this.props.status = status;
  }
  get status() {
    return this.props.status;
  }
  set description(description: string) {
    this.props.description = description;
  }
  get description() {
    return this.props.description;
  }
  set authorId(authorId: string) {
    this.props.authorId = authorId;
  }
  get authorId() {
    return this.props.authorId;
  }
  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  set author(autor: User) {
    this.props.author = autor;
  }
  get author() {
    return this.props.author;
  }

  public toJSON() {
    return this.props;
  }
}
