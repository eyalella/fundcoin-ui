import React from 'react'

const AddAddressButton = ({sendUserAddress, investMoney, takeLoan}) => {
    return (
        <div>
            <div className="input-container">
                <input id="addressInput" type="text" placeholder="0x123f681646d4a755815f9cb19e1acc8565a0c2ac"/>
                <input type="button" value="Refresh" onClick={(event) => sendUserAddress(event)}/>
            </div>

            <div className="input-container">
                <input id="investMoney" type="text" placeholder="How much would you like to invest?"/>
                <input type="button" value="Invest" onClick={(event) => investMoney(event)}/>
            </div>

            <div className="input-container">
                <input id="takeMoney" type="text" placeholder="How much would you like to take?"/>
                <input type="button" value="Borrow" onClick={(event) => takeLoan(event)}/>
            </div>
        </div>
    )
}

export default AddAddressButton
