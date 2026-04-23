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
  return new InlineKeyboard().text('Подобрать объект', 'start подбор').row().webApp('Открыть каталог', miniAppUrl);
}

function getDisplayName(user) {
  if (user?.first_name) return user.first_name;
  if (user?.username) return `@${user.username}`;
  return null;
}

async function syncBotMetadata() {
  await Promise.allSettled([
    bot.api.setMyDescription(
      'Подбор недвижимости для жизни, инвестиций и сохранения капитала. Помогу быстро пройти короткий подбор и открыть подходящие объекты.'
    ),
    bot.api.setMyShortDescription('Подбор недвижимости для жизни, инвестиций и капитала.'),
    bot.api.setChatMenuButton({
      menu_button: {
        type: 'web_app',
        text: 'Открыть каталог',
        web_app: { url: miniAppUrl },
      },
    }),
  ]);
}

bot.command('start', async (ctx) => {
  const displayName = getDisplayName(ctx.from);
  const greeting = displayName ? `${displayName}, доступ к каталогу недвижимости открыт.` : 'Доступ к каталогу недвижимости открыт.';

  await ctx.replyWithPhoto(new InputFile(welcomeRenderPath), {
    caption: '🔐 ' + greeting + '\n\n' + 'Подборки по Крыму и Сочи, актуальные объекты под разный бюджет и быстрый вход в подбор по вашей цели.',
  });

  await ctx.reply(
    '💎 В этом боте:\n' +
      '— предложения для жизни, инвестиций и сохранения капитала\n' +
      '— объекты, которые удобно смотреть прямо в Telegram\n' +
      '— быстрый переход к каталогу и заявке\n\n' +
      'Всё собрано в одном месте, чтобы не искать варианты вручную.'
  );

  await ctx.reply('👇 Выберите, как удобнее начать:', {
    reply_markup: mainKeyboard(),
  });
});

bot.callbackQuery('start подбор', async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('📍 Сначала задам несколько коротких вопросов, после этого покажу подходящие объекты.', {
    reply_markup: new InlineKeyboard().webApp('Начать подбор', `${miniAppUrl}/quiz/region`),
  });
});

bot.catch((error) => {
  console.error('Bot error', error.error);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runLongPolling() {
  let offset = 0;

  console.log(`Bot polling started. Mini app URL: ${miniAppUrl}`);

  while (true) {
    try {
      const updates = await bot.api.getUpdates({
        offset,
        timeout: 30,
        allowed_updates: ['message', 'callback_query'],
      });

      for (const update of updates) {
        offset = update.update_id + 1;
        await bot.handleUpdate(update);
      }
    } catch (error) {
      console.error('Bot polling error', error);
      await sleep(2000);
    }
  }
}

async function bootstrap() {
  if (dryRun) {
    console.log(`Bot dry-run ready. Mini app URL: ${miniAppUrl}`);
    return;
  }

  await bot.api.deleteWebhook();
  await syncBotMetadata();
  await bot.init();
  await runLongPolling();
}

bootstrap().catch((error) => {
  console.error('Bot bootstrap error', error);
  process.exit(1);
});
