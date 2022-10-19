import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "./tasks";

dotenv.config();

const networks: any = {};
if (process.env.PRIVATE_KEY) {
  networks.autobahn = {
    url: "https://autobahn-rpc.com",
    accounts: [`0x${process.env.PRIVATE_KEY}`],
  };
  networks.gnosis = {
    url: "https://rpc.ankr.com/gnosis",
    accounts: [`0x${process.env.PRIVATE_KEY}`],
    gasPrice: process.env.GAS_PRICE,
  };
}

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks,
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      autobahn: "abc", // no API key needed
      gnosis: process.env.ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "gnosis",
        chainId: 100,
        urls: {
          apiURL: "https://api.gnosisscan.io/api",
          browserURL: "https://gnosisscan.io/",
        },
      },
      {
        network: "autobahn",
        chainId: 45000,
        urls: {
          apiURL: "https://api.autobahn-explorer.com/api",
          browserURL: "https://autobahn-explorer.com",
        },
      },
    ],
  },
};

export default config;
