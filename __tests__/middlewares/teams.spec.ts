import "jest"

import { UniversalBot } from "botbuilder"
import { loadMarkdownMiddleware } from "../../src/index"
import { BotSource } from "../../src/interfaces"

import { BotTester } from "../support/bot_tester"
import { TestConnector } from "../support/test_connector"

const connector = new TestConnector()

describe("TEAMS markdown middleware", () => {
  let bot: UniversalBot
  let tester: BotTester

  beforeEach(() => {
    bot = new UniversalBot(connector)
    tester = new BotTester(bot).source(BotSource.Teams)

    loadMarkdownMiddleware(bot)
  })

  describe("when receiving a message", () => {
    it("converts a link with custom name to markdown", async () => {
      const text = "This is a link <a href='https://google.com.uy'>Google</a> with a custom name."

      expect(await tester.receive(text))
        .toBe("This is a link [Google](https://google.com.uy) with a custom name.")
    })
  })
})
