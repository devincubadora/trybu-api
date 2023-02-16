import { User } from 'src/application/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp,
    };
  }
}
