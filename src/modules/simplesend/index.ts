import { Context } from 'telegraf';
import translate, { Languages, Path } from 'modules/translation';
import keyboards, { KeyboardName } from 'modules/keyboards';

export default (ctx: Context, message_name: Path, keyboard?: KeyboardName) => {
  const languageCode = ctx.message.from.language_code as Languages;
  if (keyboard) {
    ctx.reply(
      translate(ctx, languageCode, message_name),
      keyboards(ctx, languageCode, keyboard),
    );
  } else {
    ctx.reply(translate(ctx, languageCode, message_name));
  }
};
