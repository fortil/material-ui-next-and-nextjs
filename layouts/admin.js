import React from 'react'
import { check } from '../lib/api'
import withRoot from '../src/withRoot'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'
import PropTypes from 'prop-types'
import Header from '../components/admin/commons/Head'
import getMenuComponent from '../components/admin/commons/Head/tilData'
import Components from '../components/admin/components'
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
    allow: false
  }

  componentDidMount = () => {
    check().then(ok => this.setState({ allow: !!ok })) 
  }

  render() {
    const { children, classes, query, user } = this.props
    const role = user.user.roles.join(',')
    const isAdmin = role.includes('Admin')
    if (!this.state.allow) {
      return (<div />)
    }
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
          {
            Object.keys(Components).map((key, i) => {
              const hasPerms = isAdmin ? true : role.reduce(
                (prev, curr) => Components[key].permissions.includes(curr) ? true : prev
                , false)
              return (
                <div style={{ ...(!hasPerms ? { display: 'none' } : {}) }}>
                  <Divider style={{ backgroundColor: '#a8a8a8' }} />
                  <List style={{ paddingTop: 0, paddingBottom: 0 }}>{getMenuComponent(Components[key].links, query)}</List>
                </div>
              )
            })
          }
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
