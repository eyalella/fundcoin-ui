import React, {Component} from 'react'
import AddAddressButtonContainer from "../../user/ui/addAddressButton/AddAddressButtonContainer"
import store from "../../store"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fundCoinsOwned: 0,
            etherEarned: 0,
            numberOfLoans: 0,
            creditLimit: 0,
            totalLoansBalance: 0,
        };
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState({...store.getState().user});
        })
    }

    render() {
        return (
            <main className="container">
                <div className="top-data">
                    <img src="https://user-images.githubusercontent.com/3458336/32014977-54fb29d4-b9c8-11e7-9144-366294d24335.png"/>
                    <h1>Hello.</h1>
                    <AddAddressButtonContainer></AddAddressButtonContainer>
                </div>

                <div className="wallet-data">
                    <div>FundCoins: {this.state.fundCoinsOwned}</div>
                    <div>Ether Earned: {this.state.etherEarned}</div>
                    <div>Loans: {this.state.numberOfLoans}</div>
                    <div>Available credit: {this.state.creditLimit}</div>
                    <div>Left to pay: {this.state.totalLoansBalance}</div>
                </div>
            </main>
        )
    }
}

export default Home
