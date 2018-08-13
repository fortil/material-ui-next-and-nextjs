import { combineReducers } from 'redux'
import { countries } from './countries'
import { sliders } from './sliders'
import { user } from './user'
import { users } from './users'
import { news } from './news'
import { modal } from './modal'
import { pqrs } from './pqrs'
import { services } from './services'
import { providers } from './providers'
import { purchases } from './purchases'
import { frc } from './frc'
import { frcr } from './frcr'
import { emails } from './emails'
import { rtr } from './rtr'
import { notifications } from './notifications'

export default combineReducers({
  countries,
  news,
  modal,
  sliders,
  pqrs,
  user,
  users,
  services,
  providers,
  purchases,
  frc,
  frcr,
  emails,
  rtr,
  notifications,
})