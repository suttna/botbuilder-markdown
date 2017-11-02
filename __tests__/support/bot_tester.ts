import { IMessage, Message, UniversalBot } from "botbuilder"

import { BotSource } from "../../src/interfaces"

export class BotTester {
  private bot: UniversalBot
  private pSource: string

  constructor(bot: UniversalBot) {
    this.bot = bot
    this.pSource = "test"
  }

  public source(source: string): BotTester {
    this.pSource = source

    return this
  }

  public send(text: string): Promise<string> {
    const message = this.buildMessage(text)

    return new Promise((resolve) => {
      this.bot.on("outgoing", (msg: IMessage) => {
        resolve(msg.text)
      })

      this.bot.send(message)
    })
  }

  public receive(text: string): Promise<string> {
    const message = this.buildMessage(text)

    return new Promise((resolve) => {
      this.bot.on("incoming", (msg: IMessage) => {
        resolve(msg.text)
      })

      this.bot.receive(message)
    })
  }

  private buildMessage(text: string): IMessage {
    const message = new Message().address({
      channelId: this.pSource,
      user: { id: "U1" },
      bot: { id: "B1" },
    }).text(text)

    if (this.pSource === BotSource.Teams) {
      message.attachments([{ contentType: "text/html", content: text }])
    }

    return message.toMessage()
  }
}
