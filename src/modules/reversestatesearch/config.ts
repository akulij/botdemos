import { Context } from 'telegraf';
import sendMsg from 'modules/simplesend'
import { Path } from 'modules/translation'
import { KeyboardName } from 'modules/keyboards';

export default {
    execute_on: {
        "personal_account": (ctx: Context) => sendMsg(ctx, "personal_account_msg" as Path, "personal_account_kbd" as KeyboardName),
        "menu": (ctx: Context) => sendMsg(ctx, "greeting", "menu"),
        "my_servers": (ctx: Context) => sendMsg(ctx, "my_servers_msg", "my_servers_kbd"),
        "support": (ctx: Context) => sendMsg(ctx, "support_msg"),
    }
}
