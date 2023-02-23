import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('uploads')
export class UploadeController {
  @Get('events/:file')
  async getEventFile(@Res() res: Response, @Param('file') file: string) {
    try {
      const filePath = join(process.cwd(), 'uploads/events', file);
      return res.sendFile(filePath);
    } catch (error) {
      return res.send('file not found');
    }
  }
  @Get('users/:file')
  async getUserFile(@Res() res: Response, @Param('file') file: string) {
    try {
      const filePath = join(process.cwd(), 'uploads/users', file);
      return res.sendFile(filePath);
    } catch (error) {
      return res.send('file not found');
    }
  }
}
