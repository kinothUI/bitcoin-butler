## bitcoin-butler

A telegram bot that notifies when your bitcoin transaction has reached _n_ numbers of confirmation's, written in [NodeJS](https://nodejs.org/).
The bot works either with your own [bitcoin-core node](https://bitcoincore.org/en/download/) or with [blockcyphers API](https://www.blockcypher.com/), it's up to you!

#### Getting Started

1. Register a new Bot in Telegram [@BotFather](https://t.me/BotFather) and save the token
2. `git clone https://github.com/kinothUI/bitcoin-butler.git`
3. `npm install`
4. edit `config.js`
5. `npm run dev`
6. `/start` your bot in Telegram

#### Usage

Send `/watch <txid> <n confirmations> <optinal label>` to your bot. Use label's to manage your bitcoin transactions. Simply append the label as a 3rd parameter like `/watch d29d979ea67db82ce97034f444526d37a939f0b08acf5eb15a449bc3f54c933a 5 tx-to-savings-account`

Also, you could just hook up with a [dev version](https://t.me/BitcoinButler_bot) currently running on my RPI with a `console.log(msg)` on [line 21](index.js) for debuggin. This bot querie's blockcyphers's API.

[How to create a Telegram-Bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot)

bitcoin donations: 1GdCZAYL4UvefsMTPit6UBaGXHFRYyorWC  
[Tip me on Lightning](https://tippin.me/@kinothUI)

#### Happy transacting ₿
