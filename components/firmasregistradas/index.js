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
    title: 'Firmas registradas',
    desc: 'Firmas registradas',
    descripcion: 'Empresas registradas como firmas constructoras de instalaciones internas para el suministro de gas domiciliario',
    path: 'firmasautorizadas',
    icon: 'check_circle_outline'
  },
  {
    title: 'Requisitos',
    path: 'requisitos',
    desc: 'Requisitos para registrar la firma',
    // descripcion: 'El directorio de proveedores es una herramienta de búsqueda de proveedores potenciales, utilizada por SURGAS de Colombia dentro de sus sos de compra. Si desea registrarse debe diligenciar el siguiente formulario:',
    icon: 'list'
  },
  {
    title: 'Formularios',
    path: 'formularios',
    desc: 'Formularios',
    descripcion: 'Descargar formatos para solicitud de inscripción de fcr.',
    icon: 'picture_as_pdf'
  },
  {
    title: 'Circulares Internas',
    desc: 'Circulares internas registradas',
    descripcion: 'Empresas registradas como firmas constructoras de instalaciones internas para el suministro de gas domiciliario',
    path: 'circularesinternas',
    icon: 'done_all'
  },
]
class RegistrarFirma extends Component {
  state = { view: 'firmasautorizadas' }

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
            <h3 className={[h3, textCenter].join(' ')} style={{ textTransform: 'uppercase' }}>
              <strong>{data.filter(i => i.path === this.state.view)[0].desc}</strong>
            </h3>
            <p style={{ textAlign: 'center' }}>{data.filter(i => i.path === this.state.view)[0].descripcion}</p>
          </Grid>
          <Grid item md={2} className={classes.mobileCss}>
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
          <Grid item md={10} className={classes.mobileCss}>
            {this.getComponent(this.state.view)}
          </Grid>
        </Grid>
      </section>
    );
  }
}

RegistrarFirma.propTypes = {
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

export default withStyles(STYLES, { name: 'WiRegistrarFirma' })(RegistrarFirma)