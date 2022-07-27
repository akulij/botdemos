import { Telegraf } from 'telegraf';
import logger from 'modules/logger';
import greeting from './modules/greeting';
import reversestatesearch from './modules/reversestatesearch';

require('dotenv').config();

if (typeof process.env.BOTTOKEN !== 'string') {
  logger.error('Pass BOTTOKEN as enviroment variable or in .env file!');
  process.exit(1);
}

const bot = new Telegraf(process.env.BOTTOKEN);

greeting(bot);
reversestatesearch(bot);
// incorrectmessage(bot);

// check if it is main file
if (require.main === module) bot.launch();

// export for yandex cloud functions
module.exports.handler = async (event: any) => {
  const message = JSON.parse(event.body);
  await bot.handleUpdate(message);
  return {
    statusCode: 200,
    body: '',
  };
};
