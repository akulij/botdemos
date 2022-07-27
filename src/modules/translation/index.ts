import { Context } from 'telegraf';
import translations from './translations';

const state_translations = Object;

export type Languages = keyof typeof translations;
export type Path = keyof typeof translations[Languages]['translation'];

export default function translate(
  ctx: Context,
  language: Languages,
  path: Path,
): string {
  const translation = translations[language].translation[path](ctx);
  if (!translation) console.error(`No translation for ${String(path)} exists!`);
  return translation;
}

export function keyboard_translation(
  ctx: Context,
  language: Languages,
  array: Array<Array<string>>,
) {
  const out = array.reduce((array: Array<Array<string>>, row: string[]) => {
    const kbd_row = row.reduce((btns, button) => {
      btns.push(translate(ctx, language, button as Path));
      return btns;
    }, []);
    array.push(kbd_row);
    return array;
  }, []);
  return out;
}

function setupStateTranslations() {
  Object.entries(translations).forEach(([lang, translations]) => {
    Object.entries(translations.translation).forEach(([state_name, state_func]) => {
      state_translations[(state_func as {(): string})()] = state_name;
    });
  });
}
setupStateTranslations();

export function getStateTranslations() {
  if (!state_translations) {
    setupStateTranslations();
  }
  return state_translations;
}
