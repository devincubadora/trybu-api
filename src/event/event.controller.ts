import {
  Controller,
  Body,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { request, Request, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Event } from 'src/application/entities/event';
import { CreateEventBody } from 'src/infra/http/dto/create-event-body';
import { EventViewModel } from 'src/infra/http/view-model/event-view-model';
import url, { URL } from 'url';
import { EventService } from './event.service';

@UseGuards(AuthGuard('jwt'))
@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}
  @Get()
  async getAll() {
    const events = await this.eventService.getAll();
    return { events: events.map(EventViewModel.toHTTP) };
  }

  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Post()
  async create(
    @Req() req: Request,
    @Body() body: CreateEventBody,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // return {
    //   file: file,
    // };
    const user = req.user;

    const {
      title,
      // picture,
      startTime,
      endTime,
      address,
      price,
      contact,
      description,
    } = body;

    const event = await this.eventService.create(
      new Event({
        title,
        picture: file?.path,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        address,
        price,
        contact,
        description,
        authorId: user['sub'],
      }),
    );
    return { event };
  }

  @Get('file')
  async getFile(@Res() res: Response) {
    return { url: request.baseUrl };
    // return {
    //   request
    // };
    // return res.sendFile(
    //   join(
    //     __dirname,
    //     '..',
    //     '..',
    //     '/uploads/93c025131561f69a73e8bad4b5a5a901.jpg',
    //   ),
    // );
  }
}
