import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { EventModule } from './event/event.module';
import { UploadeController } from './infra/http/controllers/upload.controller';

@Module({
  imports: [HttpModule, EventModule],
  controllers: [UploadeController],
})
export class AppModule {}
