/* 
STATE
*/
export const INITIAL_STATE_SERVICES = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const services = (state = INITIAL_STATE_SERVICES, action) => {
  switch (action.type) {
    case 'SET_SERVICES':
      return {
        ...state,
        fetching: true,
        data: [...action.services]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setSerivices = services => ({
  type: 'SET_SERVICES',
  services
})
