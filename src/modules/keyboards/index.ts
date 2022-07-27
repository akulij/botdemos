import { Markup, Context } from 'telegraf';
import { Languages, keyboardTranslation } from 'modules/translation';
import logger from 'modules/logger';
import keyboards from './keyboards.json';

export type KeyboardName = keyof typeof keyboards;

export default (
  ctx: Context,
  language: Languages,
  keyboard_name: KeyboardName,
  resize_keyboard: boolean = true,
) => {
  if (!keyboards[keyboard_name]) logger.error(`No keyboard ${keyboards[keyboard_name]} exists!`);
  const keyboard = Markup.keyboard(
    keyboardTranslation(ctx, language, keyboards[keyboard_name]),
  );
  if (resize_keyboard) keyboard.reply_markup.resize_keyboard = true;
  return keyboard;
};
