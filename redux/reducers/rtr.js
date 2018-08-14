/* 
STATE
*/
export const INITIAL_STATE_RTR = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const rtr = (state = INITIAL_STATE_RTR, action) => {
  switch (action.type) {
    case 'SET_RTR':
      return {
        ...state,
        fetching: true,
        data: [...action.rtr]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setRTR = rtr => ({
  type: 'SET_RTR',
  rtr
})
