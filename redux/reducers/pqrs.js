/* 
STATE
*/
export const INITIAL_STATE_PQRS = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const pqrs = (state = INITIAL_STATE_PQRS, action) => {
  switch (action.type) {
    case 'SET_PQRS':
      return {
        ...state,
        fetching: true,
        data: [...action.pqrs]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setPqrs = pqrs => ({
  type: 'SET_PQRS',
  pqrs
})
