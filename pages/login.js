import React, { Component } from 'react'
import Layout from '../layouts/login'
import LoginComponent from '../components/login'
import { getLocalUser } from '../lib/api'
import Router from 'next/router'

class Login extends Component {
  componentWillMount() {
    if (process.browser) {
      getLocalUser(user => {
        if (user) {
          Router.push('/admin')
        }
      })
    }
  }
  render() {
    const { url } = this.props
    return (
      <Layout title="LOGIN" page="Login">
        <LoginComponent />
      </Layout>
    )
  }
};

export default Login
