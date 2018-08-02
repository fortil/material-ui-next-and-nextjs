/* 
STATE
*/
export const INITIAL_STATE_NEWS = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const news = (state = INITIAL_STATE_NEWS, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return {
        ...state,
        fetching: true,
        data: [...action.news]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setNews = news => ({
  type: 'SET_NEWS',
  news
})
