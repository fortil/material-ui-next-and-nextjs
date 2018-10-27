// import axios from 'axios'
import http from './axios'
import { setCountries, setCities } from '../redux/reducers/countries'
import { setNews } from '../redux/reducers/news'
import { setPqrs } from '../redux/reducers/pqrs'
import { setSerivices } from '../redux/reducers/services'
import { setSliders } from '../redux/reducers/sliders'
import { setPurchases } from '../redux/reducers/purchases'
import { setFrc } from '../redux/reducers/frc'
import { setFrcr } from '../redux/reducers/frcr'
import { setEmailCode, setEmails } from '../redux/reducers/emails'
import { setUsers, insertUser, deletedUser, updatedUser } from '../redux/reducers/users'
import { setRTR } from '../redux/reducers/rtr'
import { setProviders } from '../redux/reducers/providers'

import DB from './db'
import swal from 'sweetalert'

export const actionHttp = (url, action, datos, type) =>  {
  return async (_, getState) => {
    try {
      const user = getState().user
      const token = user.token.auth_token
      const datosCompletos = Object.assign(datos, { userId: user.user.id })
      let data
      if (type === 'formData') {
        data = new FormData()
        const keys = Object.keys(datosCompletos)
        for (let idx = 0; idx < keys.length; idx++) {
          const element = keys[idx]
          data.append(element, datos[element])
        }
      } else {
        data = datosCompletos
      }
      await request(http.post, `${url}/${action}`, { token, data })
      return datos
    } catch (error) {
      throw error
    }
  }
}

export const getServices = () =>  {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const services = state.services.data
      if (!services.length) {
        const { data } = await http.get('/supplier/getservices')
        dispatch(setSerivices(data.value))
      }
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export const getImagesSlider = () =>  {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const sliders = state.sliders.data
      if (!sliders.length) {
        // const { data } = await http.get('/sliders')
        dispatch(setSliders([
          '../static/pqr.jpg',
          '../static/historia.jpg'
        ]))
      }
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export const getPurchases = () =>  {
  return async dispatch => {
    try {
      const { data } = await http.get('/purchaseprocess/getall')
      dispatch(setPurchases(data.value))
    } catch (error) {
      swal(error.message, error.detail, 'error')
      throw null
    }
  }
}

export const getHttp = (url, paramUrl) =>  {
  return async (dispatch, getState) => {
    try {
      const user = getState().user
      let options = {}
      if (user && user.token) {
        const token = user.token.auth_token
        options = {
          headers: {
            'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          }
        }
      }
      const { data } = await http.get(`${url}${paramUrl ? '/' + paramUrl : ''}`, options)
      if (url === 'fcrmailshot') {
        dispatch(setFrcr(data.value))
      } else if (url === 'fcr') {
        dispatch(setFrc(data.value))
      }
      if (paramUrl === 'getemailcodes') {
        dispatch(setEmailCode(data.value))
      } else if (paramUrl === 'getallemails') {
        dispatch(setEmails(data.value))
      }
      return data.value
    } catch (error) {
      swal(error.message, error.detail || '', 'error')
      throw null
    }
  }
}

export function doPublicNew(id) {
  return async (_, getState) => {
    try {
      const token = getState().user.token.auth_token
      await request(http.post, '/news/delete', { token, data: { id } })
      swal('Entrada eliminada con éxito!', 'Has eliminado una entrada.', 'success')
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function removeNew(id) {
  return async (_, getState) => {
    try {
      const token = getState().user.token.auth_token
      await request(http.post, '/news/delete', { token, data: { id } })
      swal('Entrada eliminada con éxito!', 'Has eliminado una entrada.', 'success')
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function removeUser(selected) {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token.auth_token
      await request(http.post, '/account/delete', { token, data: { id: [ selected ] } })
      dispatch(deletedUser(selected))
      return selected
    } catch (error) {
      throw error
    }
  }
}

const roles = {
  Editor: 'e',
  Admin: 'a',
  Publicador: 'p',
  'Atención Usuario': 'u',
  Compras: 'c',
  RTR: 'r',
  FCR: 'f',
  Notificaciones: 'n',
}

export function activateUser(selected) {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token.auth_token
      const users = getState().users.data
        .filter(e => selected.includes(e.id))
        .map(user => {
          const data = {
            email: user.email,
            names: user.firstName,
            lastnames: user.lastName,
            username: user.userName,
            id: user.id,
            role: roles[user.roles[0]] || 'u',
            active: true
          }
          return request(http.post, '/account/update', { token, data })
        })
      await Promise.all(users)
      const { data } = await request(http.get, '/account/getall', { token })
      dispatch(setUsers(data.value))
      return true
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function request(action, url, { token, data, opts = {}}) {
  let options = Object.assign({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }, opts)
  if (data) {
    return action(url, data, options)
  } else {
    return action(url, options)
  }
}


function makeid() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}


export function resetPwdAdm(id) {
  return async(dispatch, getState) => {
    try {
      const token = getState().user.token.auth_token
      await request(http.post, '/account/resetpassword', { token, data: { id, newpassword: window.btoa(`will${makeid()}`) } })
      return true
    } catch (error) {
      throw error
    }
  }
}

export function createEntry(params) {
  return async(_, getState) => {
    try {
      const stateUser = getState().user
      const token = stateUser.token.auth_token
      const dat = new FormData()
      for (const i in params) {
        if (params.hasOwnProperty(i)) {
          dat.append(i, params[i])
        }
      }
      dat.append('userid', stateUser.user.id)
      const dt = new Date()
      const m = dt.getMonth() + 1
      dat.append('creationdate', `${dt.getDate()}/${m.toString().length === 1 ? '0' + m : m}/${dt.getFullYear()}`)
      const { data } = await request(http.post, '/news/create', { token, data: dat })
      return data
    } catch (error) {
      swal(error.message, error.detail, 'error')
      throw null
    }
  }
}

export function updateService(url, params, type = 'formdata') {
  return async(dispatch, getState) => {
    try {
      const stateUser = getState().user
      const token = stateUser.token.auth_token
      let formData = Object.assign({}, params)
      let config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      formData.userId = stateUser.user.id
      if (type === 'formdata') {
        formData = new FormData()
        for (let i in params) {
          const e = params[i]
          formData.append(e.key, e.val)
        }
        formData.append('userid', stateUser.user.id)
        config = {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        }
      }
      const { data } = await http.post(url, formData, config)
      return data
    } catch (error) {
      throw error
    }
  }
}

export function createUser(params) {
  return async(dispatch, getState) => {
    try {
      const token = getState().user.token.auth_token
      await request(http.post, '/account/create', { token, data: params })
      dispatch(insertUser(params))
      swal('Usuario creado con éxito!', 'Has creado un nuevo usuario!!', 'success')
      return params
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function createRTR(params) {
  return async dispatch => {
    try {
      await request(http.post, '/rtr/create', { data: params })
      return params
    } catch (error) {
      throw error
    }
  }
}

export function createService(url, params, type = 'formdata') {
  return async(dispatch, getState) => {
    try {
      const stateUser = getState().user
      const token = stateUser.token.auth_token
      let formData = params
      let config = {}
      if (type === 'formdata') {
        formData = new FormData()
        for (let i in params) {
          const e = params[i]
          formData.append(e.key, e.val)
        }
        formData.append('userid', stateUser.user.id)
        config = {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        }
      }
      await request(http.post, url, { token, data: formData, opts: config })
      return params
    } catch (error) {
      throw null
    }
  }
}

export function createPurchase(params) {
  return async(dispatch, getState) => {
    try {
      const stateUser = getState().user
      const token = stateUser.token.auth_token
      const formData = new FormData()
      for (let i in params) {
        const e = params[i]
        formData.append(e.key, e.val)
      }
      formData.append('userId', stateUser.user.id)
      await request(http.post, '/purchaseprocess/create', { token, data: formData })
      swal('Compra creada con éxito!', 'Has creado una nueva compra!!', 'success')
      return params
    } catch (error) {
      swal(error.message, error.detail, 'error')
      throw null
    }
  }
}

export function updateUser(params, cb = () => 0) {
  return async(dispatch, getState) => {
    try {
      const token = getState().user.token.auth_token
      await request(http.post, '/account/update', { token, data: Object.assign(params, { active: true }) })
      dispatch(updatedUser(params))
      swal('Usuario actualizado con éxito!', 'Has actualizado exitosamente un usuario!!', 'success').then(cb)
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export const key = 'f2e352016347643e3fac67187e6ccc89'

export function getCountries() {
  return async dispatch => {
    try {
      // const { data } = await axios.get(`https://battuta.medunes.net/api/country/all/?key=${key}`)
      const data = [
        { name: 'Colombia', code: 'co' },
      ]
      dispatch(setCountries(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getCities(reg, cb) {
  return async dispatch => {
    try {
      // const ctx = await axios.get(`https://battuta.medunes.net/api/region/${reg}/all/?key=${key}`)
      const data = [
        'cali', 'medellin', 'bogotá', 'bucaramanga', 'zarzal', 'neiva', 'mocoa'
      ].map(e => ({ name: e, code: e }))
      dispatch(setCities(data, reg))
      cb(data)
    } catch (error) {
      console.log(error)
    }
  }
}

export function getAllNewsAdmin() {
  return async (dispatch, getState) => {
    try {
      const news = DB.get('news')
      if (news) {
        dispatch(setNews(news))
      }
      const token = getState().user.token.auth_token
      const { data } = await request(http.get, '/news/getall', { token })
      DB.set('news', data.value)
      dispatch(setNews(data.value))
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function getAllNews() {
  return async dispatch => {
    try {
      const news = DB.get('news')
      if (news) {
        dispatch(setNews(news))
      }
      const { data } = await http.get('/news/getallpublic')
      DB.set('news', data.value)
      dispatch(setNews(data.value))
    } catch (error) {
      swal(error.message, error.detail || 'hubo un error', 'error')
    }
  }
}

export function getAllPQRs() {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.user.token.auth_token
      const DataFirst = DB.get('pqrs')
      if (DataFirst) {
        dispatch(setPqrs(DataFirst))
      }
      const { data } = await request(http.get, '/pqr/getall', { token })
      const situation = {
        A: 'Arrendatario',
        P: 'Propietario'
      }
      const setData = data.value.map(e => Object.assign(e, { situation: situation[e.situation] }))
      DB.set('pqrs', setData)
      dispatch(setPqrs(setData))
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function getAllService(url, db, set = setRTR) {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.user && state.user.token && state.user.token.auth_token ? ({ token: state.user.token.auth_token }) : {}
      const DataFirst = DB.get(db)
      if (DataFirst) {
        dispatch(set(DataFirst))
      }
      const { data } = await request(http.get, url, token)
      DB.set(db, data)
      dispatch(set(data.value))
      return data
    } catch (error) {
      swal(error.message, error.detail, 'error')
      throw error
    }
  }
}

export function getAllUsers() {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.user.token.auth_token
      const { data } = await request(http.get, '/account/getall', { token })
      dispatch(setUsers(data.value))
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function getAllProviders() {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.user.token.auth_token
      const { data: providers } = await request(http.get, '/supplier/getall', { token })
      dispatch(setProviders(providers.value))
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}

export function statusPQRs(url, idPqr, cb = () => 0) {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.user.token.auth_token
      const userId = state.user.user.id
      const id = [].concat(idPqr)
      await request(http.post, url, { token, data: { id, userId } })
      const pqrs = state.pqrs.data.map(pqr => {
        if (id.includes(pqr.id)) {
          pqr.active = false
        }
        return pqr
      })
      dispatch(setPqrs(pqrs))
      return true
    } catch (error) {
      throw error
    }
  }
}

export function getNew(id, cb = () => 0) {
  return async dispatch => {
    try {
      let noticias = DB.get('news')
      if (noticias) {
        noticias = noticias.filter(n => parseInt(n.id) === parseInt(id))
        if (noticias.length) {
          cb(noticias[0])
        }
      } else {
        const { data } = await http.get(`/news/getpublicbyid/${id}`)
        // const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`)
        cb(data)
      }
    } catch (error) {
      swal(error.message, error.detail, 'error')
      cb(null, error)
    }
  }
}

export function sendAttachData(where, datos) {
  return async dispatch => {
    try {
      const formData = new FormData()
      for (let i in datos) {
        const e = datos[i]
        if (e.key === 'files') {
          for (let o = 0; o < e.val.length; o++) {
            const element = e.val[o]
            formData.append(e.key, element)
          }
        } else {
          formData.append(e.key, e.val)
        }
      }
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          if (percentCompleted === 100) {
            // dispatch(closeModal('CLOSE_MODAL_CIRCLE'))
          }
        }
      }
      const { data } = await http.post(where, formData, config)
      return data
    } catch (error) {
      swal(error.message, error.detail, 'error')
    }
  }
}