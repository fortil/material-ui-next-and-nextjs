import axios from 'axios'
import config from '../config.json'

const SERVER_BASE = (config && config.api) || 'http://localhost:8080'
console.log(SERVER_BASE)
const http = axios.create({
  baseURL: `${SERVER_BASE}`,
  timeout: 100000
})


http.interceptors.response.use(response => response, e => {
  const firstMsg = (e && e.response && e.response.statusText) || e.toString()

  let msg = {
    message: firstMsg,
    detail: firstMsg,
  }
  if (e.response && e.response.data) {
    msg = e.response.data
  }
  throw msg
})

export default http