import { Inject, Injectable } from '@nestjs/common';
import { Chatbot } from './chatbot';
import { RobotService } from 'src/robot/robot.service';
import {
  TelegrafStart,
  TelegrafHelp,
  TelegrafOn,
  TelegrafHears,
  Context,
} from 'nestjs-telegraf';

@Injectable()
export class ChatbotService {
  @Inject()
  private readonly robot: RobotService;

  @TelegrafStart()
  start(ctx: Context) {
    ctx.reply('Welcome You');
  }

  @TelegrafHelp()
  help(ctx: Context) {
    ctx.reply('Send me a sticker');
  }

  @TelegrafOn('sticker')
  on(ctx: Context) {
    ctx.reply('👍');
  }

  @TelegrafOn('text')
  async onMessage(ctx: Context) {
    await this.robot
      .getBotMessage(ctx.chat.username, ctx.message.text)
      .then(message => {
        ctx.reply(message);
      });
  }

  @TelegrafHears('hi')
  hears(ctx: Context) {

        console.log('message');
    ctx.reply('Hey there');
  }
}
