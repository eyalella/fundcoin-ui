import React, { Component } from 'react'
import store from "../../store"

class Fund extends Component {
  componentDidMount() {
      debugger;
      this.test = store.getState();
  }

  render() {
    return(
      <main className="container">
        <img src="https://user-images.githubusercontent.com/3458336/32014977-54fb29d4-b9c8-11e7-9144-366294d24335.png" />
        <h1>Fund.</h1>
      </main>
    )
  }
}

export default Fund
