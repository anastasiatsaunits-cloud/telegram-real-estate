const { Bot, InlineKeyboard } = require('grammy');

const token = process.env.TELEGRAM_BOT_TOKEN;
const miniAppUrl = process.env.TELEGRAM_WEBAPP_URL || 'http://localhost:3000';
const dryRun = process.env.TELEGRAM_BOT_DRY_RUN === '1';

if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is missing');
  process.exit(1);
}

const bot = new Bot(token);

function mainKeyboard() {
  return new InlineKeyboard()
    .text('Подобрать объект', 'start подбор')
    .row()
    .webApp('Открыть каталог', miniAppUrl);
}

bot.command('start', async (ctx) => {
  await ctx.reply(
    'Здравствуйте 👋\n\nЯ помогу подобрать недвижимость под вашу цель, бюджет и срок покупки.',
  );

  await ctx.reply(
    'Можно быстро пройти короткий подбор и сразу посмотреть подходящие объекты в каталоге.',
    {
      reply_markup: mainKeyboard(),
    },
  );
});

bot.callbackQuery('start подбор', async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    'Сначала задам несколько коротких вопросов, после этого открою для вас каталог с подходящими вариантами.',
    {
      reply_markup: new InlineKeyboard().webApp('Начать подбор', `${miniAppUrl}/quiz/region`),
    },
  );
});

bot.catch((error) => {
  console.error('Bot error', error.error);
});

if (dryRun) {
  console.log(`Bot dry-run ready. Mini app URL: ${miniAppUrl}`);
} else {
  bot.start();
  console.log(`Bot started. Mini app URL: ${miniAppUrl}`);
}
