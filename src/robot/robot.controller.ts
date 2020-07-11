import { Controller, Get, Query } from '@nestjs/common';
import { RobotService } from './robot.service';

@Controller('robot')
export class RobotController {
    constructor(private robotServ: RobotService) {}

    @Get()
    haiRobot(): string {
        return 'Hi Robot';
    }

    @Get('chat')
    chat(@Query('message') message: string): Promise<string> {
        return Promise.resolve('chat')
    }
}