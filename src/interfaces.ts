import { IMessage } from "botbuilder"

export enum BotSource {
  Teams = "msteams",
  Slack = "slack",
  Test = "test",
}

export enum EventType {
  Messages = "messages",
}

export interface IMarkdownParser {
  event: IMessage
  convertTextToMarkdown(): string
  parseMarkdown(): string
}
