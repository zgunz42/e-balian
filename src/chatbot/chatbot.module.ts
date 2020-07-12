import { Module } from "@nestjs/common";
import { teleBot } from "./config";
import { Chatbot } from "./chatbot";
import { RobotModule } from "src/robot/robot.module";
import { RobotService } from "src/robot/robot.service";

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
            },
            inject: ['teleBot', RobotService]
        }
    ]
})
export class ChatbotModule {}