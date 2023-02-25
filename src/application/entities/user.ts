export interface UserProps {
  id?: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  whatsapp?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  constructor(private props: UserProps) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get id() {
    return this.props.id;
  }

  public set name(name: string) {
    this.props.name = name.trim();
  }

  public get name() {
    return this.props.name;
  }

  public set username(username: string) {
    this.props.username = username.trim();
  }

  public get username() {
    return this.props.username;
  }

  public set email(email: string) {
    this.props.email = email.trim().toLowerCase();
  }

  public get email() {
    return this.props.email;
  }

  public set phone(phone: string) {
    this.props.phone = phone.trim();
  }

  public get phone() {
    return this.props.phone;
  }

  public set whatsapp(whatsapp: string) {
    this.props.whatsapp = whatsapp.trim();
  }

  public get whatsapp() {
    return this.props.whatsapp;
  }

  public set password(password: string) {
    this.props.password = password.trim();
  }

  public get password() {
    return this.props.password;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public toJSON() {
    return this.props;
  }
}
