/* 
STATE
*/
export const INITIAL_STATE_PROVIDERS = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const providers = (state = INITIAL_STATE_PROVIDERS, action) => {
  switch (action.type) {
    case 'SET_PROVIDERS':
      return {
        ...state,
        fetching: true,
        data: [...action.providers]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setProviders = providers => ({
  type: 'SET_PROVIDERS',
  providers
})
