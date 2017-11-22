import * as htmlToMarkdown from "html-to-markdown"

import { IMessage } from "botbuilder"
import { IMarkdownParser } from "../interfaces"

export class TeamsParser implements IMarkdownParser {
  public event: IMessage

  constructor(event: IMessage) {
    this.event = event
  }

  public convertTextToMarkdown(): string {
    const markup = this.event.attachments.find((attachment) => attachment.contentType === "text/html")

    if (markup) {
      let text = markup.content

      // Remove \n|\r|\t
      text = text.replace(/(\n|\r|\t)/gi, "")
      // Replace mentions span tags with <at> tag like botframework
      text = text.replace(/<span.+?itemtype=".+?Mention".*?>(.+?)<\/span>/gi, "<at>$1</at>")
      // Remove img tags
      text = text.replace(/<img.+\/>/gi, "")
      // Replace HTML entities spaces
      text = text.replace(/&nbsp;/gi, " ")
      // Remove HTML entities
      text = text.replace(/(&.{1,4};)/gi, "")

      // Remove span attributes
      text = text.replace(/<span(\s.+?)>/gi, "<span>")
      // Remove div attributes
      text = text.replace(/<div(\s.+?)>/gi, "<div>")
      // Transform link into markdown links
      text = text.replace(/<a\s?.*?href=[{",'}](\S+)[{",'}].*?>(.*?)<\/a>/gi, "[$2]($1)")

      // Add \n to div elements
      text = text.replace(/(<div>.+?<\/div>)/gi, "$1\n")
      // Add \n to li elements
      text = text.replace(/(<li>.+?<\/li>)/gi, "$1\n")

      // Convert any left markup tag into markdown
      return htmlToMarkdown.convert(text)
    } else {
      return this.event.text
    }
  }

  public parseMarkdown(): string {
    let text = this.event.text

    // Use • for list bullets
    text = text.replace(/^(?:\*( .*?\n))/gmi, "•$1")
    // Replace \n with <br />
    text = text.replace(/\n/gi, "<br />")

    return text
  }
}
