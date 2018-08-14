import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { sendAttachData, getServices } from '../../../lib/http'
import { INITIAL_STATE_SERVICES } from '../../../redux/reducers/services'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Icon from 'material-ui/Icon'
import { globalStyles, flex } from '../../../src/styles'
import PropTypes from 'prop-types'
import Card, { CardContent } from 'material-ui/Card'
import swal from 'sweetalert'

const inputs = [
  { ref: 'name', label: 'Nombre o razón social', type: 'text' },
  { ref: 'phone', label: 'Teléfono', type: 'text' },
  { ref: 'nit', label: 'NIT', type: 'text' },
  { ref: 'country', label: 'País', type: 'text' },
  { ref: 'contactName', label: 'Nombre del contacto', type: 'text' },
  { ref: 'city', label: 'Ciudad', type: 'text' },
  { ref: 'email', label: 'Correo electrónico', type: 'text' },
  { ref: 'address', label: 'Dirección', type: 'text' },
  // { ref: 'country', label: 'País', type: '', select: true, enums: ['name', 'cioc'] },
]

class ProveedoresForm extends Component {
  state = Object.assign(
    { view: 'proveedores' },
    { cities: [] },
    { services: [] },
    { error: { msg: '', title: '' } },
    { rutFile: {} },
    { ccioFile: {} },
    { briefcaseFile: {} },
    ...inputs.map(e => (
      { [e.ref]: Object.assign(e, { val: e.val || '', error: false }) }
    ))
  )
  
  _handleSubmit = evt => {
    swal({
      title: 'Te suscribiras como Proveedor',
      text: '¿Estás seguro de enviar estos datos para suscribirte?',
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
          const keys = this.props.inputs.map(e => e.ref).concat(['rutFile', 'ccioFile', 'briefcaseFile'])
          const errores = []
          if (this.state.services.length < 1) {
            errores.push({ ref: 'services', label: 'Servicios' })
          }
          keys.forEach(key => {
            if (key.includes('File')) {
              if (!this.state[key].name) {
                switch (key) {
                  case 'rutFile':
                    errores.push({ label: 'Archivo RUT' })
                    break;
                  case 'ccioFile':
                    errores.push({ label: 'Archivo Cámara de Comercio' })
                    break;
                  case 'briefcaseFile':
                    errores.push({ label: 'Archivo Portafolio' })
                    break;
                  default:
                    break;
                }
              }
            } else {
              if (!this.state[key].val || this.state[key].val === 'vacio' || this.state[key].error === true) {
                console.log('----------->', this.state, key, this.state[key])
                errores.push(this.state[key])
              }              
            }
          })

          if (errores.length) {
            errores.forEach(e => {
              console.log(e, '=>e')
              if (e.label && (e.label === 'Servicios')) {
              } else {
                this.setState({
                  [e.ref]: Object.assign({}, this.state[e.ref], { error: true })
                })
              }
            })
            const err = errores.map(e => {
              if (e.label === 'Servicios') {
                return 'Debe marcar al menos un servicio'
              }
              return e.label
            }).join(', ')

            swal('Por favor diligenciar los campos obligatorios.', `Estos campos son obligatorios: ${err}`, 'error')
            throw null
          } else {
            const values = keys.map(key => {
              let val
              if (key.includes('File')) {
                val = this.state[key]
              } else {
                val = this.state[key].val
              }
              return { val, key }
            })
            values.push({ val: this.state.services, key: 'services' })
            return this.props.sendService(values)
          }
        } else {
          throw null
        }
      })
      .then(() => {
        this.emptyState()
        swal('Proveedor registrado!', 'Proveedor registrado exitosamente, lo más pronto posible nos pondremos en contacto.', 'success')
        .then(() => {
          location.reload()
        })
      })
      .catch(error => {
        if (error) {
          swal(error.message, error.detail, 'error')
        }
        swal.stopLoading()
        swal.close()
      })
  }
  handleCheck = id => evt => {
    let services = [...this.state.services]
    if (services.includes(id)) {
      services = services.filter(e => e != id)
    } else {
      services.push(id)
    }
    this.setState({ services })
  }  
  handleChange = key => evt => {
    if (key.includes('ile')) {
      this.setState({
        [key]: evt.target.files[0]
      })
    } else {
      if (key === 'email') {
        this.setState({
          [key]: Object.assign(this.state[key], { val: evt.target.value, error: !validateEmail(evt.target.value) })
        })
      } else {
        this.setState({
          [key]: Object.assign(this.state[key], { val: evt.target.value, error: false })
        })
      }
    }
  }
  emptyState = () => {
    const checks = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checks.length; i++) {
      const check = checks[i]
      if (!check.disabled) {
        check.checked = false
      }
    }
    this.setState({ services: [] })
    const news = this.props.inputs.map(e => (
      { [e.ref]: { val: e.val || '', error: false } }
    ))
    this.setState(Object.assign(...news))
  }
  
  componentWillMount() {
    this.props.getServices()
  }
  
  render() {
    const { classes } = this.props
    const { container, textFieldCaso } = classes
    return (
      <form className={container} noValidate autoComplete="off">
        <Grid container className={container}>
          <Grid item md={12}>
            <h4 className={[classes.h4, classes.textCenter].join(' ')}><strong>Información básica</strong></h4>
          </Grid>  
          {
            inputs.map(input => {
              return (
                <Grid item md={6} key={input.ref} className={classes.mobileCss}>
                  <TextField
                    InputProps={{
                      disableUnderline: true,
                      className: classes.bootstrapFormLabel,
                    }}
                    InputLabelProps={{
                      shrink: true,
                      className: classes.bootstrapFormLabel,
                    }}
                    className={[textFieldCaso, classes.bootstrapRoot].join(' ')}
                    label={input.label}
                    type={input.type}
                    required
                    // margin="normal"
                    value={this.state[input.ref].val}
                    error={this.state[input.ref].error}
                    onChange={this.handleChange(input.ref)}
                  />
                </Grid>
              )
            })
          }
          <Grid item md={12} className={classes.mobileCss}>
            <h4 className={[classes.h4, classes.textCenter].join(' ')}><strong>¿Qué tipo de servicio o producto suministra?</strong></h4>
          </Grid>
          {
            this.props.services.map(e => {
              if (e.active) {
                return (
                  <Card className={[classes.card, classes.mobileCss].join(' ')}>
                    <CardContent>
                      <Grid container className={[container, classes.mobileCss].join(' ')}>
                        <Grid item md={12} className={classes.mobileCss}>
                          <h5 className={[classes.h5, classes.textCenter].join(' ')}><strong>{e.description}</strong></h5>
                        </Grid>
                        {
                          e.services.map(i => {
                            if (i.active) {
                              return <Grid item md={4} style={{ margin: '5px 0' }} className={classes.mobileCss}>
                                <label style={{ fontSize: 13 }}><input type="checkbox" id={`${i.id}`} name={`${i.id}`} onChange={this.handleCheck(i.id)}/> {i.description}</label>
                              </Grid>
                            } else {
                              return
                            }
                          })
                        }
                      </Grid>
                    </CardContent>
                  </Card>      
                )
              } else {
                return
              }
            })
          }
          {
            ['rutFile', 'ccioFile', 'briefcaseFile'].map(inp => (
              <Grid item md={6} className={classes.mobileCss}>
                <input
                  accept="application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className={classes.input}
                  id={`raised-button-${inp}`}
                  type="file"
                  onChange={this.handleChange(inp)}
                />
                <label htmlFor={`raised-button-${inp}`}>
                  <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                    <Button variant="raised" component="span" className={classes.button} style={{ fontSize: 13 }}>
                      {inp === 'rutFile' ? 'Adjuntar RUT' : inp === 'ccioFile' ? ' Cámara de Comercio': 'Portafolio'}
                      <Icon style={{ fontSize: 15 }}>attach_file</Icon>
                    </Button>
                    {this.state[inp].name ? <small style={{ marginTop: 10 }}>{this.state[inp].name}</small> : ''}
                  </div>
                </label>
              </Grid>
            ))
          }
          <Grid item md={12} className={classes.mobileCss}>
            <div className={[].join(' ')}>
              <Button variant="raised" color="primary" className={classes.button} onClick={this._handleSubmit}>
                Enviar
                  <Icon>near_me</Icon>
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const STYLES = theme => ({
  ...flex,
  ...globalStyles,
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
    margin: 5,
    padding: 0,
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
    fontSize: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    marginTop: 20,
    width: 'calc(100% - 24px)',
  },
  input: {
    display: 'none',
  },
  card: {
    marginBottom: 10,
  }
})

const mapDispatchToProps = dispatch => ({
  getServices: () => dispatch(getServices()),
  sendService: data => dispatch(sendAttachData('/supplier/register', data)),
})

const mapStateToProps = (state = { services: INITIAL_STATE_SERVICES }) => ({
  services: state.services.data,
})

ProveedoresForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

ProveedoresForm.defaultProps = {
  inputs,
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(STYLES, { name: 'WiProveedoresForm' })(ProveedoresForm))