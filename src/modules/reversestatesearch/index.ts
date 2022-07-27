import { Telegraf, Context } from 'telegraf';
import { getStateTranslations } from 'modules/translation';
import logger from 'modules/logger';
import config from './config';

async function stateSearcher(ctx: Context) {
  const statesMap = await getStateTranslations();
  const messageText = (ctx.message as { text: string }).text;
  const stateName = statesMap[messageText];
  logger.info(stateName);
  if (config.execute_on[stateName]) config.execute_on[stateName](ctx);
  else logger.error(`Unimplemented config for ${stateName}!`);
}

async function setup(bot: Telegraf, setupable_function: any) {
  const statesMap = await getStateTranslations();
  Object.entries(statesMap).forEach(([state_text]) => {
    if (state_text) bot.hears(state_text, setupable_function);
  });
}

export default async (bot: Telegraf) => {
  await setup(bot, stateSearcher);
};
