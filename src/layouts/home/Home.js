import React, { Component } from 'react'
import AddAddressButtonContainer from "../../user/ui/addAddressButton/AddAddressButtonContainer"

class Home extends Component {
  render() {
    return(
      <main className="container">
        <img src="https://user-images.githubusercontent.com/3458336/32014977-54fb29d4-b9c8-11e7-9144-366294d24335.png" />
        <h1>Hello.</h1>
        <AddAddressButtonContainer></AddAddressButtonContainer>
      </main>
    )
  }
}

export default Home
