import React, { Component } from 'react'
import { globalStyles, flex, nosotros } from '../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Table from './table'

class RTR extends Component {
  
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, textCenter } = classes
    
    return (
      <section className={[seccion, m0].join(' ')}>
        <Grid container className={container}>
          <Grid item xs={12}>
            <h3 className={[classes.h3, textCenter].join(' ')} style={{ textTransform: 'uppercase' }}><strong>Notificaciones</strong></h3>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item md={10} className={classes.mobileCss}>
            <Table />
          </Grid>
          <Grid item md={1}></Grid>
        </Grid>
      </section>
    );
  }
}

RTR.propTypes = {
  classes: PropTypes.object.isRequired,
}

const STYLES = theme => ({
  ...flex,
  ...globalStyles,
  ...nosotros,
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%',
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldCaso: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    // width: '90%',
    borderRadius: 4,
    width: 'calc(100% - 24px)',
    fontSize: 12,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    // padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  menu: {
    width: 200,
  },
  button: {
    marginTop: 20,
    width: 'calc(100% - 24px)',
  },
  buttonPressed: {
    backgroundColor: 'white!important'
  },
  input: {
    fontSize: 16,
  },
  inputNone: {
    display: 'none',
  },
})

export default withStyles(STYLES, { name: 'WiRTR' })(RTR)
/* export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(withStyles(STYLES, { name: 'WiRTR' })(RTR)) */