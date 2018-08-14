import React from 'react'
import { check } from '../lib/api'
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
  state = {
    allow: false
  }
  componentDidMount = () => {
    check().then(ok => {
      this.setState({ allow: !!ok })
    })
  }

  render() {
    const { children } = this.props
    return (
      <Provider store={store}>
        <div id="app">
          <Head>
            <title>Login - SURGAS</title>
          </Head>
          {this.state.allow ? children : ''}
        </div>
      </Provider>
    )
  }
}

export default withRoot(MainLayout);