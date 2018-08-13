import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Head from './head'
import NavBar from './nav'
import AppBar from 'material-ui/AppBar'

const styles = {
  root: {
    flexGrow: 1,
  }
};

class HeadBar extends React.Component {
  render() {
    const { classes, page, layout } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">  
          <Head />
          <NavBar page={page}/>
        </AppBar>
      </div>
    );
  }
}

HeadBar.propTypes = {
  classes: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
};

export default withStyles(styles)(HeadBar)