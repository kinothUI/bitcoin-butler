const { callBtcNode } = require("./callBtcNode");
const { config } = require("./config");

class TransactionStatus {
  constructor(props) {
    this.txid = new String(props.txid);
    this.threshold = new Number(props.threshold);
    this.label = new String(props.label);
    this.confCount = 0;
    this.confirmations = this.get(this.txid);
  }

  async thresholdReached() {
    return (await this.get(this.txid)) >= this.threshold;
  }

  async get(txid) {
    this.confCount = await callBtcNode(config, txid).then(
      (res) => (config.useFullnode ? res.data.result.confirmations : res.data.confirmations),
      (err) => err
    );
    if (!this.confCount) this.confCount = 0;
    return this.confCount;
  }

  hasLabel() {
    return this.label.length ? this.label.trim() : false;
  }
}

module.exports = TransactionStatus;
