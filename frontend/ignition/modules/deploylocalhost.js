const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = Deploy = buildModule("Deploy", (m) => {
  const accessRights = m.contract("RolesAndRights", []);
  const nft = m.contract("NFT", [accessRights]);
  return { nft,accessRights };
});
