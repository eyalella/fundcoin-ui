import { connect } from 'react-redux'
import AddAddressButton from './AddAddressButton'
// import { loginUser } from './LoginButtonActions'
import { default as contract } from 'truffle-contract'
import store from "../../../store"

import fundcoin_contract from "../../../../build/contracts/FundboxContract.json";
const Fundcoin = contract(fundcoin_contract);

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendUserAddress: (event) => {
      const web3 = store.getState().web3.web3Instance;
      const userAddress = document.getElementById("addressInput").value;
      web3.eth.defaultAccount = userAddress;
      Fundcoin.setProvider(web3.currentProvider);

      // INVEST IN FUNDCOIN
      // Fundcoin.deployed()
      //   .then((contract) => {
      //     contract.investInFundCoin({
      //       value: web3.toWei(1, "ether"),
      //       gas: 4476768,
      //     }).then(() => {
      //       debugger;
      //     })
      //   })

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

      // REQUEST LOAN
      // Fundcoin.deployed()
      //   .then((contract) => {
      //     contract.requestLoan(web3.toWei(1, "ether"), { gas: 4476768 }).then(() => {
      //       debugger;
      //     })
      //   })

      // GET USER DATA
      // Fundcoin.deployed()
      //   .then((contract) => contract.getUserData.call())
      //   .then((data) => console.log(data))

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
    },
  }
}

const AddAddressButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(AddAddressButton)

export default AddAddressButtonContainer
