import { User as RawUser } from '@prisma/client';
import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<RawUser>;
  abstract findById(userId: string): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract update(user: User): Promise<User>;
}
