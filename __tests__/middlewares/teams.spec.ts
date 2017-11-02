import "jest"

import { UniversalBot } from "botbuilder"
import { markdownMiddleware } from "../../src/index"
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

    bot.use(markdownMiddleware)
  })

  describe("when receiving a message", () => {
    it("converts a link with custom name to markdown", async () => {
      const text = "This is a link <a href='https://google.com.uy'>Google</a> with a custom name."

      expect(await tester.receive(text))
        .toBe("This is a link [Google](https://google.com.uy) with a custom name.")
    })

    it("converts a list to markdown", async () => {
      /* tslint:disable:max-line-length */
      const text = "<div>Text:</div>\n\n\r\n<ul>\r\n\n\t\r\n<li>First item\n\t</li><li>Second item\n\t</li><li>&nbsp;\n</li></ul>"
      /* tslint:enable:max-line-length */

      expect(await tester.receive(text))
        .toBe("Text:\n* First item\n* Second item\n* \n")
    })
  })

  describe("when sending a message", () => {
    it("converts \\n to <br />", async () => {
      const text = "First line\nSecond line\n\nEnd"

      expect(await tester.send(text))
        .toBe("First line<br />Second line<br /><br />End")
    })

    it("converts list bullets into •", async () => {
      const text = "Text:\n* First item\n* **Strong** item\n* \n"

      expect(await tester.send(text))
        .toBe("Text:<br />• First item<br />• **Strong** item<br />• <br />")
    })

    it("does not change * to • when is not a list", async () => {
      const text = "This is a text that contains **bold words** (**more bold words**)\nAnd it should not show •"

      expect(await tester.send(text))
        .toBe("This is a text that contains **bold words** (**more bold words**)<br />And it should not show •")
    })
  })
})
