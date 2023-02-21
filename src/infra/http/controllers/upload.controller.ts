import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('uploads')
export class UploadeController {
  @Get(':file')
  async getFile(@Res() res: Response, @Param('file') file: string) {
    return res.sendFile(join(process.cwd(), 'uploads', file));
  }
}
