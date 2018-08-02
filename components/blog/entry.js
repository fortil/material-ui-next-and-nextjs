import React, { Component } from 'react'
import { connect } from 'react-redux'
import { globalStyles, flex, nosotros, colors } from '../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Link from 'next/link'
import { sanitizeHtml, sortArrayByDate } from '../../lib/utils'
import { getNew, getAllNews } from '../../lib/http'
import { INITIAL_STATE_NEWS } from '../../redux/reducers/news'
import YouTube from 'react-youtube'

const STYLES = theme => ({
  ...flex,
  ...globalStyles,
  textStyle: {
    textAlign: 'justify'
  },
  title: {
    color: colors.crSecondary
  },
  marginB: {
    marginBottom: '100px!important',
  },
  centerCropped: {
    width: '100%',
    height: 56,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  hover: {
    transition: 'transform .2s',
    '&:hover': {
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      transform: 'scale(1.05)'
    }
  },
  mobileCsss: {
    '&': {
      '@media (max-width: 376px)': {
        display: 'none',
      },
    },
  }
})

class Entry extends Component {
  state = {
    img: '../../static/logo.svg',
    entry: {
      imageUrl: `../../static/logo.svg`,
      title: '',
      description: ''
    }
  }
  componentDidMount() {
    if (process.browser) {
      if (!this.props.news.fetching) {
        this.props.getAllNews()
      }
      this.props.getNew(this.props.id, data => {
        this.setState({
          entry: data
        })
      })
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (process.browser) {
      this.props.getNew(nextProps.id, data => {
        this.setState({
          entry: data
        })
      })
    }
  }
  render() {
    const { classes, news } = this.props
    // const { entry, img } = this.state
    const entries = sortArrayByDate('asc', news.data, 'creationDate')
    const { section: seccion, m0, container, h3, mb4, textCenter, textStyle, postMeta, title, p0, textDark } = classes
    const imageUrl = this.state.entry.imageUrl && this.state.entry.imageUrl !== '' ? this.state.entry.imageUrl : null
    return (
      <article className={[seccion, m0, p0].join(' ')}>
        <Grid container className={[container, classes.mobileCss].join(' ')}>
          <Grid item md={8} className={classes.mobileCss}>
            <Grid container className={[container, classes.mobileCss].join(' ')} style={{ marginTop: 40 }}>
              <Grid item xs={12} className={classes.mobileCss}>
                <h3 className={[h3, textCenter, title].join(' ')} style={{ textTransform: 'uppercase' }}><strong>{this.state.entry.title}</strong></h3>
              </Grid>
              <Grid item xs={12} className={[textCenter, classes.mobileCss].join(' ')}>
                {this.state.entry.youtube ? <YouTube videoId={this.state.entry.youtube} opts={{ height: '315', width: '560' }} className={mb4} onReady={evt => evt.target.pauseVideo()} /> : ''}
                {imageUrl ? <img src={imageUrl} className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt={this.state.entry.title} /> : ''}
                <div className={[textStyle, classes.marginB].join(' ')} dangerouslySetInnerHTML={{ __html: this.state.entry.description }}></div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} style={{ marginTop: 60 }} className={classes.mobileCsss}>
            {entries.filter(e => e.isPublic === true && e.active === true).slice(0, 8).map(show => {
              const image = show.imageUrl && show.imageUrl !== '' ? show.imageUrl : `../../static/logo.svg`
              return (
                <Grid spacing={24} container key={show.id} style={{ margin: 0 }} className={[classes.mobileCss, classes.hover].join(' ')}>
                  <Grid item md={4}>
                    <Link href={`/noticias?id=${show.id}`}><a style={{ textDecoration: 'none' }}>
                      {show.youtube ? <YouTube
                        videoId={show.youtube} opts={{ height: '56', width: '100' }}
                        onReady={evt => evt.target.pauseVideo()}
                      /> : <div className={classes.centerCropped}
                        style={{ backgroundImage: `url(${image})` }}>
                        </div>}</a></Link>
                  </Grid>
                  <Grid item md={8}>
                    <div className={[m0].join(' ')}>
                      <article style={{ display: 'block' }}>
                        <h4 style={{ marginTop: 0 }}>
                          <Link href={`/noticias?id=${show.id}`}><a className={textDark} style={{ textDecoration: 'none' }}>{show.title}</a></Link>
                        </h4>
                        <p>
                          {sanitizeHtml('abstract', show.description)}
                        </p>
                        <div className={postMeta}>
                          <span style={{ color: '#cf8100' }}><Icon>event_note</Icon> {show.creationDate.split(' ')[0]}</span>
                        </div>
                      </article>
                    </div>
                  </Grid>
                </Grid>
              )
            })
            }
          </Grid>
        </Grid>
      </article>
    );
  }
}

Entry.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

const mapDispatchToProps = dispatch => ({
  getNew: (id, cb) => dispatch(getNew(id, cb)),
  getAllNews: () => dispatch(getAllNews())
})
const mapStateToProps = (state = { news: INITIAL_STATE_NEWS }) => ({
  news: state.news
})


// export default withStyles(STYLES, { name: 'WiEntry' })(Entry)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(STYLES, { name: 'WiEntry' })(Entry))
