import { Context } from 'telegraf';
import logger from 'modules/logger';
import translations from './translations';

const stateTranslations = Object;

export type Languages = keyof typeof translations;
export type Path = keyof typeof translations[Languages]['translation'];

export default function translate(
  ctx: Context,
  language: Languages,
  path: Path,
): string {
  const translation = translations[language].translation[path](ctx);
  if (!translation) logger.error(`No translation for ${String(path)} exists!`);
  return translation;
}

export function keyboardTranslation(
  ctx: Context,
  language: Languages,
  array: Array<Array<string>>,
) {
  const out = array.reduce((_: Array<Array<string>>, row: string[]) => {
    const keyboardRow = row.reduce((btns, button) => {
      btns.push(translate(ctx, language, button as Path));
      return btns;
    }, []);
    array.push(keyboardRow);
    return array;
  }, []);
  return out;
}

function setupStateTranslations() {
  Object.entries(translations).forEach(([, translation]) => {
    Object.entries(translation.translation).forEach(([state_name, state_func]) => {
      stateTranslations[(state_func as { (): string })()] = state_name;
    });
  });
}
setupStateTranslations();

export function getStateTranslations() {
  if (!stateTranslations) {
    setupStateTranslations();
  }
  return stateTranslations;
}
