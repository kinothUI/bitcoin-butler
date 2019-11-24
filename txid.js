const blockExplorer = require("blockchain.info").blockexplorer;
const asyncForEach = require("./forEach");
const http = require("http");

class TXID {
  constructor(props) {
    this.txids = [];
    this.minConfirmations = props.minConfirmations;
  }

  add(txid) {
    //check if txid already present
    if (this.txids.indexOf(txid) === -1) {
      this.txids.push(txid);
      return true;
    } else {
      return false;
    }
  }

  remove(txid) {
    let newArray = this.txids.filter(item => item === txid);
    if (newArray.length === this.txids.length) return false;
    else {
      this.txids = newArray;
      return true;
    }
  }

  check() {
    (async () => {
      try {
      } catch (err) {
        console.error(err);
      }
    })();
  }
}

module.exports = TXID;
