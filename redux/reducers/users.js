/* 
STATE
*/
export const INITIAL_STATE_USERS = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const users = (state = INITIAL_STATE_USERS, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        data: [...action.users],
        fetching: true
      }
    case 'INSERT_USER':
      state.data.push(action.user)
      return {
        ...state,
        data: [...state.data]
      }
    case 'UPDATED_USER':
      const users = state.data.map(user => {
        if (user.id === action.user.id) {
          return action.user
        }
        return user
      })
      return {
        ...state,
        data: [users]
      }
    case 'DELETED_USER':
      return {
        ...state,
        data: [...state.data.map(e => {
          if (action.users.includes(e.id)) {
            return Object.assign(e, { active: false })
          }
          return e
        })]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setUsers = users => ({
  type: 'SET_USERS',
  users,
})

export const insertUser = user => ({
  type: 'INSERT_USER',
  user,
})

export const updatedUser = user => ({
  type: 'UPDATED_USER',
  user,
})

export const deletedUser = users => ({
  type: 'DELETED_USER',
  users,
})
