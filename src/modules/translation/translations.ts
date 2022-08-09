import { Context } from 'telegraf';
import * as db from 'modules/db';

export default {
  en: {
    translation: {
      greeting: () => "Hello there👋! I'm VPSBot!\nThere you can rent server for cryptocurrency or fiat moneys, then control them from me.\n\nOur pros:\n✅ You can pay with cryptocurrency. It will keep you anonymeously\n\n✅ We have tech support. They will install everything you need\n✅ You have notifications. If you will not have enought money, you will get a notification. If you will have not enought power of servers, we will notificate you, so you will no lose your clients\n✅ Control server on the go from Telegram right from phone. Do not have to enter to strange and heave sites",
      personal_account: () => '📔Personal account',
      personal_account_msg: async (ctx: Context | undefined = undefined) => {
        if (!ctx) return '';
        const user = db.getUserFromCtx(ctx);
        return `Your balance: ${await db.getUserBalance(user)} ₽\nYour servers online: ${await db.getUserServersOnline(user)}\nYour servers total: ${await db.getUserServersTotal(user)}`;
      },
      my_servers: () => '💻My servers',
      my_servers_msg: () => 'Your servers list',
      no_servers_msg: () => 'You have no servers',
      support: () => '☎️Support',
      support_msg: () => 'Tech support: @akulij. Write there and describe your problem',
      topup_balance: () => '💳 Top up balance',
      topup_balance_msg: () => 'Send Ethereum to address 0x1923e60E29794a21214EEf9733cf528347188921. Your balance will top up in rubbles with 10% comission in 1 hour.',
      menu: () => '📔 Menu',
      server1: () => 'Server 1',
      server2: () => 'Server 2',
    },
  },
  ru: {
    translation: {
      greeting: () => 'Приветствую вас👋! Я VPSBot!\nУ меня вы сможешь арендовать сервер за криптовалюту, а потом легко управлять им через меня.\n\nНаши преимущества:\n✅ Можно пополнять криптовалютами. Это будет сохранять вашу анонимность.\n\n✅ У нас есть тех поддержка, которая в случае надобности установит вам все, что нужно\n✅ Вы получаете уведомления. Если на вашем счету будет недостаточно денег для аренды сервера, то мы вас уведомим. Если вам не будет хватать мощностей сервера, мы так же уведомим вас об этом, чтобы вы не теряли клиентов\n✅ Управление сервером в Telegram (On the go): управляйте сервером прямо со смартфона, не заходя на неудобные тяжеловесные сайты',
      personal_account: () => '📔Личный кабинет',
      personal_account_msg: async (ctx: Context) => {
        if (!ctx) return '';
        const user = db.getUserFromCtx(ctx);
        return `Ваш баланс: ${await db.getUserBalance(user)} ₽\nКоличество ваших серверов онлайн: ${await db.getUserServersOnline(user)}\nКоличество ваших серверов всего: ${await db.getUserServersTotal(user)}`;
      },
      my_servers: () => '💻Мои серверы',
      no_servers_msg: () => 'У вас нет серверов',
      my_servers_msg: () => 'Список ваших серверов',
      support: () => '☎️Тех. поддержка',
      support_msg: () => 'Тех. поддержка: @akulij. Напишите туда и объясните свою проблему. В ближайшие 20 минут с вами свяжутся.',
      topup_balance: () => '💳 Пополнить баланс',
      topup_balance_msg: () => 'Для пополнения отправьте Ethereum на адресс <i>0x1923e60E29794a21214EEf9733cf528347188921</i>.\nВаш баланс пополнится в рублях с комиссией в 10% относительно официального курса в течение часа.',
      menu: () => '📔 Меню',
      server1: () => 'Сервер 1',
      server2: () => 'Сервер 2',
    },
  },
};
