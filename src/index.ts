import { Telegraf, Context } from "telegraf";

require("dotenv").config();

const bot = new Telegraf(process.env.BOTTOKEN as string);

bot.start((ctx: Context) => ctx.reply("Welcome"));
bot.launch();
