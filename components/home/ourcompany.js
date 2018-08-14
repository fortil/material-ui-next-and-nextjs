import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { globalStyles, flex } from '../../src/styles'
import Grid from 'material-ui/Grid'
import Link from 'next/link'
import nuestraEmpresa from '../../static/nuestra-empresa.png'

const STYLES = () => ({
  ...globalStyles,
  ...flex,
  mobileCss: {
    '&': {
      '@media (max-width: 376px)': {
        width: '100%'
      },
    },
  },
  background: {
    backgroundImage: `url(${nuestraEmpresa})`,
    background: 'transparent',
    borderTopColor: 'transparent',
  }
})
class OurCompany extends Component {
  render() {
    const { classes } = this.props
    const { container, section: seccion, m0, mb4, lead } = classes
    return (
      <section className={[seccion, m0, classes.background].join(' ')}>
        <Grid container className={container}>
          <Grid item xs={12}>
            <Grid container spacing={24}>
              <Grid item md={2}>
              </Grid>
              <Grid item md={8} style={{ color: 'white', textAlign: 'center' }} className={classes.mobileCss}>
                <h2 className={[m0, mb4].join(' ')}>Nuestra <span style={{ fontWeight: 100 }}>Empresa</span></h2>
                <p className={lead} style={{ fontSize: 15 }}>SURCOLOMBIANA DE GAS S.A. E.S.P. es una Empresa de Servicios Públicos Domiciliarios que nació en el año 2004, como una respuesta del Departamento del Huila para aquellos municipios que no cuentan con el servicio de Gas Domiciliario, buscando implementar un sistema que satisficiera las expectativas de sus habitantes e impulsar proyectos de inversión.. <Link href="/nosotros"><a style={{ textDecoration: 'none', color: 'white' }}><p>Ver más..</p></a></Link></p>
              </Grid>  
              <Grid item md={2}>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>  
    )
  }
};

OurCompany.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiOurCompany' })(OurCompany);
