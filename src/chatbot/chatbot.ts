import { Inject, Injectable } from "@nestjs/common";
import { Telegraf, Context } from 'telegraf'

export class Chatbot {
    
    constructor(private readonly chatbot: Telegraf<any>){}

    config() {
        this.chatbot.start((ctx: Context) => {
            ctx.reply('With this you can get bal stuff')
        })
        this.chatbot.help((ctx: Context) => ctx.reply('Send me a sticker'))
    }

    callback(path) {
        return this.chatbot.webhookCallback(path);
    }

    launch() {
        console.log(`${process.env.VERCEL_URL}bot_telegram`)
        this.chatbot.telegram.setWebhook(`${process.env.VERCEL_URL}/bot_telegram`)
    }

    onMessage(callback: (user, message) => string | Promise<string>) {
       this.chatbot.on('text', async (ctx: Context) => {
           ctx.reply(await callback(ctx.chat.username, ctx.message.text))
       })
    }
}