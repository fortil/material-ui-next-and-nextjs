import axios from 'axios'
import config from '../config.json'
// import store from '../redux/store'
// import { openModal, closeModal } from '../redux/reducers/modal'
const SERVER_BASE = (config && config.api) || 'http://localhost:8080'
console.log(SERVER_BASE)
const http = axios.create({
  baseURL: `${SERVER_BASE}`,
  timeout: 100000
})


http.interceptors.response.use(response => response, error => {
  // console.log('AXIOS Error => ', error.response)
  let msg = {
    message: error.response.statusText,
    detail: error.response.statusText,
  }
  if (error.response && error.response.data) {
    msg = error.response.data
  }
  // store.dispatch(openModal(error.response.data))
  // store.dispatch(closeModal('CLOSE_MODAL_CIRCLE'))
  throw msg
  // return Promise.resolve({})
})

export default http