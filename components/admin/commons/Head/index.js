import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon'
// import { primaryBG, globalStyles, header, flex } from '../../../../src/styles'
// import LOGO from '../../../../static/logo.svg'
import Menu, { MenuItem } from 'material-ui/Menu'
import { logout } from '../../../../lib/api'
import { connect } from 'react-redux'
import Router from 'next/router'
import { INITIAL_STATE_USER } from '../../../../redux/reducers/user';

const drawerWidth = 200
const styles = theme => ({
  appBar: {
    height: 76,
    boxShadow: 'none',
    borderBottom: '#ebebeb solid 1px',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 10,
    marginRight: 24,
  },
  hide: {
    display: 'none',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class HeadBar extends React.Component {
  state = {
    anchorEl: null
  }
  closeMenu = () => this.setState({ anchorEl: null })
  openMenu = evt => this.setState({ anchorEl: evt.currentTarget })
  logout = () => {
    Router.push('/')
    this.props.logout()
  }
  getName = () => {
    if (this.props.user && this.props.user.firstName) {
      return this.props.user.firstName + ' ' + this.props.user.lastName
    } else if (this.props.user && this.props.user.email) {
      return this.props.user.email
    } else {
      return ''
    }
  }
    
  render() {
    const { classes, open, handleDrawerOpen } = this.props
    const openMenu = Boolean(this.state.anchorEl)
    return (
      <AppBar
        color="white"  
        position="absolute"
        className={[classes.appBar, open && classes.appBarShift].join(' ')}
      >
        <Toolbar disableGutters={!open} className={classes.flex}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={[classes.menuButton, open && classes.hide].join(' ')}
          >
            <Icon>menu</Icon>  
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
          </Typography>
          <div style={{ color: '#0070b5' }}>
            {this.getName()}  
            <IconButton
              aria-owns={openMenu ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.openMenu}
              color="inherit"
            >
              <Icon style={{ color: '#0070b5' }}>account_circle</Icon>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openMenu}
              onClose={this.closeMenu}
            >
              {/* <MenuItem onClick={this.closeMenu}>Perfil</MenuItem> */}
              <MenuItem onClick={this.logout} style={{ fontSize: 12 }}>Salir</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

HeadBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})
const mapStateToProps = (state = { user: INITIAL_STATE_USER }) => ({
  user: state.user.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { name: 'MuiToolbar' })(HeadBar))