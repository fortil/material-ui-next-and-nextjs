/* 
STATE
*/
export const INITIAL_STATE_COUNTRIES = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const countries = (state = INITIAL_STATE_COUNTRIES, action) => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return {
        ...state,
        data: [...action.countries]
      }
    case 'SET_CITIES':
      const countries = state.data.map(e => {
        if (e.code === action.code) {
          e.cities = action.cities
        }
        return e
      })
      return {
        ...state,
        data: [...countries]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setCountries = countries => ({
  type: 'SET_COUNTRIES',
  countries
})

export const setCities = (cities, code) => ({
  type: 'SET_CITIES',
  cities,
  code
})
