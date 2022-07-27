import { Telegraf, Context } from 'telegraf';
import { greeting } from 'modules/greeting';

function sendInfoMessage(ctx: Context) {
  greeting(ctx);
}

export default (bot: Telegraf) => {
  bot.hears(/[\w\W]+/gm, sendInfoMessage);
};
