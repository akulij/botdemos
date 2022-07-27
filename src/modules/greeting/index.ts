import { Telegraf, Context } from 'telegraf';
import translation, { Languages } from 'modules/translation';
import keyboards from "modules/keyboards"

export function greeting(ctx: Context) {
  const language_code = ctx.message.from.language_code as Languages;
  ctx.reply(translation(ctx, language_code, 'greeting'), keyboards(ctx, language_code, "menu"));
}

export default function (bot: Telegraf) {
  bot.start(greeting);
}
