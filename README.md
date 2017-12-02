![Logo](logo.png)

# botbuilder-markdown [![npm version](https://badge.fury.io/js/botbuilder-markdown.svg)](https://badge.fury.io/js/botbuilder-markdown) [![CircleCI](https://circleci.com/gh/suttna/botbuilder-markdown.svg?style=svg)](https://circleci.com/gh/suttna/botbuilder-markdown) [![codecov](https://codecov.io/gh/suttna/botbuilder-markdown/branch/master/graph/badge.svg)](https://codecov.io/gh/suttna/botbuilder-markdown) [![Join the chat at https://gitter.im/suttna/botbuilder-markdown](https://badges.gitter.im/suttna/botbuilder-markdown.svg)](https://gitter.im/suttna/botbuilder-markdown?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


⚠️  **This is under development. If you want to help 🚀, please contact the Suttna team at opensource@suttna.om**

Slack middleware for Microsoft BotBuilder.

This middleware was created at [Suttna](https://suttna.com) to tackle some of the limitations of BotFramework's current text parser.

## Install

```
yarn add botbuilder-markdown
```

## Usage

```javascript
import * as restify from 'restify'
import { UniversalBot, IEvent, IIdentity } from "botbuilder"
import { ChatConnector } from "botbuilder"
import { markdownMiddleware } from "botbuilder-markdown"

const connector = new ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

const bot = new UniversalBot(connector)
const server = restify.createServer()

server.listen(3000, () => {
  console.log("Bot is listening...")
})

// You just need to add the middleware and then you will be able to send/receive messages with markdown
bot.use(markdownMiddleware)

bot.dialog('/', (session) => {
  session.endDialog('pong')
})

server.post('/api/messages', connector.listen())
```

## Help

If you want to help on improving this package, please contact us at opensource@suttna.com.

## Contact

- Martín Ferández <martin@suttna.com>
- Santiago Doldán <santiago@suttna.com>
