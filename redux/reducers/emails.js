/* 
STATE
*/
export const INITIAL_STATE_EMAIL = {
  data: [],
  codes: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const emails = (state = INITIAL_STATE_EMAIL, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        fetching: true,
        data: [...action.email]
      }
    case 'UPDATE_ACTION_EMAIL':
      const email = state.data.map(email => {
        if (email.id === action.email.id) {
          return Object.assign({}, email, action.email)
        }
        return email
      })
      return {
        ...state,
        data: [...email]
      }
    case 'SET_EMAIL_CODE':
      return {
        ...state,
        codes: [...action.email]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setEmails = email => ({
  type: 'SET_EMAIL',
  email
})

export const setEmailCode = email => ({
  type: 'SET_EMAIL_CODE',
  email
})
/* 
ACTIONS
*/

export const setActionActiveEmail = email => ({
  type: 'UPDATE_ACTION_EMAIL',
  email
})
