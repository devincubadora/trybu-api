import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [PrismaService, EventService],
  exports: [EventService],
})
export class EventModule {}