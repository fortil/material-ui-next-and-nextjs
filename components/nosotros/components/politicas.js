import React, { Component } from 'react'
import { globalStyles, flex, colors } from '../../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/fontawesome-free-solid'

const config = require('../../../config.json')
const apiFiles = config['api_files']

const STYLES = theme => ({
  ...flex,
  ...globalStyles,
  title: {
    color: colors.crSecondary
  }
})

const files = {
  
  'DE-POL-08%20Pol%C3%ADtica%20de%20gestion%20integral': {
    numPages: null,
    pageNumber: 1,
  },
  'DE-POL-02%20Pol%C3%ADtica%20de%20prevenci%C3%B3n%20de%20consumo%20de%20tabaco%2C%20alcohol%20y%20drogas': {
    numPages: null,
    pageNumber: 1,
  },
  //'DE-POL-03%20Pol%C3%ADtica%20medio%20ambiental': {
  //  numPages: null,
  //  pageNumber: 1,
  //},
  'DE-POL-04%20Pol%C3%ADtica%20de%20seguridad%20vial': {
    numPages: null,
    pageNumber: 1,
  },
  //'DE-POL-05%20Pol%C3%ADtica%20de%20elementos%20de%20protecci%C3%B3n%20personal': {
  //  numPages: null,
  //  pageNumber: 1,
  //},
  //'DE-POL-06%20Pol%C3%ADtica%20de%20Calidad': {
  //  numPages: null,
  //  pageNumber: 1,
  //},
  'DE-POL-07%20Pol%C3%ADtica%20de%20privacidad%20y%20tratamiento%20de%20datos%20personales': {
    numPages: null,
    pageNumber: 1,
  },
}

class Politicas extends Component {

  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, p0 } = classes

    return (
      <article className={[seccion, m0, p0].join(' ')}>
        <Grid container className={container}>
          {
            Object.keys(files).map((keyFile, i, array) => {
              const name = decodeURIComponent(keyFile).replace(/^(.*\-\d+\s{0,100})/ig, '')
              return <Grid key={i} item md={4}>
                <a href={`${apiFiles}/pdfpoliticas/${keyFile}.pdf`} target="_blank"
                  style={{ textDecoration: 'none', color: '#787878' }}
                >
                  <Grid container direction="column" alignItems="center">
                    <Grid item md={12}>
                      <FontAwesomeIcon icon={faFilePdf} size='3x' style={{  }} />
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