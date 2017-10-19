import { SlackParser, TeamsParser } from "./parsers"

import { IMessage } from "botbuilder"
import { BotSource, IMarkdownParser } from "./interfaces"

export class Parser implements IMarkdownParser {
  public event: IMessage

  constructor(event: IMessage) {
    this.event = event
  }

  public convertTextToMarkdown(): string {
    return this.strategy.convertTextToMarkdown()
  }

  public parseMarkdown(): string {
    return this.strategy.parseMarkdown()
  }

  private get strategy(): IMarkdownParser {
    switch (this.event.address.channelId) {
      case BotSource.Slack:
        return new SlackParser(this.event)
      case BotSource.Teams:
        return new TeamsParser(this.event)
      default:
        throw new Error("Unsupported channelId")
    }
  }
}
