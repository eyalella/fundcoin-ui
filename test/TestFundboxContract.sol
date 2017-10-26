pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/FundboxContract.sol";

contract TestFundboxContract {
    FundboxContract fundbox_contract = FundboxContract(DeployedAddresses.FundboxContract());

    uint public initialBalance = 10 ether;

    function testShit() {
        fundbox_contract.investInFundCoin.value(2000)();
        uint bl = fundbox_contract.balanceOf(msg.sender);
        Assert.equal(bl, 98, "bla bla");
    }

    function testGetUserData() {
        var (a,b,c,d) = fundbox_contract.getUserData();
        Assert.equal(d, 0, "bla bla");
    }

    function testGetLoanData() {
        var (a,b,c) = fundbox_contract.getLoanData(1);
        Assert.equal(b, 8, "bla bla");
    }
}