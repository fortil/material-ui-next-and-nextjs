/* 
STATE
*/
export const INITIAL_STATE_USER = {
  user: {},
  token: null,
  error: null,
  username: null,
  fetching: false
}

/*
REDUCERS
*/
export const user = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        token: action.token,
        user: action.user,
        fetching: true
      }
    case 'SET_USER_NAME':
      return {
        ...state,
        username: action.username
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setUser = ({ user, token }) => ({
  type: 'SET_USER',
  user,
  token
})

export const setUserName = username => ({
  type: 'SET_USER_NAME',
  username
})
