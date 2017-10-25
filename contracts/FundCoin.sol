pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract FundCoin is StandardToken {
    string public name = 'FundCoin';
    string public symbol = 'FC';
    uint public decimals = 0;
    uint public INITIAL_SUPPLY = 12000;

    function FundCoin(){
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}
