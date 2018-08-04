import React, { Component } from 'react'
import { globalStyles, flex, colors } from '../../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/fontawesome-free-solid'

const STYLES = () => ({
  ...flex,
  ...globalStyles,
  title: {
    color: colors.crSecondary
  }
})

const files = [
  {
    link: 'https://surgas.blob.core.windows.net/fcrinscripciondocs/CR-FO-80%20SOLICITUD%20DE%20INSCRIPCION%20EN%20EL%20REGISTRO%20FCR%20PERSONA%20JURIDICA.pdf',
    name: 'Persona natural'
  },
  {
    link: 'https://surgas.blob.core.windows.net/fcrinscripciondocs/CR-FO-80%20SOLICITUD%20DE%20INSCRIPCION%20EN%20EL%20REGISTRO%20FCR%20PERSONA%20JURIDICA.pdf',
    name: 'Persona jurídica'
  },
]

class Politicas extends Component {

  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, p0 } = classes

    return (
      <article className={[seccion, m0, p0].join(' ')}>
        <Grid container className={container}>
          {
            files.map(file => {
              const name = file.name
              return <Grid item md={4}>
                <a href={file.link} target='_blank'
                  style={{ textDecoration: 'none', color: '#787878' }}
                >
                  <Grid container direction='column' alignItems='center'>
                    <Grid item md={12}>
                      <FontAwesomeIcon icon={faFilePdf} size='3x' style={{}} />
                    </Grid>
                    <Grid item md={12} style={{ marginBottom: 25, textAlign: 'center' }}>
                      <span style={{ fontSize: 12, color: 'black' }}>{name.trim()}</span>
                    </Grid>
                  </Grid>
                </a>
              </Grid>
            })
          }
        </Grid>
      </article>
    );
  }
}

Politicas.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiPoliticas' })(Politicas)