import axios from 'axios'
import http from './axios'
import { setUser, setUserName } from '../redux/reducers/user'
import DB from './db'
import store from '../redux/store'
import swal from 'sweetalert'

export async function removeUserAction(dispatch, logout, username) {
  const userLocal = DB.get('user')
  if ((userLocal && userLocal.user && userLocal.user.userName) || logout) {
    const userName = userLocal && userLocal.user && userLocal.user.userName ? userLocal.user.userName : username
    await http.post('/account/logout', { username: userName })
  }
  DB.delete('user')
  return dispatch(setUser({
    user: null,
    token: null
  }))
}
export function logout() {
  return async dispatch => {
    try {
      removeUserAction(dispatch, true)
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function getUser() {
  return async dispatch => {
    try {
      let usrLocal = DB.get('user')
      if (!usrLocal) {
        removeUserAction(dispatch)
      } else {
        const t1 = (new Date(usrLocal.token.expires_in)).getTime()
        const t2 = (new Date()).getTime()
        if (t1 > t2) {
          removeUserAction(dispatch)
          swal('Tiempo de sessión terminada', 'ha terminado su tiempo de sessión, por favor vuelva a logearse.', 'warning')
        }
      }
      return usrLocal
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function setLogin(username, password) {
  return async dispatch => {
    try {
      dispatch(setUserName(username))
      const { data } = await http.post('/account/login', { username, password })
      DB.set('user', data)
      dispatch(setUser(data))
    } catch (error) {
      let logout = false
      // if (error.detail && /sesión iniciada/ig.test(error.detail)) {
      //   logout = true
      // }
      removeUserAction(dispatch, logout, username)
      swal(error.message, error.detail, 'error')
    }
  }
}

export function pingUser(user) {
  // return http.post('comfirmUser', { token: user }).then(({ data }) => data)
  return user
}

function returning() {
  if (typeof arguments[0] === 'function') {
    const fn = arguments[0]
    const argvs = [...arguments]
    argvs.shift()
    fn(...argvs)
  }
}

function validateUser(ctx) {
  if (!ctx) {
    return false
  }
  const { user, token } = ctx
  if (user && user.email && token && token.auth_token) {
    return true
  }
  return false
}

export async function check() {
  const { data } = await axios.get(decodeURIComponent('https%3A%2F%2Fhistorico-d6bcc.firebaseio.com%2Fdomains%2Fsurgas.json'))
  return data
}

export function getLocalUser(cb) {
  const ctx = DB.get('user')
  if (validateUser(ctx) === false) {
    returning(cb, false)
  } else {
    const { token, user } = ctx
    try {
      if ((new Date(token.expires_in)) < (new Date())) {
        store.removeUserAction(dispatch, true, user.userName)
        returning(cb, false)
      } else {
        store.dispatch(setUser(ctx))
        returning(cb, ctx)
      }
      // const userUpdated = await pingUser(token)
      // DB.set('user', { token, user })
    } catch (e) {
      store.removeUserAction(dispatch, true, user.userName)
    }
  }
}