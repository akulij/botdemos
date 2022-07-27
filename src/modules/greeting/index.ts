import { Telegraf, Context } from 'telegraf';
import translation, { Languages } from 'modules/translation';
import keyboards from 'modules/keyboards';

export async function greeting(ctx: Context) {
  const languageCode = ctx.message.from.language_code as Languages;
  ctx.reply(await translation(ctx, languageCode, 'greeting'), await keyboards(ctx, languageCode, 'menu'));
}

export default (bot: Telegraf) => {
  bot.start(greeting);
};
