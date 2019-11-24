const Telebot = require("telebot");
const TXID = require("./txid");
const asyncForEach = require("./forEach");
const blockExplorer = require("blockchain.info").blockexplorer;

const bot = new Telebot({
  token: "",
  polling: {
    interval: 5000
  }
});

const txid = new TXID({
  minConfirmations: 1
});

bot.on(["/txAdd"], (msg, props) => {
  const id = msg.from.id;
  const replyToMessage = msg.message_id;
  const regExp = /[a-z0-9]{64,64}/;
  const txid = msg.text.match(regExp);

  if (responseAdd) {
    return bot.sendMessage(id, `✅ TXID ${txid} added for observation 🧐`, {
      replyToMessage
    });
  } else {
    return bot.sendMessage(id, "❌ TXID still being observed", {
      replyToMessage
    });
  }
});

bot.on(["/txDel"], (msg, props) => {
  const id = msg.from.id;
  const replyToMessage = msg.message_id;
  const regExp = /[a-z0-9]{64,64}/;
  const txid = msg.text.match(regExp);

  const responseRemove = remove(txid);

  if (responseRemove)
    bot.sendMessage(id, `✅ TXID successfully removed`, { replyToMessage });
  else
    bot.sendMessage(id, "❌ some mystirious error occured", {
      replyToMessage
    });
});

bot.start();
