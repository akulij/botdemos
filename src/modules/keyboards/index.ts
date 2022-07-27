import { Markup, Context } from 'telegraf';
import { Languages, keyboardTranslation } from 'modules/translation';
import logger from 'modules/logger';
import keyboards from './keyboards.json';

export type KeyboardName = keyof typeof keyboards;

export default async (
  ctx: Context,
  language: Languages,
  keyboardName: KeyboardName,
  resizeKeyboard: boolean = true,
) => {
  if (!keyboards[keyboardName]) logger.error(`No keyboard ${keyboards[keyboardName]} exists!`);
  const keyboard = Markup.keyboard(
    await keyboardTranslation(ctx, language, keyboards[keyboardName]),
  );
  if (resizeKeyboard) keyboard.reply_markup.resize_keyboard = true;
  return keyboard;
};
