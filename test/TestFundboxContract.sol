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
        Assert.equal(bl, 100, "bla bla");
    }

    function testGetUserData() {
        var (a,b,c,d,e,f) = fundbox_contract.getUserData();
        Assert.equal(d, 0, "bla bla");
    }

    function testGetUserData2() {
        fundbox_contract.requestLoan(1);
        //var (a,b,c,d,e,f) = fundbox_contract.getUserData();
        //Assert.equal(c, 1, "1 loan");
        //Assert.equal(f, 10, "balance loan at 10");
    }

    function testGetLoanData() {
        var (a,b,c) = fundbox_contract.getLoanData(1);
        Assert.equal(b, 0, "bla bla");
    }

    /*function testRequestLoan() {
        fundbox_contract.investInFundCoin.value(5000)();
        var (a,b,c) = fundbox_contract.requestLoan(1000);
        Assert.equal(b, 8, "bla bla");
    }

    function testRequestLoan() {
        var (a,b,c) = fundbox_contract.requestLoan(1000);
        Assert.equal(b, 8, "bla bla");
    }

    function testMakePayment() {
        fundbox_contract.investInFundCoin.value(2000)();
        uint bl = fundbox_contract.balanceOf(msg.sender);
        Assert.equal(bl, 98, "bla bla");
    }*/
}
