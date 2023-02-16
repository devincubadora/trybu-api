import { User as RawUser } from '@prisma/client';
import { User } from 'src/application/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      whatsapp: user.whatsapp,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(raw: RawUser) {
    return new User({
      id: raw.id,
      name: raw.name,
      username: raw.username,
      email: raw.email,
      password: raw.password,
      phone: raw.phone,
      whatsapp: raw.whatsapp,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
