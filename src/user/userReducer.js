const initialState = {
  data: null
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  else if (action.type === "UPDATE_USER_DATA") {
    return Object.assign({}, state, {
      fundCoinsOwned: action.fundCoinsOwned,
      etherEarned: action.etherEarned,
      numberOfLoans: action.numberOfLoans,
      creditLimit: action.creditLimit / 1000000,
    })
  }

  return state
}

export default userReducer
