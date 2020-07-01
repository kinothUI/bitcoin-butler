const axios = require("axios").default;

module.exports = {
  callBtcNode: (config, txid) => {
    const data = {
      method: "getrawtransaction",
      params: new Array(txid, true),
    };

    const options = {
      url: `http://${config.rpcUser}:${config.rpcPass}@${config.btcNodeAddress}:${config.rpcPort}`,
      method: "POST",
      headers: { "content-type": "text/plain;" },
      data,
    };

    return axios.request(options).then(
      (response) => response,
      (error) => error
    );
  },
};
