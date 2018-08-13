import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { globalStyles, flex, nosotros, colors } from '../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Link from 'next/link'
import Typography from 'material-ui/Typography'

const STYLES = theme => ({
  ...flex,
  ...globalStyles
})

class WelcomeAdmin extends Component {
  state = {
    img: '../../static/logo.svg',
  }

  render() {
    const { classes } = this.props
    const { section: seccion, m0, textCenter, p0 } = classes
    return (
      <article className={[seccion, m0, p0].join(' ')}>
        <img src={this.state.img} />
        {/* <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography> */}
      </article>
    );
  }
}

WelcomeAdmin.propTypes = {
  classes: PropTypes.object.isRequired
}


export default withStyles(STYLES, { name: 'WiWelcomeAdmin' })(WelcomeAdmin)