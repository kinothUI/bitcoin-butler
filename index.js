const TransactionStatus = require("./TransactionStatus");
const Telebot = require("telebot");
const { token } = require("./config.js");

const bot = new Telebot({
  token,
  polling: {
    interval: 5000,
  },
});

const watchRegExp = /^\/watch ([a-z0-9]{64}) ([0-9]*) ?(.*)$/;

bot.on(["/start"], (msg) =>
  msg.reply.text(
    "Hi there 👋\nI am your bitcoin butler💂‍♂️\nHonored to monitor your bitcoin transaction🙏🏼\n\nHit me with /watch <txid> <n of confirmations> <optional label> and I'll get back to you as soon as your confirmation-level is reached!"
  )
);

bot.on(watchRegExp, async (msg, props) => {
  const txid = props.match[1];
  const threshold = props.match[2];
  const label = props.match[3];

  if (!threshold)
    return bot.sendMessage(
      msg.from.id,
      "Excuse me!\nI am not sure when to get back to you. Please specify a confirmation-threshold!"
    );
  else if (threshold == 0)
    return msg.reply.text("ಠ_ಥ\n\nSir, really? Zero confirmations?", { asReply: true });

  const txStatus = new TransactionStatus({ txid, threshold, label });

  if (await txStatus.thresholdReached()) {
    const alreadyConfirmedText = `Time for some beer, Sir🍻\n\nTransaction 🏷'ed ${
      txStatus.label
    } is already confirmed ${
      txStatus.confCount > 1 ? txStatus.confCount + " times" : txStatus.confCount + " time"
    }`;

    return bot.sendMessage(msg.from.id, alreadyConfirmedText, { replyToMessage: msg.message_id });
  }

  bot.sendMessage(
    msg.from.id,
    txStatus.hasLabel()
      ? `Alright,\nI'll take care on your transaction 🏷'ed ${txStatus.label}!\n\nTransaction-ID: ${txStatus.txid}`
      : `Alright,\nI'll take care on your transaction!\n\nTransaction-ID: ${txStatus.txid}`,
    { replyToMessage: msg.message_id }
  );

  const interval = setInterval(async () => {
    if (await txStatus.thresholdReached()) {
      const { txid, confCount, label } = txStatus;

      clearInterval(interval);
      return bot.sendMessage(
        msg.from.id,
        txStatus.hasLabel()
          ? `Your transaction 🏷'ed ${label} just hit ${
              confCount > 1 ? confCount + " confirmations" : confCount + " confirmation"
            }\n\nTransactionID: ${txid}`
          : `Your transaction just hit ${
              confCount > 1 ? confCount + " confirmations" : confCount + " confirmation"
            }`,
        { replyToMessage: msg.message_id }
      );
    }
  }, 30000);
});

bot.start();
