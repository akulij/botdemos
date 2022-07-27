import { Context } from 'telegraf';
import sendMsg, { messageIfKeyboard } from 'modules/simplesend';
import { Path } from 'modules/translation';
import { KeyboardName } from 'modules/keyboards';

export default {
  execute_on: {
    personal_account: (ctx: Context) => sendMsg(ctx, 'personal_account_msg' as Path, 'personal_account_kbd' as KeyboardName),
    menu: (ctx: Context) => sendMsg(ctx, 'greeting', 'menu'),
    my_servers: (ctx: Context) => messageIfKeyboard(ctx, 'my_servers_msg', 'no_servers_msg', 'my_servers_kbd'),
    support: (ctx: Context) => sendMsg(ctx, 'support_msg'),
    topup_balance: (ctx: Context) => sendMsg(ctx, 'topup_balance_msg'),
  },
};
