import { Context } from 'telegraf';
import logger from 'modules/logger';
import translations from './translations';

const stateTranslations = Object;

export type Languages = keyof typeof translations;
export type Path = keyof typeof translations[Languages]['translation'];

export default async function translate(
  ctx: Context,
  language: Languages,
  path: Path,
): Promise<string> {
  const translation = await translations[language].translation[path](ctx);
  if (!translation) logger.error(`No translation for ${String(path)} exists!`);
  return translation;
}

export async function keyboardTranslation(
  ctx: Context,
  language: Languages,
  array: Array<Array<string>>,
) {
  const out = array.reduce(async (outputRow: Promise<Array<Array<string>>>, row: string[]) => {
    const keyboardRow = row.reduce(async (btns, button) => {
      (await btns).push(await translate(ctx, language, button as Path));
      return btns;
    }, Promise.resolve([]));
    (await outputRow).push(await keyboardRow);
    return outputRow;
  }, Promise.resolve([]));
  logger.info(out);
  return out;
}

async function setupStateTranslations() {
  Object.entries(translations).forEach(async ([, translation]) => {
    Object.entries(translation.translation).forEach(
      async ([state_name, state_func]) => {
        stateTranslations[
          await (state_func as { (): string } | { (): Promise<string> })()
        ] = state_name;
      },
    );
  });
}
setupStateTranslations();

export async function getStateTranslations() {
  if (!stateTranslations) {
    await setupStateTranslations();
  }
  return stateTranslations;
  logger.info(stateTranslations);
}
