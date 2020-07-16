import { Module, Scope } from '@nestjs/common';
import { RobotService } from './robot.service';
import { CrawlModule } from '../crawl/crawl.module';
import { RobotController } from './robot.controller';
import { Robot } from './robot';
import action from './actions';
import { Action } from './interfaces/action.interface';
import { CrawlService } from 'src/crawl/crawl.service';
import { DisplayAction } from './actions/display.action';
import { SearchAction } from './actions/search.action';

const actionServices = action.map(s => s.action);

@Module({
  imports: [CrawlModule],
  exports: [RobotService],
  controllers: [RobotController],
  providers: [
    {
      provide: 'ROBOT',
      scope: Scope.DEFAULT,
      useFactory: async (...args) => {
        return new Promise((res, rej) => {
          const robot = new Robot();
          robot.loadReply(() => {
            action.forEach(act => {
              const command: Action = args.find((x: Action) =>
                args.find((x: Action) => x instanceof act.action),
              );
              robot.addAction(act.command, command);
            });
            res(robot);
          });
        });
      },
      inject: [DisplayAction, SearchAction],
    },
    RobotService,
    DisplayAction,
    SearchAction,
  ],
})
export class RobotModule {}
