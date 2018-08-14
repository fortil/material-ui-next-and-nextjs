import React from 'react'
import { Provider } from 'react-redux'
import Head from 'next/head'
import Header from '../components/commons/Head'
import Footer from '../components/commons/Footer'
// import AdminIcon from '../components/commons/AdminIcon'
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
    let { children, title, page } = this.props
    if (!title) {
      title = 'This is the default title'
    }
    return (
      <Provider store={store}>
        <div id="app">
          <Head>
            <title>{title} - SURGAS</title>
          </Head>
          <Header page={page} />
          { children }
          {/* <AdminIcon /> */}
          <Footer />
        </div>
      </Provider>
    )
  }
}

export default withRoot(MainLayout)
