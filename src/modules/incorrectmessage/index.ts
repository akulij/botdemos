import { Telegraf, Context } from 'telegraf';
import { greeting } from 'modules/greeting';

function send_info_message(ctx: Context) {
    ctx.reply("Unknown message");
    greeting(ctx);
}

export default function (bot: Telegraf) {
    bot.hears(/[\w\W]+/gm, send_info_message);
}
