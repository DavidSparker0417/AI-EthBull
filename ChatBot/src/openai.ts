import OpenAI from "openai";
import { getCurrentTimestamp } from "./utils/time"

const openai = new OpenAI();

export async function openAI_Ask(question: string, ctx: any) {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: question }],
    stream: true,
  });
  let reply: string = ""
  // let lastReplied = getCurrentTimestamp()
  for await (const chunk of stream) {
    reply += chunk.choices[0]?.delta?.content || ""
    // const curTime = getCurrentTimestamp()
    // if (curTime - lastReplied < 100)
    //   continue
    // if (ctx && ctx.reply)
    //   ctx.reply(reply)
    // reply = ""
  }
  if (ctx && ctx.reply)
    ctx.reply(reply)
}
