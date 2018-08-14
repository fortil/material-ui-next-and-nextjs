import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { globalStyles, flex } from '../../src/styles'

const STYLES = theme => ({
  ...globalStyles,
  ...flex,
  centerCropped: {
    width: '100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    '&': {
      '@media (min-width: 376px)': {
        height: 420,
      },
      '@media (max-width: 376px)': {
        height: 220,
      },
    },
  }
})
class GrantImage extends Component {
  render() {
    const { classes } = this.props
    const { centerCropped, m0, sectionNoBackground, p0 } = classes
    return (
      <section className={[m0, p0, sectionNoBackground].join(' ')}>
        <img src="../static/image_front.png" alt="Surgas station" className={centerCropped}/>
        {/* <div className={centerCropped}
          style={{ backgroundImage: `url(${'../static/image_front.jpg'})` }}>
        </div> */}
      </section>
    )
  }
};

GrantImage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiGrantImage' })(GrantImage);
