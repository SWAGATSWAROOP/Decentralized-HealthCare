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
  },
  gasReporter: {
    enabled: true,
    currency: "INR",
    coinmarketcap: "66adcdf2-c736-4c96-bef0-65db0e192cbb",
    token: "matic",
    outputFile: "gasReportsPOLY.txt",
    noColors: true,
  },
};
