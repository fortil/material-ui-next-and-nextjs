import React from 'react'
import { Provider } from 'react-redux'
import Head from 'next/head'
import withRoot from '../src/withRoot'
import store from '../redux/store'

if (module.hot) {
  module.hot.accept('../redux/reducers', () => {
    const nextRootReducer = require('../redux/reducers')
    store.replaceReducer(nextRootReducer)
  })
}

class MainLayout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Provider store={store}>
        <div id="app">
          <Head>
            <title>Login - SURGAS</title>
          </Head>
          {children}
        </div>
      </Provider>
    )
  }
}

export default withRoot(MainLayout);