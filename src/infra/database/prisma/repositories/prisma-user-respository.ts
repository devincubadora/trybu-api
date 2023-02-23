import { Injectable } from '@nestjs/common';
import { User as RawUser } from '@prisma/client';

import { User } from '../../../../application/entities/user';
import { UserRepository } from '../../../../application/repositories/user-repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<RawUser> {
    const data = PrismaUserMapper.toPrisma(user);

    const userData = await this.prisma.user.create({
      data,
    });
    // console.log('userData', userData);
    return userData;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return new User(user).toJSON() as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user ? (new User(user).toJSON() as User) : null;
  }

  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return users.map(PrismaUserMapper.toDomain);
  }

  update(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async deleteBYId(userId: string): Promise<void> {
    const deleted = await this.prisma.user.delete({
      where: { id: userId },
    });
    console.log('deleted', deleted);
  }
}
