import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Menu, { MenuItem } from 'material-ui/Menu'
// import List, { ListItem, ListItemText } from 'material-ui/List'
import { globalStyles, header, navbar, flex, colors } from '../../../src/styles'
import Router from 'next/router'

const links = [
  { path: '/', name: 'Inicio', icon: 'home' },
  { path: '/nosotros', name: 'Nosotros', icon: 'business' },
  {
    name: 'Servicios al usuario', icon: 'person', links: [
      { path: '/pqrs', name: 'PQRs' },
      { path: '/rtr', name: 'Revisión Técnica Reglamentaria' },
      { path: '/notifications', name: 'Notificaciones' },
      { path: '/nuestros-servicios', name: 'Nuestros Servicios' },
      { path: '/firmas-registradas', name: 'Firmas Registradas' },
    ]
  },
  // {
  //   name: 'Compromiso', icon: 'public', links: [
  //     { url: 'http://www.superservicios.gov.co/', name: '¿Quién nos vigila?' },
  //     { url: 'http://onac.org.co/modulos/contenido/default.asp?idmodulo=180&pagina=2&idmoduloreferer=177&tiporeferer=areas&objid=05&objnombre=Instalaciones%20de%20Gas', name: 'Organismos de Inspección Acreditados' },
  //   ]
  // },
  { path: '/noticias', icon: 'notifications', name: 'Noticias' },
  { path: '/proveedores', icon: 'autorenew', name: 'Proveedores' },
  { path: '/login', icon: 'account_circle', name: 'Administrador' },
]

const stRoot = {
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  alignSelf: 'stretch',
  maxHeight: '100%'
}
const styles = theme => ({
  root: {
    ...theme.mixins.toolbar,
    ...stRoot
  },
  fixed: {
    ...theme.mixins.toolbar,
    ...stRoot,
    position: 'fixed',
    width: '100%',
    backgroundColor: colors.blue,
  },
  backgroundColor: {
    background: 'linear-gradient(to bottom, #0074ae 0%,#0088cc 100%)'
  },
  fontSize: {
    fontSize: '0.8rem',
  },
  listButtons: {
    '&': {
      '@media (max-width: 376px)': {
        display: 'none!important',
      },
    }
  },
  menuMobile: {
    '&': {
      '@media (min-width: 376px)': {
        display: 'none!important',
      },
      '@media (max-width: 376px)': {
        marginLeft: '-2em',
        color: 'white'
      },
    },
  },
  ...globalStyles,
  ...header,
  ...navbar,
  ...flex
})

class NavBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = Object.assign({
      fixed: false,
      openMenuMobile: false,
      element: null
    },
      ...links.map(({ name }) => ({ [name]: null }))
    )
  }

  handleClick = (link, trg) => {
    if (link.name !== this.props.page || link.links || link.name === 'Noticias') {
      this.setState({ [link.name]: this.state[link.name] ? null : trg })
      if (!link.links) {
        Router.push({ pathname: link.path })
      }
    }
    if (link.url) {
      this.handleClose(link.name)
      window.open(link.url, '_blank')
    }
  }

  handleClose = name => {
    this.setState({ [name]: null })
  }

  getMenu = link => (
    <Menu
      id={`${link.name}-id`}
      key={link.name}
      anchorEl={this.state.element ? this.state.element : this.state[link.name]}
      open={Boolean(this.state[link.name])}
      onClose={() => this.handleClose(link.name)}
    >
      {link.links.map((r, i) => (
        <MenuItem
          key={r.name}
          onClick={() => this.handleClick(r, this.props.page)}
          className={this.props.classes.fontSize}>
          {r.name}
        </MenuItem>
      ))}
    </Menu>
  )
  componentDidMount() {
    links.forEach(link => {
      if (link.links) {
        link.links.forEach(linkLink => {
          Router.prefetch(linkLink.path)
        })
      } else {
        Router.prefetch(link.path)
      }
    })
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll = () => {
    if (
      window.scrollY > 100 &&
      // (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100) &&
      !this.state.fixed
    ) {
      this.setState({ fixed: true })
    } else if (this.state.fixed && window.scrollY <= 100) {
      this.setState({ fixed: false })
    }
  }
  openMenuMobile = () => {
    return <Menu
      anchorEl={this.state.element}
      open={this.state.openMenuMobile}
      onClose={() => this.setState({ openMenuMobile: false })}
    >
      {links.map((link, i) => {
        return <MenuItem
          key={link.name}
          onClick={() => this.handleClick(link, this.props.page)}
          className={this.props.classes.fontSize}>
          {link.name}{link.links ? <Icon>arrow_drop_down</Icon> : null}
          {link.links ? this.getMenu(link) : null}
        </MenuItem>
      })}
    </Menu>
  }

  render() {
    const { classes, page } = this.props
    const toolbar = this.state.fixed ? classes.fixed : classes.root
    return (
      <Toolbar color='primary' className={classes.backgroundColor} classes={{ root: toolbar }} style={{ zIndex: 99 }} ref='hola'>
        <div className={[classes.containerHeader, classes.container].join(' ')} id='cabecera-will'>
          <div className={[classes.headerRow, classes.listButtons, classes.justifyContentCenter].join(' ')}>
            {links.map((link, index) =>
              (<div key={link.name}>
                <Button  
                  aria-owns={this.state[link.name] ? `${link.name}-id` : null}
                  aria-haspopup='true'
                  variant={this.state[link.name] || link.name === page ? 'raised' : null}
                  className={this.state[link.name] || link.name === page ? classes.buttonPressed : classes.button}
                  onClick={evt => this.handleClick(link, evt.currentTarget)}
                >
                  <Icon>{link.icon}</Icon>
                  {link.name}
                  {link.links ? <Icon>arrow_drop_down</Icon> : null}
                </Button>
                {link.links ? this.getMenu(link) : null}
              </div>)
            )}
          </div>
          <Button
            aria-owns={null}
            aria-haspopup='true'
            variant={null}
            className={classes.menuMobile}
            onClick={evt => this.setState({ 'openMenuMobile': !this.state.openMenuMobile, 'element': document.getElementById('cabecera-will') })}
          >
            <Icon>menu</Icon>
          </Button>
          {this.state.openMenuMobile ? this.openMenuMobile() : null}
        </div>
      </Toolbar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
}

export default withStyles(styles, { name: 'WiNavBar' })(NavBar)