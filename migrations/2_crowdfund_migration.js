const CeloCrowdfund = artifacts.require("CeloCrowdfund");

module.exports = function (deployer) {
  deployer.deploy(CeloCrowdfund);
};