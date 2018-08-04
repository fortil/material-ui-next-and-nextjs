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
  let emailsValue = state.data
  switch (action.type) {
    case 'SET_EMAIL':
      emailsValue = action.email.map(email => Object.assign(email, { codeDesc: email.code }))
      return {
        ...state,
        fetching: false,
        data: [...emailsValue]
      }
    case 'UPDATE_ACTION_EMAIL':
      const email = emailsValue.map(email => {
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
      emailsValue = emailsValue.map(email => {
        action.email.forEach(code => {
          if (code.code === email.code) {
            email.codeDesc = code.description
          }
        })
        return email
      })
      return {
        ...state,
        data: [...emailsValue],
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
