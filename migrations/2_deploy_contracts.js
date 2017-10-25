var FundboxContract = artifacts.require("./FundboxContract.sol");

module.exports = function(deployer) {
  deployer.deploy(FundboxContract);
};
