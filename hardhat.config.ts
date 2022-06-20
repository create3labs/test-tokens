import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "./tasks/deploy";

dotenv.config();

const networks: any = {};
if (process.env.PRIVATE_KEY) {
  networks['autobahn-canary'] = {
    url: 'https://rpc.autobahn.network',
    accounts: [`0x${process.env.PRIVATE_KEY}`]
  }
}

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks,
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
