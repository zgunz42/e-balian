import { Controller, Get, Query } from '@nestjs/common';
import { RobotService } from './robot.service';

@Controller('robot')
export class RobotController {
    constructor(private robotServ: RobotService) {}

    @Get()
    haiRobot(): string {
        this.robotServ.loadReply(() => console.log('ready'))
        return 'Hi Robot';
    }

    @Get('chat')
    chat(@Query() message: string): Promise<string> {
        return this.robotServ.getReply('adi', message);
    }
}