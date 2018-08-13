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
import { sendAttachData } from '../../lib/http'
import swal from 'sweetalert'

class PQRs extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign(
      { error: { msg: '', title: '' } },
      { files: { val: [{}], error: false, req: false } },
      ...props.inputs.map(e => (
        { [e.ref]: Object.assign(e, { val: e.val || '', error: false })}
      ))
    )
  }
  emptyState = () => {
    const keys = [...this.props.inputs]
    keys.forEach(e => {
      if (e.select) {
        this.setState({
          [e.ref]: Object.assign(e, { val: 'vacio', error: false })
        })
      } else {
        this.setState({
          [e.ref]: Object.assign(e, { val: '', error: false })
        })
      }
    })
  }
  _handleSubmit = () => {
    swal({
      title: 'Vas a enviar una PQR?',
      text: 'Estas seguro de enviar esta PQR?',
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
          if (this.state.email.val && !validateEmail(this.state.email.val)) {
            errores.push(Object.assign({ label: 'email' }, this.state.email))
          }
          if (errores.length) {
            swal('Por favor diligenciar los campos obligatorios.', 'Estos campos son obligatorios: ' + errores.map(e => e.label).join(', '), 'error')
            errores.forEach(e => {
              this.setState({
                [e.ref]: Object.assign(this.state[e.ref], { error: true })
              })
            })
            throw null
          } else {
            const values = keys.map(k => ({ val: this.state[k].val, key: k }))
            values.push({ val: this.state.files.val, key: 'files' })
            return this.props.sendPQR(values)
          }
        } else {
          throw null
        }
      })
      .then(() => {
        this.emptyState()
        swal('PQR enviado', 'PQR enviado correctamente', 'success')
      })
      .catch(error => {
        swal.stopLoading()
        swal.close()
      })
  }


  handleChange = key => evt => {
    if (key === 'files') {
      this.setState({
        [key]: { val: evt.target.files, error: false }
      })
    } else {
      let error = false
      let msgError = ''
      if (key === 'email') {
        error = !validateEmail(evt.target.value)
        msgError = 'Email inválido'
      }
      this.setState({
        [key]: Object.assign({}, this.state[key], { val: evt.target.value, error, msgError })
      })
    }
  }
  
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, textCenter, menu, textFieldCaso } = classes
    
    return (
      <section className={[seccion, m0].join(' ')}>
        <Grid container className={container}>
          <Grid item xs={12}>
            <h3 className={[classes.h3, textCenter].join(' ')} style={{ textTransform: 'uppercase' }}><strong>Ingresa aquí tu duda queja o reclamo</strong></h3>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item md={10} className={classes.mobileCss}>
            <form className={[container, classes.mobileCss].join(' ')} noValidate autoComplete="off">
              <Grid container className={[container, classes.mobileCss].join(' ')}>  
                {
                  inputs.map(input => {
                    if (!input.select) {
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
                    } else {
                      return <Grid item md={6} key={input.ref} className={classes.mobileCss}><TextField
                        InputProps={{
                          disableUnderline: true,
                          style: { fontSize: 16 }
                        }}
                        InputLabelProps={{
                          shrink: true,
                          className: classes.bootstrapFormLabel,
                        }}
                        select
                        required
                        className={[textFieldCaso, classes.bootstrapRoot, classes.input].join(' ')}
                        value={this.state[input.ref].val}
                        error={this.state[input.ref].error}
                        onChange={this.handleChange(input.ref)}
                        SelectProps={{
                          MenuProps: {
                            className: menu,
                          },
                        }}
                        label={input.label}
                        margin="normal"
                      >
                        <MenuItem key="vacio" value="vacio" style={{ fontSize: 16 }}>
                          {''}
                        </MenuItem>
                        {input.items.map(option => (
                          <MenuItem key={option[input.enums[0]]} value={option[input.enums[1]]} style={{ fontSize: 16 }}>
                            {option[input.enums[0]]}
                          </MenuItem>
                        ))}
                      </TextField></Grid>
                    }
                  })
                }
                <Grid item md={6} className={classes.mobileCss}>
                  <input
                    accept="application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className={classes.inputNone}
                    id="raised-button-file"
                    multiple={true}
                    type="file"
                    onChange={this.handleChange('files')}
                  />
                  <label htmlFor="raised-button-file">
                    <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                      <Button variant="raised" component="span" className={classes.button} style={{ fontSize: 15 }}>
                        Adjuntar Archivo 
                        <Icon style={{ fontSize: 16, marginLeft: 5 }}>attach_file</Icon>
                      </Button>
                      {this.state.files.val[0] && this.state.files.val[0].name ? <span style={{ marginTop: 10 }}>Los archivos adjuntos son: <small>{Array.from(this.state.files.val).map(i => i.name).join(', ')}</small></span> : ''}
                    </div>
                  </label>
                </Grid>
                <Grid item md={6} className={classes.mobileCss}>
                  <div className={[].join(' ')}>
                    <Button variant="raised" color="primary" style={{ fontSize: 15 }} className={[classes.button, classes.mobileCss].join(' ')} onClick={this._handleSubmit}>
                      Enviar 
                      <Icon style={{ fontSize: 16, marginLeft: 5 }}>near_me</Icon>
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

PQRs.propTypes = {
  classes: PropTypes.object.isRequired,
}

const inputs = [
  { ref: 'names', label: 'Nombres', type: 'text', req: true },
  { ref: 'lastnames', label: 'Apellidos', type: 'text', req: true },
  { ref: 'identification', label: 'Cédula', type: 'text', req: true },
  { ref: 'usercode', label: 'Código de usuario', type: 'text', req: false },
  { ref: 'notificationaddress', label: 'Dirección notificación', type: 'text', req: true },
  { ref: 'address', label: 'Dirección del predio', type: 'text', req: false },
  { ref: 'city', label: 'Ciudad', type: 'text', req: true },
  { ref: 'neighborhood', label: 'Barrio', type: 'text', req: true },
  { ref: 'email', label: 'Email', type: 'email', req: false },
  { ref: 'phone', label: 'Teléfono', type: 'tel', req: true },
  { ref: 'issue', label: 'Asunto', type: 'text', req: true },
  {
    ref: 'situation', label: 'Situación', type: '', req: true , select: true, val: 'vacio', enums: ['name', 'id'], items: [
      { id: 'A', name: 'Arrendatario' },
      { id: 'P', name: 'Propietario' },
      { id: 'O', name: 'Otro' },
    ]
  },
  { ref: 'description', label: 'Caso', type: 'text', req: true },
  // { ref: 'country', label: 'País', type: '', select: true, enums: ['name', 'cioc'] },
]
PQRs.defaultProps = {
  inputs,
}
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const mapDispatchToProps = dispatch => ({
  sendPQR: (data, cb) => dispatch(sendAttachData('pqr/create', data, cb))
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
    fontSize: 14
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

// export default withStyles(STYLES, { name: 'WiPQRs' })(PQRs)
export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(withStyles(STYLES, { name: 'WiPQRs' })(PQRs))