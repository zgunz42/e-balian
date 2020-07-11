import { Module } from '@nestjs/common';
import { RobotService } from './robot.service';
import { CrawlModule } from '../crawl/crawl.module';
import { RobotController } from './robot.controller';

@Module({
  imports: [CrawlModule],
  controllers: [RobotController],
  providers: [RobotService],
})
export class RobotModule {}