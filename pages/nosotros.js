import React, { Component } from 'react'
import Layout from '../layouts/main'
import NosotrosComponent from '../components/nosotros'
import GrantImage from '../components/nosotros/grantimage'

class Nosotros extends Component {
  render() {
    return (
      <Layout title="NOSOTROS" page="Nosotros">
        <GrantImage />  
        <NosotrosComponent url={this.props.url}/>
      </Layout>
    )
  }
};

export default Nosotros
