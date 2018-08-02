import React, { Component } from 'react'
import Layout from '../layouts/main'
import ProveedoresComponent from '../components/proveedores'
import GrantImage from '../components/pqr/grantimage'

class Proveedores extends Component {
  render() {
    return (
      <Layout title="PROVEEDORES" page="Proveedores">
        <GrantImage />
        <ProveedoresComponent />
      </Layout>
    )
  }
};

export default Proveedores
