import { Context } from 'telegraf';
import translate, { Languages, Path } from 'modules/translation';
import keyboards, { KeyboardName } from 'modules/keyboards';

export default function (ctx: Context, message_name: Path, keyboard?: KeyboardName) {
    let language_code = ctx.message.from.language_code as Languages;
    if (keyboard)
        ctx.reply(translate(language_code, message_name), keyboards(language_code, keyboard))
    else
        ctx.reply(translate(language_code, message_name));
}
