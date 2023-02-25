import {
  CountUsersParams,
  DeletedManyRecodsResponse,
  DeleteManyUserParam,
  DeleteOneUserParam,
  ManyUsersParams,
  OneUserParam,
  UpdateUserParam,
} from '../../@types';
import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<User | null>;

  abstract findOne(param: OneUserParam): Promise<User | null>;

  abstract findMany(params?: ManyUsersParams): Promise<User[]>;

  abstract count(params?: CountUsersParams): Promise<number>;

  abstract update(params: UpdateUserParam): Promise<User | null>;

  abstract delete(param: DeleteOneUserParam): Promise<User>;

  abstract deleteMany(
    param: DeleteManyUserParam,
  ): Promise<DeletedManyRecodsResponse>;
}
