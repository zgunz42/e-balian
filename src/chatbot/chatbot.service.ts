import { Inject, Injectable } from "@nestjs/common";
import { Chatbot } from "./chatbot";
import { RobotService } from "src/robot/robot.service";

@Injectable()
class ChatbotService {
    @Inject()
    private readonly robot: RobotService;

    @Inject('CHATBOT')
    private readonly chatbot: Chatbot;

    bootstrap() {
        // HERE WE ARE
        this.chatbot.onMessage(this.robot.getBotMessage)
    }
}