/* 
STATE
*/
export const INITIAL_STATE_FRCR = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const frcr = (state = INITIAL_STATE_FRCR, action) => {
  switch (action.type) {
    case 'SET_FRCR':
      return {
        ...state,
        fetching: true,
        data: [...action.frcr]
      }
    case 'UPDATE_ACTION_FRCR':
      const frcr = state.data.map(frcr => {
        if (frcr.id === action.frcr.id) {
          return Object.assign({}, frcr, action.frcr)
        }
        return frcr
      })
      return {
        ...state,
        data: [...frcr]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setFrcr = frcr => ({
  type: 'SET_FRCR',
  frcr
})
/* 
ACTIONS
*/

export const setActionActiveFrcr = frcr => ({
  type: 'UPDATE_ACTION_FRCR',
  frcr
})
