import { Markup } from "telegraf";
import keyboards from "./keyboards.json";
import { Languages, keyboard_translation } from "modules/translation";

export type KeyboardName = keyof typeof keyboards;

export default function (
  language: Languages,
  keyboard_name: KeyboardName,
  resize_keyboard: boolean = true
) {
  if (!keyboards[keyboard_name])
    console.error(`No keyboard ${keyboards[keyboard_name]} exists!`);
  let keyboard = Markup.keyboard(
    keyboard_translation(language, keyboards[keyboard_name])
  );
  if (resize_keyboard) keyboard.reply_markup.resize_keyboard = true;
  return keyboard;
}
