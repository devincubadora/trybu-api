import { Prisma } from '@prisma/client';

export interface ManyEventsParams {
  where?: Prisma.EventWhereInput;
  orderBy?: Prisma.EventOrderByWithRelationInput;
  include?: Prisma.EventInclude;
  select?: Prisma.EventSelect;
  skip?: number;
  take?: number;
  distinct?: Prisma.Enumerable<Prisma.EventScalarFieldEnum>;
  cursor?: Prisma.EventWhereUniqueInput;
}

export interface CountEventsParams {
  where?: Prisma.EventWhereInput;
  orderBy?: Prisma.EventOrderByWithRelationInput;
  select?: Prisma.EventCountAggregateInputType;
  skip?: number;
  take?: number;
  distinct?: Prisma.Enumerable<Prisma.EventScalarFieldEnum>;
  cursor?: Prisma.EventWhereUniqueInput;
}

export type OneEventParam = Prisma.EventWhereUniqueInput;

export type DeleteOneEventParam = Prisma.EventWhereUniqueInput;

export type DeleteManyEventParam = Prisma.EventWhereInput;

export interface UpdateEventParam {
  where: Prisma.EventWhereUniqueInput;
  data: Prisma.EventUpdateInput;
}
