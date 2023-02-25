import { NotFoundException } from '@nestjs/common';

export class RecordNotFoundError extends NotFoundException {
  constructor(message?: string) {
    super(message ?? 'Registo não encontrado.');
  }
}
