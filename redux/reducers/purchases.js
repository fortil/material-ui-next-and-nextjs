/* 
STATE
*/
export const INITIAL_STATE_PURCHASES = {
  data: [],
  error: null,
  fetching: false
}

/*
REDUCERS
*/
export const purchases = (state = INITIAL_STATE_PURCHASES, action) => {
  switch (action.type) {
    case 'SET_PURCHASES':
      return {
        ...state,
        fetching: true,
        data: [...action.purchases]
      }
    case 'UPDATE_ACTION_PURCHASE':
      const purchases = state.data.map(purchase => {
        if (purchase.id === action.purchase.id) {
          return Object.assign({}, purchase, action.purchase)
        }
        return purchase
      })  
      return {
        ...state,
        data: [...purchases]
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const setPurchases = purchases => ({
  type: 'SET_PURCHASES',
  purchases
})
/* 
ACTIONS
*/

export const setActionActivePurchase = purchase => ({
  type: 'UPDATE_ACTION_PURCHASE',
  purchase
})
