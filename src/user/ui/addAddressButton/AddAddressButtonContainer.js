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
      debugger;
      web3.eth.defaultAccount = userAddress
      Fundcoin.setProvider(web3.currentProvider);
      Fundcoin.deployed()
        .then((contract) => {
          contract.sendTransaction({
              from: userAddress,
              to: contract.address,
              value: web3.toWei(15, "ether")
          }).then((err, data) => {
            debugger;
          })
        })

      // web3.eth.getBalance(contract.address, () => {
      //   console.log(arguments)
      //   contract.requestLoan(web3.toWei(2, "ether")).then(() => {
      //     debugger;
      //   })
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
