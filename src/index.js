const TransactionStatus = require("./TransactionStatus");
const Telebot = require("telebot");
const { token, nodeAppVersion } = require("./config");

const bot = new Telebot({
  token,
  polling: {
    interval: 5000,
  },
});

const watchRegExp = /^\/watch ([a-z0-9]{64}) ([0-9]*) ?(.*)$/;

bot.on(["/start"], (msg) =>
  msg.reply.text(
    "Hi there 👋\nI am your bitcoin butler💂‍♂️\nHonored to monitor your bitcoin transaction🙏🏼\n\nUsage:\n/watch <txid> <n of confirmations> <optional label>\nGet notified when your bitcoin transaction reached n of confirmations\n/commit\nGet the current git commit the bot is running. Compare with https://github.com/kinothUI/bitcoin-butler to see if my maintainer did something suspicious"
  )
);

bot.on(watchRegExp, async (msg, props) => {
  console.log("--------------------- MSG INCOMING ---------------------");
  console.log(new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }));
  console.log("--------------------------------------------------------");
  console.log(msg.text);
  console.log("------------------------ MSG END -----------------------");

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

bot.on("/commit", (msg) =>
  msg.reply.text(
    `Bot is running on commit ${nodeAppVersion}\nhttps://github.com/kinothUI/bitcoin-butler`
  )
);

bot.start();
