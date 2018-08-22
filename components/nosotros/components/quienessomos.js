import React, { Component } from 'react'
import { globalStyles, flex, colors } from '../../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
// const texto = `<p><b>Misión</b></p><p>Nuestro compromiso es satisfacer las necesidades y expectativas de usuarios y proveedores, mediante la comercialización y distribución de Gas Domiciliario en forma segura. Para ello contamos con talento humano eficiente, calificado y comprometido, sumado a la más avanzada tecnología y excelencia en el servicio, buscando crecimiento y rentabilidad de los accionistas, preservando el medio ambiente y generando bienestar a colaboradores, y a la comunidad.</p>`
import YouTube from 'react-youtube'

const STYLES = theme => ({
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

class QuienesSomos extends Component {
  state = {
    h: '360',
    w: '640'
  }

  componentDidMount() {
    const w = this.hola.offsetWidth - 30
    const factor = 1.77777777777778
    const h = w / factor
    
    this.setState({ w: `${w}`, h: `${h}` })
  }
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, mb4, p0 } = classes
    return (
      <article className={[seccion, m0, p0].join(' ')} ref={ref => this.hola = ref}>
        <Grid container className={container}>
          <Grid item xs={12} className={[classes.justifyText, classes.styleText].join(' ')}>
            <p><b className='p'>Misión</b></p><p className='p'>Nuestro compromiso es satisfacer las necesidades y expectativas de usuarios y proveedores, mediante la comercialización y distribución de Gas Domiciliario en forma segura. Para ello contamos con talento humano eficiente, calificado y comprometido, sumado a la más avanzada tecnología y excelencia en el servicio, buscando crecimiento y rentabilidad de los accionistas, preservando el medio ambiente y generando bienestar a colaboradores, y a la comunidad.</p>
            <p><b className='p'>Visión</b></p><p className='p'>Convertirnos en la organización líder en la comercialización y distribución de gas domiciliario en el sur de Colombia, con proyección internacional, mediante el desarrollo de servicios tradicionales e innovadores con los más altos estándares de calidad y productividad; así como el uso de tecnologías limpias que contribuyan al mejoramiento continuo logrando un adelanto sostenible que nos permita brindar bienestar a los grupos de interés social siendo nuestra mayor responsabilidad.</p>
            <p><b className='p'>Estructura Organizacional</b></p>
            <img src="../../static/nosotros.jpg" className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt="Surgas" />
            <p className='p'><b>Himno de la compañía</b></p>
            <YouTube
              videoId={'x669PDogaB0'} opts={{ height: this.state.h, width: this.state.w }}
              onReady={evt => evt.target.pauseVideo()}
            />
          </Grid>
        </Grid>
      </article>
    );
  }
}

QuienesSomos.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiQuienesSomos' })(QuienesSomos)