import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import Link from 'next/link'
import Router from 'next/router'

const STYLES = them => ({
  button: {
    position: 'fixed',
    left: 0,
    top: 140,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: '0 6px 6px 0'
  },
  icon: {
    color: 'white',
    '&:hover': {
      color: '#2196f3'
    }
  }
})

class AdminIcon extends React.Component {
  handleClick = () => {
    Router.push({ pathname: '/login' })
  }

  render() {
    const { classes } = this.props
    const { button, icon } = classes

    return (
      <div onClick={this.handleClick}>
        <IconButton className={classes.button} aria-label="Delete" onClick={this.handleClick}>
          <Icon className={icon}>settings</Icon>
        </IconButton>  
      </div>
    );
  }
}

AdminIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(STYLES)(AdminIcon)