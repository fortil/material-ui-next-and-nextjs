import React, { Component } from 'react'
import Layout from '../layouts/main'
import RTRComponent from '../components/rtr'
import GrantImage from '../components/rtr/grantimage'

class RTR extends Component {
  render() {
    return (
      <Layout title="RTR" page="RTR">
        <GrantImage />
        <RTRComponent />
      </Layout>
    )
  }
};

export default RTR
