import { Telegraf, Context } from "telegraf";
import { getStateTranslations } from "modules/translation";

function state_searcher(ctx: Context) {
  const states_map = getStateTranslations();
  const message_text = (ctx.message as { text: string }).text;
  const state_name = states_map[message_text];
}

function setup(bot: Telegraf, setupable_function: any) {
  const states_map = getStateTranslations();
  Object.entries(states_map).forEach((state_text) =>
    bot.hears(state_text, setupable_function)
  );
}

export default function (bot: Telegraf) {
  setup(bot, state_searcher);
}
