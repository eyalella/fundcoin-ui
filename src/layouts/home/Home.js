import React, { Component } from 'react'
import AddAddressButtonContainer from "../../user/ui/addAddressButton/AddAddressButtonContainer"

class Home extends Component {
  render() {
    return(
      <main className="container">
        <h1>Please enter your wallet address</h1>
        <AddAddressButtonContainer></AddAddressButtonContainer>
      </main>
    )
  }
}

export default Home
