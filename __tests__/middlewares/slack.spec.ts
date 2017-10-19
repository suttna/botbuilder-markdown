import "jest"

import { UniversalBot } from "botbuilder"
import { markdownMiddleware } from "../../src/index"
import { BotSource } from "../../src/interfaces"

import { BotTester } from "../support/bot_tester"
import { TestConnector } from "../support/test_connector"

const connector = new TestConnector()

describe("SLACK markdown middleware", () => {
  let bot: UniversalBot
  let tester: BotTester

  beforeEach(() => {
    bot = new UniversalBot(connector)
    tester = new BotTester(bot).source(BotSource.Slack)

    bot.use(markdownMiddleware)
  })

  describe("when receiving a message", () => {
    it("converts a link with custom name to markdown", async () => {
      const text = "This is a link <https://google.com.uy|Google> with a custom name."

      expect(await tester.receive(text))
        .toBe("This is a link [Google](https://google.com.uy) with a custom name.")
    })

    it("converts a simple link to markdown", async () => {
      const text = "Here you have a simple link <https://google.com.uy>"

      expect(await tester.receive(text))
        .toBe("Here you have a simple link [https://google.com.uy](https://google.com.uy)")
    })
  })

  describe("when sending a message", () => {
    it("converts a markdown link with custom name to Slack format", async () => {
      const text = "This is a link [Google](https://google.com.uy) with a custom name."

      expect(await tester.send(text))
        .toBe("This is a link <https://google.com.uy|Google> with a custom name.")
    })

    it("converts a simple markdown link to Slack format", async () => {
      const text = "Here you have a simple link [https://google.com.uy](https://google.com.uy)"

      expect(await tester.send(text))
        .toBe("Here you have a simple link <https://google.com.uy|https://google.com.uy>")
    })
  })
})
