import { IMessage } from "botbuilder"

export enum BotSource {
  Teams = "msteams",
  Slack = "slack",
  Test = "test",
}

export enum EventType {
  Message = "message",
}

export interface IMarkdownParser {
  event: IMessage
  convertTextToMarkdown(): string
  parseMarkdown(): string
}
