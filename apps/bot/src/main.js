const { Bot, InlineKeyboard, InputFile } = require('grammy');

const token = process.env.TELEGRAM_BOT_TOKEN;
const miniAppUrl = process.env.TELEGRAM_WEBAPP_URL || 'http://localhost:3000';
const dryRun = process.env.TELEGRAM_BOT_DRY_RUN === '1';
const welcomeRenderPath = `${__dirname}/../welcome-render.jpg`;

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
  await ctx.replyWithPhoto(new InputFile(welcomeRenderPath), {
    caption:
      '🔐 Доступ к каталогу недвижимости открыт.\n\n' +
      'Подборки по Крыму и Сочи, актуальные объекты под разный бюджет и быстрый вход в подбор по вашей цели.',
  });

  await ctx.reply(
    '💎 В этом боте:\n' +
      '— предложения для жизни, инвестиций и сохранения капитала\n' +
      '— объекты, которые удобно смотреть прямо в Telegram\n' +
      '— быстрый переход к каталогу и заявке\n\n' +
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
