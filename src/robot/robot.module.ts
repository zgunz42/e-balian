import { Module } from '@nestjs/common';
import { RobotService } from './robot.service';
import { CrawlModule } from '../crawl/crawl.module';
import { RobotController } from './robot.controller';
import { Robot } from './robot';
import action from './actions';

@Module({
  imports: [CrawlModule],
  controllers: [RobotController],
  providers: [
      {
          provide: 'ROBOT',
          useFactory: async () => {
              return new Promise((res, rej) => {
                  const robot = new Robot()
                  robot.loadReply(() => {
                    action.map(v => robot.addAction(v.command, v.action)) 
                    res(robot)
                    })
              })
          }
      },
      RobotService
    ],
})
export class RobotModule {}