require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      chainId: 11155111,
      url: process.env.REACT_APP_SEPOLIA_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "INR",
    coinmarketcap: process.env.REACT_APP_COINMARKETCAP_API_KEY,
    token: "matic",
    outputFile: "gasReportsPOLY.txt",
    noColors: true,
  },
};
