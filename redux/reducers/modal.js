/* 
STATE
*/
export const INITIAL_STATE_MODAL = {
  modal: {
    open: false,
    message: '',
    detail: '',
    cb: null
  },
  circle: {
    open: false,
    message: ''
  }
}

/*
REDUCERS
*/
export const modal = (state = INITIAL_STATE_MODAL, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: {
          open: true,
          cb: action.cb,
          message: action.message,
          detail: action.detail
        }
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: {
          open: false,
          message: '',
          detail: '',
          cb: null
        }
      }
    case 'OPEN_MODAL_CIRCLE':
      return {
        ...state,
        circle: {
          open: true,
          message: action.message
        }
      }
    case 'CLOSE_MODAL_CIRCLE':
      return {
        ...state,
        circle: {
          open: false,
          message: action.message
        }
      }
    default:
      return state
  }
}

/* 
ACTIONS
*/

export const openModal = ({ message, detail, cb }, type = 'OPEN_MODAL') => ({
  type,
  message,
  detail,
  cb
})

export const closeModal = (type = 'CLOSE_MODAL') => ({
  type
})

export function openModalAction({ message, detail, cb }, type) {
  return async dispatch => {
    try {
      dispatch(openModal({ message, detail, cb }, type))
    } catch (error) {
      console.log(error.message)
    }
  }
}

export function closeModalAction(resp, type) {
  return async (dispatch, getState) => {
    try {
      if (type !== 'CLOSE_MODAL_CIRCLE') {
        const modal = getState().modal
        if (modal.cb) {
          modal.cb(resp)
        }
      }
      dispatch(closeModal(type))
    } catch (error) {
      console.log(error.message)
    }
  }
}