import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <h1>Please enter your wallet address</h1>
        <input type="text" placeholder="0x123f681646d4a755815f9cb19e1acc8565a0c2ac" />
        <input type="button" value="Go" />
      </main>
    )
  }
}

export default Home
