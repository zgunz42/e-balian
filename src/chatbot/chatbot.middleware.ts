import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Chatbot } from './chatbot';

@Injectable()
export class ChatbotMiddleware implements NestMiddleware {
   
    constructor( @Inject('chatbot') private readonly chatbot: Chatbot){}

    use(req: Request, res: Response, next: Function) {
        return this.chatbot.callback('/bot_telegram')(req, res);
        // next();
    }
}
