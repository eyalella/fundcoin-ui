pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/FundboxContract.sol";

contract TestFundboxContract {
    FundboxContract fundbox_contract = FundboxContract(DeployedAddresses.FundboxContract());

    function testGetFundsAvailable() {
        fundbox_contract.transfer(20000);
        uint returned = fundbox_contract.getFundsAvailable();
        Assert.equal(returned, 20000, "bla bla");
    }

    /*function testRequestLoan() {
        bool b = fundbox_contract.requestLoan(100);
        b = fundbox_contract.requestLoan(100);

        uint r = fundbox_contract.getAvailableCredit();

        Assert.equal(r, 800, "bla bla");
    }*/

    /*function testMakePayment() {
        bool b = fundbox_contract.requestLoan(100);
        b = fundbox_contract.send(50);

        uint r = fundbox_contract.getAvailableCredit();

        Assert.equal(r, 950, "bla bla");
    }*/

}
