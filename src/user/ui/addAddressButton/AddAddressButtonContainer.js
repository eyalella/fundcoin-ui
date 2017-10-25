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
      Fundcoin.setProvider(web3.currentProvider);
      web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
          alert("There was an error fetching your accounts.");
          return;
        }

        if (accs.length == 0) {
          alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          return;
        }

        web3.eth.defaultAccount = accs[0];
        console.log(accs);

        Fundcoin.deployed().then((contract) => {
          web3.eth.getBalance(contract.address, () => {
            console.log(arguments)
            contract.requestLoan(web3.toWei(2, "ether")).then(() => {
              web3.eth.getBalance(contract.address, () => {
                console.log(arguments)
              });
            })
          })

          // contract.send(web3.toWei(15, "ether")).then((err, data) => {

          // })
        })
      });
    },
  }
}

const AddAddressButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAddressButton)

export default AddAddressButtonContainer
