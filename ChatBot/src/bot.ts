import { Bot, InlineKeyboard } from "grammy";
import { introductionMessage } from "./greetings"
import { openAI_Ask } from "./openai"

// Create a bot using the Telegram token
const bot = new Bot(process.env.TELEGRAM_TOKEN || "")

const aboutRulKeyboard = new InlineKeyboard().url(
  "Host you own bot for free.",
  "https://cyclic.sh"
)

const replyWithIntro = (ctx: any) =>
  ctx.reply(introductionMessage, {
    reply_markup: aboutRulKeyboard,
    parse_mode: "HTML",
  });

const relayAiChat = async (ctx: any) => {
  const userInputText = ctx.update.message.text
  console.log(`[DAVID] message = ${userInputText}`)
  await openAI_Ask(userInputText, ctx)
  // ctx.reply('Ai response...')
}

bot.command("start", replyWithIntro);
bot.command("yo", (ctx) => ctx.reply(`Yo ${ctx.from?.username}`))
bot.on("message", relayAiChat);
bot.start()