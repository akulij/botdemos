import { Context } from 'telegraf';
import translate, { Languages, Path } from 'modules/translation';
import keyboards, { KeyboardName } from 'modules/keyboards';
import logger from 'modules/logger';

export default async function sendMsg(
  ctx: Context,
  message_name: Path,
  keyboard?: KeyboardName,
) {
  const languageCode = ctx.message.from.language_code as Languages;
  if (keyboard) {
    ctx.reply(
      await translate(ctx, languageCode, message_name),
      await keyboards(ctx, languageCode, keyboard),
    );
  } else {
    ctx.reply(await translate(ctx, languageCode, message_name), {parse_mode: 'HTML'});
  }
}

export async function messageIfKeyboard(
  ctx: Context,
  msg_kbd: Path,
  msg_nokbd: Path,
  keyboard?: KeyboardName,
) {
  logger.info(`keyboard: ${keyboard}`);
  const languageCode = ctx.message.from.language_code as Languages;
  const kbdTmp = await keyboards(ctx, languageCode, keyboard);
  logger.info(kbdTmp);
  if (kbdTmp.reply_markup.keyboard.length !== 0) {
    sendMsg(ctx, msg_kbd, keyboard);
  } else {
    sendMsg(ctx, msg_nokbd);
  }
}
