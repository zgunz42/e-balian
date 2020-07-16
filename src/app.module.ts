import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlModule } from './crawl/crawl.module';
import { RobotModule } from './robot/robot.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({}), CrawlModule, RobotModule, ChatbotModule],
  exports: [CrawlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
