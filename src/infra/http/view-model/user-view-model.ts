import { User } from '../../../application/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
