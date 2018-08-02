import React, { Component } from 'react'
import { globalStyles, flex } from '../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import * as Components from './components'

const data = [
  {
    title: 'Proveedores',
    path: 'proveedores',
    desc: 'Registro de Proveedores',
    descripcion: 'El directorio de proveedores es una herramienta de búsqueda de proveedores potenciales, utilizada por SURGAS de Colombia dentro de sus procesos de compra. Si desea registrarse debe diligenciar el siguiente formulario:',
    icon: 'people'
  },
  {
    title: 'Procesos de Compra',
    desc: 'Procesos de Compra',
    descripcion: 'El directorio de proveedores es una herramienta de búsqueda de proveedores potenciales, utilizada por SURGAS de Colombia dentro de sus procesos de compra. Si desea registrarse debe diligenciar el siguiente formulario:',
    path: 'purchases',
    icon: 'hourglass_full'
  },
]
class Proveedores extends Component {
  state = { view: 'proveedores' }

  getComponent = view => {
    const C = Components[view]
    return C ? <C /> : <div />
  }

  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, textCenter, h3, buttonPressed } = classes

    return (
      <section className={[seccion, m0].join(' ')}>
        <Grid container className={[container, classes.mobileCss].join(' ')}>
          <Grid item xs={12} className={classes.mobileCss}>
            <h3 className={[h3, textCenter].join(' ')} style={{ textTransform: 'uppercase' }}><strong>{data.filter(i => i.path === this.state.view)[0].desc}</strong></h3>
            <p>{data.filter(i => i.path === this.state.view)[0].descripcion}</p>
          </Grid>
          <Grid item md={3} className={classes.mobileCss}>
            <List component="nav" className={[classes.listProveedores, classes.mobileCss].join(' ')}>
              {data.map(item => {
                const pressed = this.state.view === item.path
                const styless = [classes.listItemProveedores, pressed ? buttonPressed : ''].join(' ')
                return (<ListItem button={!pressed}
                  key={item.icon} className={styless} onClick={() => this.setState({ view: item.path })}>
                  <ListItemIcon>
                    <Icon>{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
                )
              })}
            </List>  
          </Grid>  
          <Grid item md={9} className={classes.mobileCss}>
            {this.getComponent(this.state.view)}
          </Grid>
        </Grid>
      </section>
    );
  }
}

Proveedores.propTypes = {
  classes: PropTypes.object.isRequired,
}

const STYLES = theme => ({
  ...flex,
  ...globalStyles,
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  buttonPressed: {
    backgroundColor: 'white!important'
  },
  listProveedores: {
    borderRight: '2px solid #2196f3',
  },
  listItemProveedores: {
    padding: '12px 0 12px 10px',
    '& div h3': {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '0.8rem',
      fontWeight: 300
    }
  }
})

export default withStyles(STYLES, { name: 'WiPRoveedores' })(Proveedores)