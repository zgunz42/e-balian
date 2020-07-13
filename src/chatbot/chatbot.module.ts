import { Module, NestModule, Inject } from "@nestjs/common";
import { teleBot } from "./config";
import { Chatbot } from "./chatbot";
import { RobotModule } from "src/robot/robot.module";
import { RobotService } from "src/robot/robot.service";
import { ChatbotMiddleware } from "./chatbot.middleware";

@Module({
    imports: [RobotModule],
    providers: [
        {
            provide: 'teleBot',
            useValue: teleBot
        }, {
            provide: 'chatbot',
            useFactory: (telebot, robot: RobotService) => {
                const chatbot = new Chatbot(teleBot)
                chatbot.config()
                chatbot.onMessage(robot.getBotMessage.bind(robot))
                chatbot.launch()
                return chatbot;
            },
            inject: ['teleBot', RobotService]
        }
    ]
})
export class ChatbotModule implements NestModule {
    
    configure(consumer: import("@nestjs/common").MiddlewareConsumer) {
        consumer
      .apply(ChatbotMiddleware).forRoutes('bot_telegram');
    }
}