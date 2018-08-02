import React, { Component } from 'react'
import { globalStyles, flex } from '../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Link from 'next/link'

const STYLES = theme => ({
  ...flex,
  ...globalStyles,
  vermas: {

  },
  hover: {
    transition: 'transform .2s',
    '&:hover': {
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      transform: 'scale(1.05)'
    },
  },
  mobileCss: {
    '&': {
      '@media (max-width: 376px)': {
        width: '100vw'
      },
    },
  },
  mobileCssImg: {
    '&': {
      '@media (max-width: 376px)': {
        width: '32%'
      },
    },
  },
  mobileCssTxt: {
    '&': {
      '@media (max-width: 376px)': {
        width: '68%'
      },
    },
  },
  styleText: {
    fontSize: 13,
    textAlign: 'justify'
  }
})

const data = [
  { title: '¿Qué es el GAS natural?', text: 'Es una fuente de energía limpia de procedencia fósil, ...', img: 'icon1_01.png', link: '/nuestros-servicios#que-es-gas-natural' },
  { title: 'Instalación de gas natural', text: 'Las instalaciones de gas natural están compuestas por un conjunto de tuberías..', img: 'icon1_02.png', link: '/nuestros-servicios#instalacion' },
  { title: 'Gas Natural Comprimido', text: 'Más conocido por la sigla GNC, es esencialmente gas natural almacenado a altas presiones.', img: 'icon1_03.png', link: '/nuestros-servicios#que-es-gas-natural-comprimido' },
]

class OurServiceHome extends Component {
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, mb1, h3, mb4, textCenter } = classes

    return (
      <section className={[seccion, m0].join(' ')}>
        <Grid container className={container}>
          <Grid item xs={12}>
            <h3 className={[h3, textCenter].join(' ')}>Nuestros <strong>Servicios</strong></h3>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={24}>
              {data.map(item => (
                <Grid item md={4} key={item.title} className={[classes.hover, classes.mobileCss].join(' ')}>
                  <Grid container spacing={24} className={classes.mobileCss}>
                    <Grid item md={4} className={classes.mobileCssImg}>
                      <img className={mb4} style={{ maxWidth: '100%', height: 'auto' }} src={`../../static/${item.img}`} alt="" />
                    </Grid>
                    <Grid item md={8} className={[classes.mobileCssTxt, classes.styleText].join(' ')}>
                      <h4 className={[m0, mb1].join(' ')}>{item.title}</h4>
                      <p>{item.text}</p>
                      <p className={classes.vermas}><Link href={item.link}><a style={{ textDecoration: 'none' }}><span>Ver más..</span></a></Link></p>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </section>
    );
  }
}
          
OurServiceHome.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiOurServiceHome' })(OurServiceHome)