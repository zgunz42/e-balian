import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CrawlModule} from './crawl/crawl.module';
import {RobotModule} from './robot/robot.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [CrawlModule, RobotModule, ChatbotModule],
  exports: [CrawlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
