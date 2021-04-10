const CeloCrowdfund = artifacts.require("CeloCrowdfund");

module.exports = function (deployer) {
  // 0x874069fa1eb16d44d622f2e0ca25eea172369bc1 == cUSD contract
  deployer.deploy(CeloCrowdfund, '0x874069fa1eb16d44d622f2e0ca25eea172369bc1');
};