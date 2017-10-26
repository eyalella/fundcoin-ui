pragma solidity ^0.4.11;

import 'contracts/TrackingBasicToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract FundboxContract is TrackingBasicToken {

    //########## FUNDCOIN ###########
    string public name = 'FundCoin';
    string public symbol = 'FC';
    uint public decimals = 0;
    uint public INITIAL_SUPPLY = 100;
    uint public PRICE = 1000;
    address owner_addr;
    mapping(address => uint) earned;

    function FundboxContract(){
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        owner_addr = msg.sender;
    }

    function investInFundCoin() public payable returns (uint) {
        transferFrom(owner_addr, msg.sender, SafeMath.div(msg.value, PRICE));
        return balanceOf(msg.sender);
    }

    function payOut(uint fees) {
        uint payout_per_coin = SafeMath.div(fees, INITIAL_SUPPLY);
        for (uint i = 0; i < coin_owners.length; i++) {
            if (coin_owners[i] > 0) {
                uint amount_earned = SafeMath.mul(balances[coin_owners[i]], payout_per_coin);
                coin_owners[i].transfer(amount_earned);
                earned[coin_owners[i]] += amount_earned;
            }
        }
    }


    //########## FUNDBOX CONTRACT ###########
    uint public FEE_AMOUNT = 5000;

    enum LoanRequestStatus { Accepted, Rejected, Pending }

    struct LoanRequest {
        uint amount;
        LoanRequestStatus status;
        uint block_number;
    }

    enum ExtendedLoanStatus { Open, Repaid, Delq }

    struct ExtendedLoan {
        uint amount_extended;
        uint fees;
        uint balance;
        uint block_number_due;
        ExtendedLoanStatus status;
    }

    struct AddressCreditInfo {
        bool exists;
        uint credit_limit;
        uint credit_available;
    }

    struct AddressLoanRequests {
        LoanRequest[] requests;
    }

    struct AddressExtendedLoans {
        ExtendedLoan[] loans;
    }

    mapping(address => AddressLoanRequests) loan_requests;
    mapping(address => AddressExtendedLoans) extended_loans;
    mapping(address => AddressCreditInfo) credit_infos;

    function loanExtendedUpdateCredit(uint amount) {
        if (!credit_infos[msg.sender].exists) {
            credit_infos[msg.sender].exists = true;
            credit_infos[msg.sender].credit_limit = 1000;
            credit_infos[msg.sender].credit_available = 1000 - amount;
        } else {
            credit_infos[msg.sender].credit_available -= amount;
        }
    }

    function repaymentMadeUpdateCredit(uint amount) {
        credit_infos[msg.sender].credit_available += amount;
    }

    function requestLoan(uint amount) public returns (bool) {
        loan_requests[msg.sender].requests.push(LoanRequest({amount : amount, status : LoanRequestStatus.Accepted, block_number : block.number}));
        extended_loans[msg.sender].loans.push(ExtendedLoan({amount_extended : amount, fees : FEE_AMOUNT,
                                    balance : amount,  block_number_due : 0, status : ExtendedLoanStatus.Open}));
        loanExtendedUpdateCredit(amount);
        msg.sender.transfer(amount);
        return true;
    }

    function getAvailableCredit() public returns (uint) {
        return credit_infos[msg.sender].credit_available;
    }

    function makePayment() public returns (bool) {
        for (uint i = 0; i < extended_loans[msg.sender].loans.length; i++) {
            if (extended_loans[msg.sender].loans[i].balance > 0) {
                extended_loans[msg.sender].loans[i].balance -= msg.value;
                if (extended_loans[msg.sender].loans[i].balance == 0) {
                  payOut(extended_loans[msg.sender].loans[i].fees)
                }
                return true;
            }
        }
    }

    function getUserData() public constant returns(uint, uint, uint, uint) {
      uint creditLimit;
      uint numberOfLoans;
      uint fundCoinsOwned;
      uint fundCoinsEarned;

      if (!credit_infos[msg.sender].exists) {
        creditLimit = 0;
        numberOfLoans = 0;
        fundCoinsOwned = 0;
        fundCoinsEarned = 0;
      } else {
        creditLimit = credit_infos[msg.sender].credit_available;
        numberOfLoans = extended_loans[msg.sender].loans.length;
        fundCoinsOwned = balanceOf(msg.sender);
        etherEarned = earned[msg.sender];
      }

      return (fundCoinsOwned, etherEarned, numberOfLoans, creditLimit);
    }

    function getLoanData(uint index) public constant returns(uint, uint, uint) {
      // originalDebt, outstandingDebt, outstandingInterest
      if (!credit_infos[msg.sender].exists) {
        return (0,0,0);
      } else {
        return (extended_loans[msg.sender].loans[index].amount_extended,
                extended_loans[msg.sender].loans[index].balance,
                extended_loans[msg.sender].loans[index].fees);
      }
    }
}
