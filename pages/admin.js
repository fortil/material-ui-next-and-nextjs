import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Layout from '../layouts/admin'
import AdminComponent from '../components/admin'
import { getLocalUser } from '../lib/api'
// import Head from 'next/head'
import Router from 'next/router'
// import { Modal, ModalCircular } from '../components/modal'

if (module.hot) {
  module.hot.accept('../redux/reducers', () => {
    const nextRootReducer = require('../redux/reducers')
    store.replaceReducer(nextRootReducer)
  })
}

class Admin extends Component {
  state = {
    user: null,
  }

  componentWillMount() {
    if (process.browser) {
      getLocalUser(user => {
        if (!user) {
          Router.push('/')
        } else {
          const reloaded = window.localStorage.getItem('reloadedAdmin')
          if (!reloaded) {
            setTimeout(() => {
              window.localStorage.setItem('reloadedAdmin', 'true')
              Router.push('/login')
              setTimeout(() => {
                window.localStorage.setItem('reloadedAdmin', 'true')
                Router.push('/login')
              }, 200)
            }, 200)
          } else {
            window.localStorage.removeItem('reloadedAdmin')
          }
          this.setState({ user })
        }
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (process.browser) {
      getLocalUser(user => {
        if (!user) {
          Router.push('/')
        } else {
          this.setState({ user })
        }
      })
    }
  }

  validateUser = () => {
    if (!this.state.user) {
      return false
    }
    const { user, token } = this.state.user
    if (user && user.email && token && token.auth_token) {
      return true
    }
    return false
  }

  render() {
    const { url } = this.props
    if (this.validateUser()) {
      return (
        <Provider store={store}>
          <Layout title="Admin" page="Admin" user={this.state.user} query={url.query}>
            {/* <Head>
              <title>ADMIN - SURGAS</title>
            </Head> */}
            <AdminComponent query={url.query}/>
            {/* <Modal />
            <ModalCircular />  */}
          </Layout>
        </Provider>
      )
    }
    return (
      <div></div>
    )
  }
}

export default Admin
