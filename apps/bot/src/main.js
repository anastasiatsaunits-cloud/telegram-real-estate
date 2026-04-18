const { Bot, InlineKeyboard } = require('grammy');

const token = process.env.TELEGRAM_BOT_TOKEN;
const miniAppUrl = process.env.TELEGRAM_WEBAPP_URL || 'http://localhost:3000';
const dryRun = process.env.TELEGRAM_BOT_DRY_RUN === '1';

if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is missing');
  process.exit(1);
}

const bot = new Bot(token);

bot.command('start', async (ctx) => {
  const keyboard = new InlineKeyboard()
    .webApp('Открыть каталог', miniAppUrl)
    .row()
    .text('Подобрать объект', 'open_miniapp');

  await ctx.reply(
    'Подберу недвижимость внутри Telegram. Можно сразу открыть mini app и пройти подбор.',
    {
      reply_markup: keyboard,
    },
  );
});

bot.callbackQuery('open_miniapp', async (ctx) => {
  const keyboard = new InlineKeyboard().webApp('Открыть mini app', miniAppUrl);
  await ctx.answerCallbackQuery();
  await ctx.reply('Открой mini app по кнопке ниже.', {
    reply_markup: keyboard,
  });
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
