/* 
STATE
*/
export const INITIAL_STATE_FRC = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const frc = (state = INITIAL_STATE_FRC, action) => {
  switch (action.type) {
    case 'SET_FRC':
      return {
        ...state,
        fetching: true,
        data: [...action.frc]
      }
    case 'UPDATE_ACTION_FRC':
      const frc = state.data.map(frc => {
        if (frc.id === action.frc.id) {
          return Object.assign({}, frc, action.frc)
        }
        return frc
      })
      return {
        ...state,
        data: [...frc]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setFrc = frc => ({
  type: 'SET_FRC',
  frc
})
/* 
ACTIONS
*/

export const setActionActiveFrc = frc => ({
  type: 'UPDATE_ACTION_FRC',
  frc
})
