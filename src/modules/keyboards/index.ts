import { Markup, Context } from 'telegraf';
import { Languages, keyboard_translation } from 'modules/translation';
import keyboards from './keyboards.json';

export type KeyboardName = keyof typeof keyboards;

export default function (
  ctx: Context,
  language: Languages,
  keyboard_name: KeyboardName,
  resize_keyboard: boolean = true,
) {
  if (!keyboards[keyboard_name]) console.error(`No keyboard ${keyboards[keyboard_name]} exists!`);
  const keyboard = Markup.keyboard(
    keyboard_translation(ctx, language, keyboards[keyboard_name]),
  );
  if (resize_keyboard) keyboard.reply_markup.resize_keyboard = true;
  return keyboard;
}
