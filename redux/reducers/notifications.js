/* 
STATE
*/
export const INITIAL_STATE_NOTIFICATIONS = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const notifications = (state = INITIAL_STATE_NOTIFICATIONS, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        fetching: true,
        data: [...action.notifications]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setNotifications = notifications => ({
  type: 'SET_NOTIFICATIONS',
  notifications
})
