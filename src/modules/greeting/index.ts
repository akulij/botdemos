import { Telegraf, Context } from "telegraf";
import translation, { Languages } from "modules/translation"

function greting(ctx: Context) {
    let language_code = ctx.message.from.language_code as Languages;
    ctx.reply(translation(language_code, "greeting"))
}

export default function (bot: Telegraf) {
  bot.start(greting);
}
