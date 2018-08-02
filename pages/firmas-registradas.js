import React, { Component } from 'react'
import Layout from '../layouts/main'
import FirmasRegistradasComponent from '../components/firmasregistradas'
import GrantImage from '../components/pqr/grantimage'

class FirmasRegistradas extends Component {
  render() {
    return (
      <Layout title="Firmas Registradas" page="FirmasRegistradas">
        <GrantImage />
        <FirmasRegistradasComponent />
      </Layout>
    )
  }
};

export default FirmasRegistradas
