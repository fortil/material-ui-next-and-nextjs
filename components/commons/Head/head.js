import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import { primaryBG, globalStyles, header, flex } from '../../../src/styles'
import LOGO from '../../../static/logo2.svg'

const styles = theme => ({
  image: {
    verticalAlign: 'middle',
    borderStyle: 'none',
    top: 0,
    width: 'auto',
    height: 104,
  },
  root: {
    ...theme.mixins.toolbar,
    ...primaryBG,
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    maxHeight: '100%',
  },
  icns: {
    display: 'inline-blok',
    borderRadius: 60,
    boxShadow: '0px 0px 2px #ff9c00',
    // #2196f3
  },
  butonsHead: {
    '&': {
      '@media (max-width: 376px)': {
        display: 'none!important',
      },
    }
  },
  ...globalStyles,
  ...header,
  ...flex
})

class HeadBar extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <Toolbar classes={{ root: classes.root }}>
        <div className={[classes.containerHeader, classes.container].join(' ')}>
          <div className={classes.headerRow}>
            <div className={[classes.headerColumn, classes.justifyContentStart].join(' ')}>
              <div className={classes.headerRow}>
                <img src={LOGO} className={classes.image} />
              </div>
            </div>
            <div className={[classes.headerColumn, classes.butonsHead].join(' ')}>
              <div className={[classes.headerRow, classes.justifyContentEnd].join(' ')}>
                <div className={[classes.flex, classes.alignItemsCenter].join(' ')}>
                  <IconButton className={[classes.featureBoxIcon, classes.icns].join(' ')} color="inherit" aria-label="Menu">
                    <Icon style={{ color: '#ff9c00' }}>phone</Icon>  
                  </IconButton>
                  <div className={classes.featureBoxInfo}>
                    <h4 className={[classes.mb0, classes.h4].join(' ')}>
                      (018000)-95-4004
                    </h4>
                    <p className={classes.mt0}>
                      <small>Línea de emergencia nacional</small>
                    </p>  
                  </div>
                </div>  
                <div className={[classes.flex, classes.alignItemsCenter].join(' ')} style={{ marginLeft: 25 }}>
                  <IconButton className={[classes.featureBoxIcon, classes.icns].join(' ')} color="inherit" aria-label="Menu">
                    <Icon style={{ color: '#ff9c00' }}>email</Icon>  
                  </IconButton>
                  <div className={classes.featureBoxInfo}>
                    <h4 className={[classes.mb0, classes.h4].join(' ')}>
                      surgas@surgas.com
                    </h4>
                    <p className={classes.mt0}>
                      <small>Ponte en contacto con nostros</small>
                    </p>  
                  </div>
                </div>  
              </div>  
            </div>
          </div>
        </div>
      </Toolbar>
    )
  }
}

HeadBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { name: 'MuiToolbar' })(HeadBar)