## bitcoin-butler

A telegram bot that notifies when your bitcoin transaction has reached _n_ numbers of confirmation's, written in [NodeJS](https://nodejs.org/).
The bot works with your own [bitcoin-core node](https://bitcoincore.org/en/download/)

[![Build Status](https://travis-ci.com/kinothUI/bitcoin-butler.svg?branch=master)](https://travis-ci.com/kinothUI/bitcoin-butler)

#### Getting Started

1. Register a new Bot in Telegram [@BotFather](https://t.me/BotFather) and save the token
2. `git clone https://github.com/kinothUI/bitcoin-butler.git`
3. `cd bitcoin-butler/ && npm install`
4. `nano .env`
5. declare environment variables `TG_BOT_TOKEN`, `BTC_NODE`, `RPC_PORT`, `RPC_USER`, `RPC_PASS`
6. `npm run dev`

#### Usage

`/start` - starts the bot in Telegram  
`/watch <txid> <n confirmations> <optinal label>` - monitors a bitcoin transaction until n confirmations  
`/commit` - retriev current commit-id, so you can always be sure nothing suspicious happend in project directory

[Chat with Live Version](https://t.me/Bitcoinbbot)

[How to create a Telegram-Bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot)

bitcoin donations: 1GdCZAYL4UvefsMTPit6UBaGXHFRYyorWC  
[Tip me on Lightning](https://tippin.me/@kinothUI)

#### Happy transacting ₿
