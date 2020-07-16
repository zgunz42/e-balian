import { Telegraf, session } from 'telegraf';

export const teleBot = new Telegraf(process.env.BOT_TOKEN);
teleBot.use(session());
