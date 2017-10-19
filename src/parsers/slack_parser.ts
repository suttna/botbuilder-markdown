import { IMessage } from "botbuilder"
import { IMarkdownParser } from "../interfaces"

export default class SlackParser implements IMarkdownParser {
  public event: IMessage

  constructor(event: IMessage) {
    this.event = event
  }

  public convertTextToMarkdown(): string {
    let text = this.event.text

    // Transform link to markdown
    text = text.replace(/<(https?:\/\/(?:[^\|>])*)\|((?:[^\|<>])*)>/gi, "[$2]($1)")
    text = text.replace(/<(https?:\/\/(?:[^\|<>])*)>/gi, "[$1]($1)")

    // Transform mailto to plain text
    text = text.replace(/<mailto:(.*)\|(.*)>/, "$1")

    return text
  }

  public parseMarkdown(): string {
    let text = this.event.text

    // Transform markdown link format to Slack format
    text = text.replace(/\[(.*?)\]\((.*?)\)/gi, "<$2|$1>")

    // Standarize tags
    text = text.replace(/(\*{2})/gi, "<bold>")
    text = text.replace(/(\*{1})/gi, "<italic>")

    // Apply slack transformations tags
    text = text.replace(/(<italic>)/gi, "_")
    text = text.replace(/(<bold>)/gi, "*")

    return text
  }
}
