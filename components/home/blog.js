import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { globalStyles, flex, posts } from '../../src/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Link from 'next/link'
// import data from './data.json'
import { getAllNews } from '../../lib/http'
import { sanitizeHtml, sortArrayByDate } from '../../lib/utils'
import { connect } from 'react-redux'
import { INITIAL_STATE_NEWS } from '../../redux/reducers/news'
import YouTube from 'react-youtube'

const STYLES = () => ({
  ...flex,
  ...globalStyles,
  ...posts,
  hover: {
    transition: 'transform .2s',
    '&:hover': {
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      transform: 'scale(1.05)'
    }
  },
  centerCropped: {
    width: '100%',
    height: 125,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  }
})

class BlogHome extends Component {

  render() {
    const { classes, news, getAllNews } = this.props
    if (news && !news.fetching && process.browser) {
      setTimeout(() => {
        getAllNews()
      }, 1)
    }
    const { section: seccion, m0, container, postMeta, h3, mb4, mt3, textCenter, textDark } = classes
    let entries = news.data.length ? news.data
      .filter(e => e.isPublic === true && e.active === true && e.important)
      // .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
      : []
    entries = sortArrayByDate('asc', entries, 'creationDate')
    return (
      <section className={[seccion, m0].join(' ')}>
        <Grid container className={container}>
          <Grid item xs={12}>
            <h3 className={[h3, textCenter].join(' ')}><strong>Noticias</strong></h3>
          </Grid>
          <Grid item xs={12}>
            <Grid spacing={24} container xs={false}>
              {entries.length ? entries.slice(0, 8).map((show, _, array) => {
                const image = show.imageUrl ? show.imageUrl : `../../static/blog/blog-vintage-1.jpg`
                const l = array.length > 4 ? 8 - array.length : array.length
                const con = 4
                let md = 12
                if (array.length >= 4) {
                  md = 3
                } else if (con % l === 0) {
                  md = md / l
                } else if (con % l !== 0) {
                  md = md / ((con % l) * l)
                }
                const hVideo = md === 4 ? '163' : md === 3 ? '125' : md === 6 ? '253' : '534'
                const wVideo = md === 4 ? '300' : md === 3 ? '210' : md === 6 ? '450' : '950'
                return (
                  <Grid item md={md} key={show.id} className={classes.hover}>
                    <Link href={`/noticias?id=${show.id}`}><a style={{ textDecoration: 'none' }}>
                      {show.youtube ? <YouTube
                        videoId={show.youtube} opts={{ height: hVideo, width: wVideo }}
                        onReady={evt => evt.target.pauseVideo()}
                      /> : <div className={classes.centerCropped} style={{ backgroundImage: `url(${image})` }}></div>}  
                    </a></Link>
                    {/* <div className={classes.centerCropped}></div> */}
                    <div className={[mt3, mb4].join(' ')} style={{maxWidth: '100vw'}}>
                      <article style={{ display: 'block' }}>
                        <h4>
                          <Link href={`/noticias?id=${show.id}`}><a className={textDark} style={{ textDecoration: 'none' }}>{show.title}</a></Link>
                        </h4>
                        <Link href={`/noticias?id=${show.id}`}><p style={{ fontSize: 13 }}>{`${sanitizeHtml('abstract', show.description)}`}</p></Link>
                        <div className={postMeta}>
                          <Link href={`/noticias?id=${show.id}`}><a style={{ textDecoration: 'none' }}><span style={{ color: '#cf8100', fontSize: 12 }}><Icon style={{ fontSize: 14 }}>event_note</Icon> {show.creationDate.split(' ')[0]}</span></a></Link>
                        </div>
                      </article>
                    </div>
                  </Grid>
                )
              }) : ''}
            </Grid>
          </Grid>
        </Grid>
      </section>
    )
  }
};

BlogHome.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  getAllNews: () => dispatch(getAllNews())
})

const mapStateToProps = (state = { news: INITIAL_STATE_NEWS }) => ({
  news: state.news
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(STYLES, { name: 'WiBlogHome' })(BlogHome))

// export default withStyles(STYLES, { name: 'WiBlogHome' })(BlogHome)