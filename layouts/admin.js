import React from 'react'
import withRoot from '../src/withRoot'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'
import PropTypes from 'prop-types'
import Header from '../components/admin/commons/Head'
import { FcrcMenuComponent, FrcMenuComponent, PQRsMenuComponent, NewsMenuComponent, UsersMenuComponent, ProvidersMenuComponent, PurchaseMenuComponent, RTRsMenuComponent, NotificationsMenuComponent } from '../components/admin/commons/Head/tilData'
import LOGO from '../static/logo.svg'
import Router from 'next/router'

const theme = createMuiTheme({
  typography: {
    fontSize: 10,
    htmlFontSize: 10,
    select: {
      fontSize: 10,
    }
  },
})

class AdminLayout extends React.Component {
  state = {
    openDrawer: true,
  }

  render() {
    const { children, classes, query, user } = this.props
    const role = user.user.roles.join(',')
    const isAdmin = role.includes('Admin')
    const isAtencion = role.includes('Atención Usuario') || isAdmin
    const isCompras = role.includes('Compras') || isAdmin
    const isPublicador = role.includes('Publicador') || isAdmin
    return (
      // <Provider store={store}>
      <div className={classes.root}>
        <Header open={this.state.openDrawer} handleDrawerOpen={() => this.setState({ openDrawer: true })} />  
        <Drawer
          variant="permanent"
          classes={{
              docked: classes.docked,
              paper: [classes.drawerPaper, !this.state.openDrawer && classes.drawerPaperClose].join(' '),
          }}
          
            open={this.state.openDrawer}
          >
          <div className={classes.toolbar} onClick={() => Router.push('/admin')} style={{ backgroundColor: 'white' }}>
            <img src={LOGO} className={classes.image} />
          </div>
          <Divider style={{ backgroundColor: '#a8a8a8', ...(!isAtencion ? { display: 'none' } : {}) }}/>
          <List style={{ paddingTop: 0, paddingBottom: 0, ...(!isAtencion ? { display: 'none' } : {}) }}>{FcrcMenuComponent(query)}</List>
          <Divider style={{ backgroundColor: '#a8a8a8', ...(!isAtencion ? { display: 'none' } : {}) }}/>
          <List style={{ paddingTop: 0, paddingBottom: 0, ...(!isAtencion ? { display: 'none' } : {}) }}>{FrcMenuComponent(query)}</List>
          <Divider style={{ backgroundColor: '#a8a8a8', ...(!isAtencion ? { display: 'none' } : {}) }}/>
          <List style={{ paddingTop: 0, paddingBottom: 0, ...(!isAtencion ? { display: 'none' } : {}) }}>{PQRsMenuComponent(query)}</List>
          <Divider style={{ backgroundColor: '#a8a8a8', ...(!isAtencion ? { display: 'none' } : {}) }}/>
          <List style={{ paddingTop: 0, paddingBottom: 0,  ...(!isAtencion ? { display: 'none' } : {}) }}>{RTRsMenuComponent(query)}</List>
          <Divider style={{ backgroundColor: '#a8a8a8', ...(!isAtencion ? { display: 'none' } : {}) }}/>
          <List style={{ paddingTop: 0, paddingBottom: 0,  ...(!isAtencion ? { display: 'none' } : {}) }}>{NotificationsMenuComponent(query)}</List>
          <Divider style={{ backgroundColor: '#a8a8a8', ...(!isPublicador ? { display: 'none' } : {}) }} />
          <List style={{ paddingTop: 0, paddingBottom: 0,  ...(!isPublicador ? { display: 'none' } : {}) }}>{NewsMenuComponent(query)}</List>
          <Divider style={{ backgroundColor: '#a8a8a8', ...(!isAdmin ? { display: 'none' } : {}) }} />
          <List style={{ paddingTop: 0, paddingBottom: 0,  ...(!isAdmin ? { display: 'none' } : {}) }}>{UsersMenuComponent(query)}</List>
          <Divider style={{ backgroundColor: '#a8a8a8', ...(!isCompras ? { display: 'none' } : {}) }} />
          <List style={{ paddingTop: 0, paddingBottom: 0,  ...(!isCompras ? { display: 'none' } : {}) }}>{ProvidersMenuComponent(query)}</List>
          <Divider style={{ backgroundColor: '#a8a8a8', ...(!isCompras ? { display: 'none' } : {}) }} />
          <List style={{ paddingTop: 0, paddingBottom: 0,  ...(!isCompras ? { display: 'none' } : {}) }}>{PurchaseMenuComponent(query)}</List>
        </Drawer>
        <MuiThemeProvider theme={theme}>
          {children}
        </MuiThemeProvider>
      </div>
      // </Provider>
    )
  }
}

AdminLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
}


const drawerWidth = 200
const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },
  drawerPaper: {
    height: '100%',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: '#10283d',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  docked: {
    height: '100vh',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
});
export default withStyles(styles, { withTheme: true, name: 'AdminLayout' })(
  withRoot(AdminLayout)
)
