import { IMessage, IMiddlewareMap } from "botbuilder"
import { EventType } from "../interfaces"
import { Parser } from "../lib/parser"

export let textParserMiddleware: IMiddlewareMap = {
  receive: (event: IMessage, next: () => void) => {
    const parser = new Parser(event)

    if (event.type === EventType.Messages) {
      event.text = parser.convertTextToMarkdown()
    }

    next()
  },
  send: (event: IMessage, next: () => void) => {
    const parser = new Parser(event)

    if (event.type === EventType.Messages) {
      event.text = parser.parseMarkdown()
    }

    next()
  },
}
