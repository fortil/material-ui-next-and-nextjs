import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
// import firebase from 'firebase'
import { INITIAL_STATE_COUNTRIES } from './reducers/countries'
import { INITIAL_STATE_USER } from './reducers/user'
import { INITIAL_STATE_USERS } from './reducers/users'
import { INITIAL_STATE_MODAL } from './reducers/modal'
import { INITIAL_STATE_NEWS } from './reducers/news'
import { INITIAL_STATE_PQRS } from './reducers/pqrs'
import { INITIAL_STATE_SERVICES } from './reducers/services'
import { INITIAL_STATE_PROVIDERS } from './reducers/providers'
import { INITIAL_STATE_PURCHASES } from './reducers/purchases'
import { INITIAL_STATE_RTR } from './reducers/rtr'
import { INITIAL_STATE_NOTIFICATIONS } from './reducers/notifications'
import rootReducer from './reducers'
import axios from '../lib/axios'

const middlewares = [thunkMiddleware.withExtraArgument({ axios/* , firebase */ })]

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger').createLogger
  const logger = createLogger({ collapsed: true })
  middlewares.push(logger)
}
// const firebaseConfig = {
//   apiKey: 'AIzaSyCzf97F0MomG1w679dmiK4tOkzjSV1Dvts',
//   authDomain: 'la-14-tv-4911e.firebaseapp.com',
//   databaseURL: 'https://la-14-tv-4911e.firebaseio.com',
//   projectId: 'la-14-tv-4911e',
//   storageBucket: 'la-14-tv-4911e.appspot.com',
//   messagingSenderId: '106045198957'
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app();
// }
const initialState = {
  user: INITIAL_STATE_USER,
  modal: INITIAL_STATE_MODAL,
  news: INITIAL_STATE_NEWS,
  pqrs: INITIAL_STATE_PQRS,
  users: INITIAL_STATE_USERS,
  countries: INITIAL_STATE_COUNTRIES,
  services: INITIAL_STATE_SERVICES,
  providers: INITIAL_STATE_PROVIDERS,
  purchases: INITIAL_STATE_PURCHASES,
  rtr: INITIAL_STATE_RTR,
  notifications: INITIAL_STATE_NOTIFICATIONS,
}

const initStore = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default initStore