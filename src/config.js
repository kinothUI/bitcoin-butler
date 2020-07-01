require("dotenv").config();

const { TG_BOT_TOKEN, BTC_NODE, RPC_PORT, RPC_USER, RPC_PASS, NODE_APP_VERSION } = process.env;

module.exports = {
  token: TG_BOT_TOKEN,
  nodeAppVersion: NODE_APP_VERSION,
  config: {
    btcNodeAddress: BTC_NODE,
    rpcPort: RPC_PORT,
    rpcUser: RPC_USER,
    rpcPass: RPC_PASS,
  },
};
