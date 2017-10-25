var DumbContract = artifacts.require("./DumbContract.sol");

module.exports = function(deployer) {
  deployer.deploy(DumbContract);
};