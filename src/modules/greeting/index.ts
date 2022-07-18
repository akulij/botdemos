import { Telegraf, Context } from "telegraf";

function greting(ctx: Context) {
    ctx.reply("Hello, my dear friend!")
}

export default function (bot: Telegraf) {
  bot.start(greting);
}
