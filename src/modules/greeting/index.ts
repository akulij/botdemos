import { Telegraf, Context } from 'telegraf';
import translation, { Languages } from 'modules/translation';
import keyboards from 'modules/keyboards';

export function greeting(ctx: Context) {
  const languageCode = ctx.message.from.language_code as Languages;
  ctx.reply(translation(ctx, languageCode, 'greeting'), keyboards(ctx, languageCode, 'menu'));
}

export default (bot: Telegraf) => {
  bot.start(greeting);
};
