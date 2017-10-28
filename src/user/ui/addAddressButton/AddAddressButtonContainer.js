import {connect} from 'react-redux'
import AddAddressButton from './AddAddressButton'
// import { loginUser } from './LoginButtonActions'
import {default as contract} from 'truffle-contract'
import store from "../../../store"
import {browserHistory} from 'react-router';

import fundcoin_contract from "../../../../build/contracts/FundboxContract.json";
const Fundcoin = contract(fundcoin_contract);

const mapStateToProps = (state, ownProps) => {
    return {}
}

function updateUserData(fundCoinsOwned, etherEarned, numberOfLoans, creditLimit, totalLoansBalance) {
    return {
        type: 'UPDATE_USER_DATA',
        fundCoinsOwned,
        etherEarned,
        numberOfLoans,
        creditLimit,
        totalLoansBalance
    }
}

let userAddress;

const mapDispatchToProps = (dispatch) => {
    return {
        investMoney: (event) => {
            // INVEST IN FUNDCOIN
            const web3 = store.getState().web3.web3Instance;
            const amountToInvest = document.getElementById("investMoney").value;
            Fundcoin.setProvider(web3.currentProvider);
            Fundcoin.deployed()
                .then((contract) => {
                    contract.investInFundCoin({
                        value: web3.toWei(amountToInvest, "ether"),
                        gas: 4476768,
                    });
                })
        },
        sendUserAddress: (event) => {
            // GET USER DATA
            const web3 = store.getState().web3.web3Instance;
            userAddress = document.getElementById("addressInput").value;
            web3.eth.defaultAccount = userAddress;
            Fundcoin.setProvider(web3.currentProvider);
            Fundcoin.deployed()
                .then((contract) => contract.getUserData.call())
                .then((data) => {
                    console.log(web3);
                    const fundCoinsOwned = data[0].toNumber();
                    const etherEarned = data[1].toNumber();
                    const numberOfLoans = data[2].toNumber();
                    const creditLimit = web3.fromWei(data[3].toNumber());
                    const totalLoansBalance = web3.fromWei(data[5].toNumber());
                    store.dispatch(updateUserData(fundCoinsOwned, etherEarned, numberOfLoans, creditLimit, totalLoansBalance));
                })


        },
        takeLoan: () => {
            // REQUEST LOAN
            const web3 = store.getState().web3.web3Instance;
            const borrowAmount = document.getElementById("takeMoney").value;
            Fundcoin.deployed()
              .then((contract) => {
                contract.requestLoan(web3.toWei(borrowAmount, "ether"), { gas: 4476768 });
              })
        }
    }
}

const AddAddressButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddAddressButton);

export default AddAddressButtonContainer

// MAKE PAYMENT
// Fundcoin.deployed()
//   .then((contract) => {
//     contract.makePayment({
//       value: 1000000000000005000,
//       gas: 4476768,
//     }).then(() => {
//       debugger;
//     })
//   })


// GET LOAN DATA
// Fundcoin.deployed()
//   .then((contract) => contract.getLoanData.call(0))
//   .then((data) => console.log(data))

// SEND TRANSACTION
// Fundcoin.deployed()
//   .then((contract) => {
//     contract.sendTransaction({
//         from: userAddress,
//         to: contract.address,
//         value: web3.toWei(15, "ether")
//     }).then((err, data) => {
//       debugger;
//     })
//   })

// GET CONTRACT BALANCE
// Fundcoin.deployed().then((contract) => {
//   web3.eth.getBalance(contract.address, (err, data) => console.log(data));
// })