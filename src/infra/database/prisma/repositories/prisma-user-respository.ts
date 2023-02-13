import { Injectable } from '@nestjs/common';
import { User as RawUser } from '@prisma/client';

import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user-repository';
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

  findById(userId: string): Promise<User> {
    throw new Error('Method not implemented.');
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
