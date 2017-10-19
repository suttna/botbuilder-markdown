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

      // Replace mentions span tags with <at> tag like botframework
      text = text.replace(/<span.+?itemtype=".+?Mention".*?>(.+?)<\/span>/gi, "<at>$1</at>")
      // Remove span tags
      text = text.replace(/(<span.*?>.*?<\/span>)/gi, "")
      // Remove img tags
      text = text.replace(/<img.+\/>/gi, "")
      // Replace HTML entities spaces
      text = text.replace(/&nbsp;/gi, " ")
      // Remove HTML entities
      text = text.replace(/(&.{1,4};)/gi, "")
      // Remove div attributes
      text = text.replace(/<div(\s.+?)>/gi, "")
      // Transform link into markdown links
      text = text.replace(/<a\s?.*?href=[{",'}](\S+)[{",'}].*?>(.*?)<\/a>/gi, "[$2]($1)")

      // Replace divs with \n
      if (text.search(/<div>.*<\/div>/) !== -1) {
        text = text.match(/<div>(.+?)<\/div>/gi).join("\n").replace(/<div>|<\/div>/g, "")
      }

      // Convert any left markup tag into markdown
      return htmlToMarkdown.convert(text)
    } else {
      return this.event.text
    }
  }

  public parseMarkdown(): string {
    let text = this.event.text

    // Replace \n with <br />
    text = text.replace(/\n/gi, "<br />")

    return text
  }
}
