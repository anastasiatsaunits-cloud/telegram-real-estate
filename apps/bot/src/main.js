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
    '🔐 Доступ к каталогу недвижимости открыт.\n\n' +
      'Этот бот поможет быстро найти объекты для жизни, инвестиций и сохранения капитала.',
  );

  await ctx.reply(
    '💎 Что внутри:\n' +
      '— подборки по Крыму и Сочи\n' +
      '— актуальные предложения под разный бюджет\n' +
      '— вход в подбор по вашей цели: жить, инвестировать, сохранить капитал\n' +
      '— быстрый переход к объектам и заявке\n\n' +
      'Всё собрано в одном месте, чтобы не искать варианты вручную.',
  );

  await ctx.reply(
    '👇 Выберите, как удобнее начать:',
    {
      reply_markup: mainKeyboard(),
    },
  );
});

bot.callbackQuery('start подбор', async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    '📍 Сначала задам несколько коротких вопросов, после этого покажу подходящие объекты.',
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
