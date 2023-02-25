import { Module } from '@nestjs/common';
import { CreateEvent } from 'src/application/use-cases/events/create-event';
import { FindManyEvents } from 'src/application/use-cases/events/find-many-events';
import { DatabaseModule } from '../infra/database/database.module';
import { PrismaService } from '../infra/database/prisma/prisma.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [PrismaService, CreateEvent, FindManyEvents, EventService],
  exports: [CreateEvent, FindManyEvents, EventService],
})
export class EventModule {}
