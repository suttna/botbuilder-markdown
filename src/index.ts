import { UniversalBot } from "botbuilder"

import { textParserMiddleware } from "./middlewares"

export function loadMarkdownMiddleware(bot: UniversalBot): void {
  bot.use(textParserMiddleware)
}
