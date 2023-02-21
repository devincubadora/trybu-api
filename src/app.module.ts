import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { EventController } from './event/event.controller';
import { EventModule } from './event/event.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    HttpModule,
    EventModule,
    // MulterModule.register({
    //   dest: './uploads',
    // }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    // }),
  ],
  controllers: [EventController],
})
export class AppModule {}
