import React from 'react'

const AddAddressButton = ({ sendUserAddress }) => {
  return(
    <div>
      <input type="text" placeholder="0x123f681646d4a755815f9cb19e1acc8565a0c2ac" />
      <input type="button" value="Go" onClick={(event) => sendUserAddress(event)} />
    </div>
  )
}

export default AddAddressButton
