import React, { Component } from 'react'
import { connect } from 'react-redux'
import { globalStyles, flex, nosotros } from '../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import { createRTR } from '../../lib/http'
import swal from 'sweetalert'

class RTR extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign(
      { error: { msg: '', title: '' } },
      ...props.inputs.map(e => (
        { [e.ref]: Object.assign(e, { val: e.val || '', error: false })}
      ))
    )
  }
  emptyState = () => {
    const keys = [...this.props.inputs]
    keys.forEach(e => {
      this.setState({
        [e.ref]: Object.assign(e, { val: '', error: false })
      })
    })
  }
  _handleSubmit = () => {
    swal({
      title: 'Hará una petición RTR?',
      text: 'Está apunto de solicitar una Revisión Técnica Reglamentaria?',
      type: 'warning',
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Aceptar",
          value: true,
          visible: true,
          closeModal: false
        }
      }
    })
      .then((result) => {
        if (result) {
          const keys = this.props.inputs.map(e => e.ref)
          const errores = [];
          keys.forEach(key => {
            if ((!this.state[key].val || this.state[key].val === 'vacio') && this.state[key].req === true) {
              errores.push(this.state[key])
            }
          })
          if (errores.length) {
            swal('Debe rellenar todos los campos.', 'Estos campos son obligatorios: ' + errores.map(e => e.label).join(', '), 'error')
            errores.forEach(e => {
              this.setState({
                [e.ref]: Object.assign(this.state[e.ref], { error: true })
              })
            })
            throw null
          } else {
            const values = Object.assign({}, ...keys.map(k => ({ [k]: this.state[k].val })))
            return this.props.sendRTR(values)
          }
        } else {
          throw null
        }
      })
      .then(() => {
        this.emptyState()
        swal('Revisión técnica creada (RTR) con éxito!', 'Ha solicitado una revisión técnica, nos pondremos en contacto lo más pronto posible!!', 'success')
      })
      .catch(error => {
        if (error) {
          swal(error.message, error.detail, 'error')
        } else {
          swal.stopLoading()
          swal.close()
        }
      })
  }


  handleChange = key => evt => {
    let error = false
    let msgError = ''
    if (key === 'email') {
      error = !validateEmail(evt.target.value)
      msgError = 'Email inválido'
    }
    this.setState({
      [key]: { val: evt.target.value, error, msgError }
    })
  }
  
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, textCenter, textFieldCaso } = classes
    
    return (
      <section className={[seccion, m0].join(' ')}>
        <Grid container className={container}>
          <Grid item xs={12}>
            <h3 className={[classes.h3, textCenter].join(' ')} style={{ textTransform: 'uppercase' }}><strong>Pida aquí su Revisión Técnica Reglamentaria (RTR)</strong></h3>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item md={10} className={classes.mobileCss}>
            <form className={[container, classes.mobileCss].join(' ')} noValidate autoComplete="off">
              <Grid container className={[container, classes.mobileCss].join(' ')}>  
                {
                  inputs.map(input => {
                    return <Grid item md={input.ref === 'description' ? 12 : 6} key={input.ref} className={classes.mobileCss}><TextField
                      InputProps={{
                        disableUnderline: true,
                        classes: {
                          input: classes.input
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                        className: classes.bootstrapFormLabel,
                      }}
                      className={[textFieldCaso, classes.bootstrapRoot].join(' ')}
                      multiline={input.ref === 'description' ? true : false}
                      label={input.label}
                      required={input.req}
                      margin="normal"
                      value={this.state[input.ref].val}
                      error={this.state[input.ref].error}
                      onChange={this.handleChange(input.ref)}
                    /></Grid>
                  })
                }
                <Grid item md={12} className={classes.mobileCss}>
                  <div className={[].join(' ')}>
                    <Button variant="raised" color="primary" className={[classes.button, classes.mobileCss].join(' ')} onClick={this._handleSubmit}>
                      Solicitar Revisión
                      <Icon>near_me</Icon>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
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

const inputs = [
  { ref: 'names', label: 'Nombres', type: 'text', req: true },
  { ref: 'lastNames', label: 'Apellidos', type: 'text', req: true },
  { ref: 'identification', label: 'Cédula', type: 'text', req: true },
  { ref: 'usercode', label: 'Código de usuario', type: 'text', req: true },
  { ref: 'address', label: 'Dirección', type: 'text', req: false },
  { ref: 'city', label: 'Ciudad', type: 'text', req: true },
  { ref: 'email', label: 'Email', type: 'email', req: false },
  { ref: 'mobile', label: 'Celular', type: 'tel', req: true },
  { ref: 'phone', label: 'Telefono', type: 'tel', req: false },
  { ref: 'authorizedPersonName', label: 'Persona Autorizada', type: 'text', req: false },
  { ref: 'authorizedPersonPhone', label: 'Contacto Persona Autorizada', type: 'text', req: false },
  { ref: 'message', label: 'Mensaje', type: 'text', req: true },
  // { ref: 'country', label: 'País', type: '', select: true, enums: ['name', 'cioc'] },
]
RTR.defaultProps = {
  inputs,
}
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const mapDispatchToProps = dispatch => ({
  sendRTR: data => dispatch(createRTR(data))
})

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

// export default withStyles(STYLES, { name: 'WiRTR' })(RTR)
export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(withStyles(STYLES, { name: 'WiRTR' })(RTR))