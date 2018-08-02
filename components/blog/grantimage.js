import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { globalStyles, flex } from '../../src/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Link from 'next/link'

const STYLES = theme => ({
  ...globalStyles,
  ...flex,
  centerCropped: {
    width: '100%',
    height: 250,
    backgroundPosition: '50% 50%', // center center
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
})
class GrantImage extends Component {
  render() {
    const { classes } = this.props
    const { centerCropped, m0, sectionNoBackground, p0 } = classes
    return (
      <section className={[m0, p0, sectionNoBackground].join(' ')}>
        {/* <img src="../static/image_front.jpg" alt="Surgas station" className={centerCropped}/> */}
        <div className={centerCropped}
          style={{ backgroundImage: `url(${'../static/camiones.jpg'})` }}>
        </div>
      </section>
    )
  }
};

GrantImage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiGrantImage' })(GrantImage);
