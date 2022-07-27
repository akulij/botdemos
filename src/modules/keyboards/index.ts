import { Markup, Context } from 'telegraf';
import { Languages, keyboardTranslation } from 'modules/translation';
import logger from 'modules/logger';
import { User } from 'modules/db/types';
import { getUserFromCtx, getUserServersNameList } from 'modules/db';
import keyboards from './keyboards.json';

export type KeyboardName = keyof typeof keyboards;

async function generateMyServersKbd(
  ctx: Context,
  language: Languages,
  user: User,
) {
  const serverList: string[][] = (await getUserServersNameList(user)).map((server) => [server]);
  const keyboard = Markup.keyboard(
    await keyboardTranslation(
      ctx,
      language,
      serverList,
    ),
  );

  // if (serverList !== []) serverList.push(['menu']);
  logger.info('Keyboard:');
  logger.info(serverList);
  logger.info('----');

  return keyboard;
}

async function generateKeyboard(
  ctx: Context,
  language: Languages,
  keyboardName: KeyboardName,
) {
  const user = getUserFromCtx(ctx);
  if (keyboardName === 'my_servers_kbd') {
    const serverListKeyboard = await generateMyServersKbd(ctx, language, user);
    return serverListKeyboard;
  }
  logger.error(`Incorrect keyboard name: ${keyboardName}`);
  return undefined;
}

export default async (
  ctx: Context,
  language: Languages,
  keyboardName: KeyboardName,
  resizeKeyboard: boolean = true,
) => {
  if (!keyboards[keyboardName]) {
    logger.error(`No keyboard ${keyboards[keyboardName]} exists!`);
  }
  if (keyboards[keyboardName] === 'function_generated') {
    const serverListKeyboard = await generateKeyboard(ctx, language, keyboardName);
    return serverListKeyboard;
  }
  const keyboard = Markup.keyboard(
    await keyboardTranslation(
      ctx,
      language,
      keyboards[keyboardName] as string[][],
    ),
  );
  if (resizeKeyboard) keyboard.reply_markup.resize_keyboard = true;
  return keyboard;
};
