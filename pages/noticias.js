import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../layouts/main'
import { Entries, Entry } from '../components/blog'
import GrantImage from '../components/blog/grantimage'

class Blog extends Component {
  entry = (id = 1) => <Entry id={id} />

  render() {
    const { url } = this.props
    if (url.query && url.query.id) {
      this.componentToRender = this.entry(url.query.id)
    } else {
      this.componentToRender = <div><GrantImage /><Entries /></div>
    }
    return (
      <Layout title="NOTICIAS" page="Noticias">
        {this.componentToRender}
      </Layout>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  getNew: (id, cb) => dispatch(getNew(id, cb)),
  getAllNews: () => dispatch(getAllNews())
})
const mapStateToProps = (state = INITIAL_STATE_NEWS) => ({
  news: state.news
})

export default Blog
