import { Telegraf } from 'telegraf';
import greeting from './modules/greeting';

require('dotenv').config();

if (typeof process.env.BOTTOKEN !== 'string') {
  console.error('Pass BOTTOKEN as enviroment variable or in .env file!');
  process.exit(1);
}

const bot = new Telegraf(process.env.BOTTOKEN);

greeting(bot);

bot.launch();
