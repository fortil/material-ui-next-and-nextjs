import React, { Component } from 'react'
import { globalStyles, flex, colors } from '../../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

const STYLES = () => ({
  ...flex,
  ...globalStyles,
  textStyle: {
    textAlign: 'justify'
  },
  title: {
    color: colors.crSecondary
  },
  styleText: {
    fontSize: 13,
  }
})

class Historia extends Component {
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, h3, mb4, textCenter, title, p0 } = classes

    return (
      <article className={[seccion, m0, p0].join(' ')}>
        <Grid container className={container}>
          <Grid item xs={12} className={[classes.justifyText, classes.styleText].join(' ')}>
            <img src="../../static/historia.jpg" className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt=""/>
            <h3 className={[h3, textCenter, title].join(' ')}><strong>Una empresa para beneficio de todos</strong></h3>
            <p><b>SURCOLOMBIANA DE GAS S.A.E.S.P.</b> es una Empresa de Servicios Públicos Domiciliarios que nació en el año 2004, como una respuesta del Departamento del Huila para aquellos municipios que no cuentan con el servicio de Gas Domiciliario, buscando implementar un sistema que satisficiera las expectativas de sus habitantes e impulsar proyectos de inversión, estimulando de esta manera la creación de empresas como fuentes generadoras de empleo sostenible y promotoras del desarrollo regional.</p>
      
            <p>Se creó como una Empresa Mixta, organizada como sociedad anónima en los términos del Artículo 17 de la Ley 142 de 1994, de nacionalidad Colombiana y sujeta al régimen de la Ley de Servicios Públicos, constituida el 1º de Diciembre de 2004 mediante Escritura Pública 1943, de la Notaria Primera del Municipio de Pitalito y cuyo objeto social principal es la prestación del servicio público de gas combustible en el componente de distribución y comercialización y las actividades inherentes y conexas a dicho servicio.</p>

            <p>Su sede principal está ubicada en la ciudad de Pitalito en la carrera 1B No. 4 – 58, desde donde se coordinan las labores operativas y de mantenimiento y una oficina de apoyo administrativo y técnico en la ciudad de Neiva ubicada en la carrera 16 No. 46 – 24, desde donde se coordinan dieciocho(21) centros de atención y operación de los propano productos de los  municipios de:
Acevedo, Colombia, Isnos, Elías, Santa María, La Argentina, Nátaga, Oporapa, Iquira, Palestina y Saladoblanco; así como las estaciones de descompresión de GNC de los municipios de: Agrado, Altamira, Guadalupe, El Pital, San Agustín, Suaza, Timaná, Pitalito, Bruselas(Pitalito) y Mocoa(Putumayo).La Oficina de atención al usuario en la ciudad de Mocoa está ubicada en la Calle 7ª No. 4 - 21, Teléfono 420 54 94.</p>

            <p>La experiencia que por más de ocho(8) años tiene Surgas S.A.E.S.P.en la ejecución de proyectos, en su operación y suministro directo del servicio mediante las tecnologías de Gas Natural Comprimido(GNC) y Gas Licuado del Petróleo(GLP), a través de gasoductos virtuales por carretera, le ha permitido hoy llegar a las zonas más apartadas del Huila y actualmente al Departamento del Putumayo, siendo la única empresa en Colombia que maneja conjuntamente estos dos(2) energéticos, generando calidad de vida a sus habitantes.</p>

            <p>Los proyectos que se encuentran en operación y funcionamiento, han sido ejecutados con recursos de los Gobiernos Nacional, Departamental y municipal más los aportes directos de Surgas S.A.E.S.P.quien en los últimos años viene  registrando excelentes resultados financieros.</p>

            <p>Por ello en Surgas estamos preparados para nuevas inversiones, ampliar nuestra cobertura y encender la llama de la comodidad y seguridad en más hogares del Sur Colombiano, participando en la consolidación de una región cada vez más productiva y dinámica, enmarcados dentro del plan de masificación del gas propuesto por el Gobierno Nacional.</p>
          </Grid>
        </Grid>
      </article>
    );
  }
}

Historia.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiHistoria' })(Historia)