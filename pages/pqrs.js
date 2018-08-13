import React, { Component } from 'react'
import Layout from '../layouts/main'
import PQRComponent from '../components/pqr'
import GrantImage from '../components/pqr/grantimage'

class PQR extends Component {
  render() {
    return (
      <Layout title="PQR" page="PQRS">
        <GrantImage />  
        <PQRComponent />
      </Layout>
    )
  }
};

export default PQR
