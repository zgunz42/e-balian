import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CrawlModule} from './crawl/crawl.module';
import {RobotModule} from './robot/robot.module';

@Module({
  imports: [CrawlModule, RobotModule],
  exports: [CrawlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
