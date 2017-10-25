pragma solidity ^0.4.11;


contract FundboxContract {

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

    // check if we can get current balance, if so, not needed
    uint public funds_available;
    function fundContract() public payable {
        funds_available += msg.value;

    }

    function() payable{
        funds_available += msg.value;
    }

    function getFundsAvailable() public returns (uint) {
        return funds_available;
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
        extended_loans[msg.sender].loans.push(ExtendedLoan({amount_extended : amount, fees : 0,
                                    balance : amount,  block_number_due : 0, status : ExtendedLoanStatus.Open}));
        loanExtendedUpdateCredit(amount);
        msg.sender.transfer(amount);
        return true;
    }

    function getAvailableCredit() public returns (uint) {
        return credit_infos[msg.sender].credit_available;
    }

    function makePayment(uint amount) public returns (bool) {
        for (uint i = 0; i < extended_loans[msg.sender].loans.length; i++) {
            if (extended_loans[msg.sender].loans[i].balance > 0) {
                extended_loans[msg.sender].loans[i].balance -= amount;
                return true;
            }
        }
    }

    function getUserData() public constant returns(uint, uint, uint, uint) {
      uint creditLimit;
      uint numberOfLoans;
      uint fundCoinsOwned;
      uint fundCoinsEarned;
      
      //creditLimit = credit_infos[msg.sender].credit_available;
      //numberOfLoans = extended_loans[msg.sender].loans.length;
      creditLimit = 77;
      numberOfLoans = 88;
      fundCoinsOwned = 0;
      fundCoinsEarned = 0;

      return (fundCoinsOwned, fundCoinsEarned, numberOfLoans, creditLimit);
    }

    function getLoanData(uint index) public constant returns(uint, uint, uint) {
      // originalDebt, outstandingDebt, outstandingInterest
      return (extended_loans[msg.sender].loans[index].amount_extended,
              extended_loans[msg.sender].loans[index].balance,
              extended_loans[msg.sender].loans[index].fees);
    }

    /* function startSession() public returns?{
      fundCoinsOwned == fundsInvested
      fundCoinsEarned == interest

      numberOfLoans
      getLoan - originalDebt, outstandingDebt, outstandingInterest
      creditLimit
    } */
}
