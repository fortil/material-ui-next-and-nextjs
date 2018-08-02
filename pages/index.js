import React, { Component } from 'react'
import Layout from '../layouts/main'
import SliderContainer from '../components/home/sliderContainer'
import OurServices from '../components/home/ourservices'
import OurCompany from '../components/home/ourcompany'
import Blog from '../components/home/blog'
// import GrantImage from '../components/home/grantimage'

class Index extends Component {
  render() {
    return (
      <Layout title="HOME" page="Home">
        <SliderContainer />
        {/* <GrantImage /> */}
        <OurServices />
        <OurCompany />
        <Blog />
      </Layout>
    )
  }
}

export default Index
