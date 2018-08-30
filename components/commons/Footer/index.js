import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import { footer, globalStyles, flex } from '../../../src/styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/fontawesome-free-brands'
const { sedes: data } = require('../../../config.json').footer
const styles = {
  ...footer,
  ...globalStyles, ...flex,
  mobileCss: {
    '&': {
      '@media (max-width: 376px)': {
        width: '100%'
      },
    },
    '& a': {
      textDecoration: 'none',
      fontSize: 12,
    },
    '& P': {
      textDecoration: 'none',
      fontSize: 12,
    },
  },
  textWhite: {
    color: 'white',
  },
  margin: {
    '& p': {
      marginLeft: 20,
    }
  },
  link: {
    color: 'white', textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    marginBottom: 5,
  },
  icons: {
    minWidth: 24
  }
}

class Footer extends React.Component {
  render() {
    const { classes } = this.props
    const { container, footer } = classes
    return (
      <footer className={footer}>
        <Grid container className={container} spacing={24}>
          {
            data.map(dato => (
              <Grid item md={2} key={dato.cel} className={[classes.mobileCss, classes.margin].join(' ')}>
                <h4 style={{ display: 'flex' }}><Icon className={[classes.textWhite, classes.icons].join(' ')}>room</Icon><b>{dato.city}</b></h4>
                <p className='p2'>{dato.dir}</p>
                {data.tel ? <p><b>Tel: </b>{dato.tel}</p> : null}
                <p className='p2'><b>Cel: </b>{dato.cel}</p>
              </Grid>
            ))
          }  
          <Grid item md={2} className={classes.mobileCss}>
            <Grid container justify='center' direction='column' alignItems='flex-start'>
              <Grid item md={12} className={classes.textWhite}>
                <h4 style={{}}><b>Enlaces de interés</b></h4>
              </Grid>
              <Grid item md={12} className={classes.textWhite}>
                <a href='http://www.superservicios.gov.co/' target='_blank' className={classes.link}>¿Quién nos vigila?</a>
              </Grid>
              <Grid item md={12} className={classes.textWhite}>
                <a href='http://onac.org.co/modulos/contenido/default.asp?idmodulo=180&pagina=2&idmoduloreferer=177&tiporeferer=areas&objid=05&objnombre=Instalaciones%20de%20Gas' target='_blank' className={classes.link}>Organismos de Inspección Acreditados</a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} className={classes.mobileCss}>
            <Grid container justify='center' direction='column' alignItems='flex-start'>
              <Grid item md={12} className={classes.textWhite}>
                <h4 style={{}}><b>Síguenos</b></h4>
              </Grid>
              <Grid item md={12} className={classes.textWhite}>
                <a href='https://www.facebook.com/SURGASSAESP/' target='_blank' className={classes.link}><FontAwesomeIcon icon={faFacebookSquare} size='2x' style={{ marginRight: 5 }}/> Facebook</a>
              </Grid>
              <Grid item md={12} className={classes.textWhite}>
                <a href='https://twitter.com/SURGAS_SA' target='_blank' className={classes.link}><FontAwesomeIcon icon={faTwitterSquare} size='2x' style={{ marginRight: 5 }}/> Twitter</a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)