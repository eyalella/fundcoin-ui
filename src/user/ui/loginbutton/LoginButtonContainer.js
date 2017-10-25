import { connect } from 'react-redux'
import LoginButton from './LoginButton'
// import { loginUser } from './LoginButtonActions'
import { default as contract } from 'truffle-contract'
import store from "../../../store"

import fundcoin_contract from "../../../../build/contracts/Migrations.json";
const Fundcoin = contract(fundcoin_contract);

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUserClick: (event) => {
      debugger;
      const web3 = store.getState().web3.web3Instance
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

        console.log(accs);

        // accounts = accs;
        // account = accounts[0];
        //
        // self.refreshBalance();
      });
    },
  }
}

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton)

export default LoginButtonContainer
