import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import botConfig from './bot.config';
import { TelegrafConfigService } from './telegraf-config.service';
import { ChatbotService } from './chatbot.service';
import { RobotModule } from 'src/robot/robot.module';

const teleModule = TelegrafModule.forRootAsync({
  imports: [ConfigModule.forFeature(botConfig)],
  useFactory: async (configService: ConfigService) => ({
    token: configService.get<string>('bot.token'),
    launchOptions: {
      webhook: {
        domain: 'https://3000-a5139589-9f6b-461d-b190-d885e900d37e.ws-us02.gitpod.io',
        hookPath: '/bot-telegram',
      },
    },
  }),
  inject: [ConfigService],
});

@Module({
  imports: [teleModule, RobotModule],
  providers: [ChatbotService],
  exports: [ChatbotService, TelegrafModule]
})
export class ChatbotModule {}
