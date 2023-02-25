import { Prisma } from '@prisma/client';

export interface ManyUsersParams {
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
  include?: Prisma.UserInclude;
  select?: Prisma.UserSelect;
  skip?: number;
  take?: number;
  distinct?: Prisma.Enumerable<Prisma.UserScalarFieldEnum>;
  cursor?: Prisma.UserWhereUniqueInput;
}

export type OneUserParam = Prisma.UserWhereUniqueInput;

export type DeleteOneUserParam = Prisma.UserWhereUniqueInput;

export type DeleteManyUserParam = Prisma.UserWhereInput;

export interface UpdateUserParam {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}
