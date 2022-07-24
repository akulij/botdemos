import { Telegraf, Context } from 'telegraf';
import translation, { Languages } from 'modules/translation';
import keyboards from "modules/keyboards"

function greeting(ctx: Context) {
  const language_code = ctx.message.from.language_code as Languages;
  ctx.reply(translation(language_code, 'greeting'), keyboards(language_code, "menu"));
}

export default function (bot: Telegraf) {
  bot.start(greeting);
}
