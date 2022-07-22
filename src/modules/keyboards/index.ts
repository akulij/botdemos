import { Markup } from 'telegraf';
import keyboards from "./keyboards.json"
import { Languages, keyboard_translation } from "modules/translation"

export type KeyboardName = keyof typeof keyboards;

export default function(language: Languages, keyboard_name: KeyboardName) {
    return Markup.keyboard(keyboard_translation(language, keyboards[keyboard_name]))
}
