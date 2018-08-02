import React, { Component } from 'react'
import { globalStyles, flex, nosotros } from '../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import * as Components from './components'


const STYLES = theme => ({
  ...flex,
  ...globalStyles,
  ...nosotros,
  buttonPressed: {
    backgroundColor: '#ff9c00 !important'
  },
  mobileCss: {
    '&': {
      '@media (max-width: 376px)': {
        width: '100%'
      },
    },
  },
})

const data = [
  {
    title: 'Quiénes Somos',
    path: 'quienessomos',
    icon: 'people'
  },
  {
    title: 'Historia',
    path: 'historia',
    icon: 'hourglass_full'
  },
  {
    title: 'Presencia',
    path: 'presencia',
    icon: 'map'
  },
  {
    title: 'Políticas',
    path: 'politicas',
    icon: 'book'
  },
  {
    title: 'Nuestro SGC',
    path: 'nuestrosgc',
    icon: 'beenhere'
  },
  {
    title: 'Ingrese Hoja de vida',
    path: 'ingresehojadevida',
    icon: 'insert_drive_file'
  },
]

class Nosotros extends Component {
  state = {
    view: 'quienessomos'
  }
  handleClick = item => {
    this.setState({ view: item.path })
  }
  getComponent = view => {
    const C = Components[view]
    return C ? <C /> : <div />
  }
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, h3, textCenter, listItemNosotros, listNotros, buttonPressed } = classes
    // const Componente = this.getComponent(this.state.view)
    const nameTitle = data.filter(item => item.path === this.state.view).map(item => item.title)[0]
    return (
      <section className={[seccion, m0].join(' ')}>  
        <Grid container className={container}>
          <Grid item xs={12}>
            <h3 className={[h3, textCenter].join(' ')} style={{ textTransform: 'uppercase'}}><strong>{nameTitle}</strong></h3>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={24}>
              <Grid item md={3} className={classes.mobileCss}>
                <List component="nav" className={listNotros}>
                  {data.map(item => {
                    const pressed = this.state.view === item.path
                    const styless = [listItemNosotros, pressed ? buttonPressed : ''].join(' ')
                    return (<ListItem button={!pressed}
                      key={item.icon} className={styless} onClick={() => this.handleClick(item)}>
                      <ListItemIcon>
                        <Icon>{item.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText primary={item.title}/>
                    </ListItem>
                    )
                  })}
                </List>
              </Grid>
              <Grid item md={9} className={classes.mobileCss}>
                {this.getComponent(this.state.view)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>
    );
  }
}

Nosotros.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiNosotros' })(Nosotros)