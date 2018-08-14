/* 
STATE
*/
export const INITIAL_STATE_SLIDERS = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const sliders = (state = INITIAL_STATE_SLIDERS, action) => {
  switch (action.type) {
    case 'SET_SLIDERS':
      return {
        ...state,
        data: [...action.data]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setSliders = data => ({
  type: 'SET_SLIDERS',
  data
})
