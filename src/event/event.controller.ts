import {
  Controller,
  Body,
  Get,
  Post,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateEvent } from '../application/use-cases/events/create-event';
import { FindManyEvents } from '../application/use-cases/events/find-many-events';
import { Event } from '../application/entities/event';
import { CreateEventBody } from '../infra/http/dto/create-event-body';
import { EventViewModel } from '../infra/http/view-model/event-view-model';

@UseGuards(AuthGuard('jwt'))
@Controller('events')
export class EventController {
  constructor(
    private createEvent: CreateEvent,
    private findMany: FindManyEvents,
  ) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() body: CreateEventBody,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const user = req.user;

    const { title, startsAt, endsAt, address, price, contact, description } =
      body;

    const { event } = await this.createEvent.execute(
      new Event({
        title,
        picture: file?.filename ? 'events/' + file.filename : null,
        startsAt: new Date(startsAt),
        endsAt: endsAt ? new Date(endsAt) : null,
        address,
        price,
        contact,
        status: 'Pendente',
        description,
        authorId: user['sub'],
      }),
    );
    return { event: EventViewModel.toHTTP(event) };
  }

  // @UseInterceptors(
  //   FileInterceptor('picture', {
  //     storage: diskStorage({
  //       destination: 'uploads/events',
  //       filename: (req, file, cb) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         return cb(
  //           null,
  //           `${randomName}${extname(file.originalname).toLocaleLowerCase()}`,
  //         );
  //       },
  //     }),
  //   }),
  // )
  @Get()
  async index() {
    const { events } = await this.findMany.execute({
      include: { author: true },
    });

    return { events: events.map(EventViewModel.toHTTP) };
  }
}
