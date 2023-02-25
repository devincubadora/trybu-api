import { ForbiddenException } from '@nestjs/common';

export class RecordAlreadyExistsError extends ForbiddenException {
  constructor(message: string) {
    super(message);
  }
}
