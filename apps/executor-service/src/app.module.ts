import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessingModule } from './processing/processing.module';

@Module({
  imports: [ProcessingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
