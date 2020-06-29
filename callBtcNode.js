const axios = require("axios").default;

module.exports = {
  callBtcNode: (config, txid) => {
    const data = {
      method: "getrawtransaction",
      params: new Array(txid, true),
    };

    const options = config.useFullnode
      ? {
          url: `http://${config.rpcUser}:${config.rpcPass}@${config.btcNodeAddress}:${config.rpcPort}`,
          method: "POST",
          headers: { "content-type": "text/plain;" },
          data,
        }
      : {
          url: `${config.endpoint}/${txid}`,
          method: "GET",
        };

    return axios.request(options).then(
      (response) => response,
      (error) => error
    );
  },
};
