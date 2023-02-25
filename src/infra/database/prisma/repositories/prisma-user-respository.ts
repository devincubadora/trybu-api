import { Injectable, Param } from '@nestjs/common';
import { RecordNotFoundError } from 'src/application/use-cases/errors/record-not-found';
import {
  CountUsersParams,
  DeletedManyRecodsResponse,
  DeleteManyUserParam,
  DeleteOneUserParam,
  ManyUsersParams,
  OneUserParam,
  UpdateUserParam,
} from 'src/@types';

import { User } from '../../../../application/entities/user';
import { UserRepository } from '../../../../application/repositories/user-repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User | null> {
    const data = PrismaUserMapper.toPrisma(user);

    const userData = await this.prisma.user.create({
      data,
    });

    if (!userData) return null;

    return PrismaUserMapper.toDomain(userData);
  }

  async findOne(param: OneUserParam): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: param,
    });
    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findMany(params?: ManyUsersParams): Promise<User[]> {
    const users = await this.prisma.user.findMany(params);

    if (!users || users.length < 1) return [];

    return users.map(PrismaUserMapper.toDomain);
  }

  async count(params?: CountUsersParams): Promise<number> {
    return await this.prisma.user.count(params);
  }

  async update(param: UpdateUserParam): Promise<User | null> {
    const user = await this.prisma.user.update({
      data: param.data,
      where: param.where,
    });

    return PrismaUserMapper.toDomain(user);
  }

  async delete(param: DeleteOneUserParam): Promise<User> {
    const deletedUser = await this.prisma.user.delete({
      where: param,
    });
    return PrismaUserMapper.toDomain(deletedUser);
  }

  async deleteMany(
    param: DeleteManyUserParam,
  ): Promise<DeletedManyRecodsResponse> {
    const response = await this.prisma.user.deleteMany({
      where: param,
    });

    return response;
  }
}
