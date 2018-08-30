import React, { Component } from 'react'
import { globalStyles, flex } from '../../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import swal from 'sweetalert'

class IngreseHojaDeVidaComponent extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign(
      { error: {msg: '', title: ''} },
      { modal: false },
      { file: { val: {}, error: false } },
      ...props.inputs.map(e => (
        { [e.ref]: Object.assign(e, { val: e.val || '', error: false }) }
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
    const keys = this.props.inputs.map(e => e.ref)
    swal({
      title: 'Enviar Hoja de Vida',
      text: '¿Estás seguro de enviar esta hoja de vida?',
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
          const errores = []
          keys.forEach(key => {
            if (
              !this.state[key] &&
              !this.state[key].val ||
              this.state[key].val === 'vacio' ||
              this.state[key].val === '' ||
              (key === 'email' && !validateEmail(this.state[key].val))
            ) {
              errores.push(this.state[key])
            }
          })
          
          if (errores.length) {
            errores.forEach(e => {
              this.setState({
                [e.ref]: Object.assign(this.state[e.ref], { error: true })
              })
            })
            swal('Por favor diligenciar los campos obligatorios.', 'Estos campos son obligatorios: ' + errores.map(e => e.label).join(', '), 'error')
            throw null
          } else {
            const values = keys.map(k => {
              let valor = this.state[k].val
              if (k === 'birthdate') {
                const arr = valor.split('-')
                arr[1] = arr[1].length === 1 ? `0${arr[1]}` : arr[1]
                valor = `${arr[2]}/${arr[1]}/${arr[0]}`
              }
              return { val: valor, key: k }
            })
            values.push({ val: this.state.file.val, key: 'file' })

            return this.props.sendCV(values)
          }
        } else {
          throw null
        }
      })
      .then(() => {
        this.emptyState()
        swal('Hoja de Vida enviada!', 'Tu Hoja de Vida ha sido enviada correctamente. Lo más pronto posible atenderemos tú solicitud.', 'success')
      })
      .catch(error => {
        swal.stopLoading()
        swal.close()
      })
  }
  handleChange = key => evt => {
    if (key === 'file') {
      if (evt.target.files[0].size < 8e+6) {
        this.setState({
          [key]: Object.assign({}, this.state[key], { val: evt.target.files[0], error: false })
        })
      } else {
        swal('El archivo excede los 8MB', 'Por favor ingrese un archivo menor a 8 MB', 'warning')
      }
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
    const { classes, /* countries */ } = this.props
    const { section: seccion, m0, container, textField, p0, menu, textCenter } = classes

    return (
      <article className={[seccion, m0, p0].join(' ')}>
        <form className={container} noValidate autoComplete="off">
          <Grid container className={container}>  
            {
            inputs.map(input => {
              const propLabel = input.type === 'date' ? ({ shrink: true, style: { fontSize: 13 } }) : ({ style: { fontSize: 13 } })
              if (!input.select) {
                return <Grid item md={6} key={input.ref} className={classes.mobileCss}><TextField
                  required
                  className={textField}
                  label={input.label}
                  type={input.type}
                  style={{ fontSize: 13 }}
                  margin="normal"
                  InputLabelProps={propLabel}
                  error={this.state[input.ref].error}
                  value={this.state[input.ref].val}
                  onChange={this.handleChange(input.ref)}
                /></Grid>
              } else {
                return <Grid item md={6} key={input.ref} className={classes.mobileCss}><TextField
                  select
                  required={true}
                  InputLabelProps={propLabel}
                  className={textField}
                  style={{ fontSize: 13 }}
                  error={this.state[input.ref].error}
                  value={this.state[input.ref].val}
                  onChange={this.handleChange(input.ref)}
                  SelectProps={{
                    MenuProps: {
                      className: menu,
                    },
                  }}
                  label={input.label}
                  margin="normal"
                >
                  <MenuItem key="vacio" value="vacio" style={{ fontSize: 13 }}>
                    {''}
                  </MenuItem>  
                  {input.items.map(option => (
                    <MenuItem key={option[input.enums[0]]} value={option[input.enums[1]]} style={{ fontSize: 13 }}>
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
                className={classes.input}
                id="raised-button-file"
                multiple={false}
                required={true}
                type="file"
                onChange={this.handleChange('file')}
              />
              <div>
                <label htmlFor="raised-button-file">
                  <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                    <Button variant="raised" component="span" className={classes.button} style={{ fontSize: 13 }}>
                      Hoja de vida
                      <Icon>attach_file</Icon>
                    </Button>
                    {this.state.file.val.name ? <small style={{ marginTop: 10 }}>{this.state.file.val.name}</small> : ''}
                  </div>
                </label>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.mobileCss}>
              <div className={[textCenter].join(' ')}>
                <Button variant="raised" color="primary" className={[classes.button, classes.mobileCss].join(' ')} onClick={this._handleSubmit}>
                  Enviar
                <Icon>near_me</Icon>
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </article>
    );
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

IngreseHojaDeVidaComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  // countries: PropTypes.array.isRequired,
  // getCountries: PropTypes.func.isRequired
}

const inputs = [
  { ref: 'names', label: 'Nombre', type: 'text' },
  { ref: 'lastnames', label: 'Apellido', type: 'text' },
  { ref: 'birthdate', label: 'Fecha de nacimiento', type: 'date' },
  { ref: 'email', label: 'Email', type: 'email' },
  { ref: 'phone', label: 'Telefono', type: 'tel' },
  {
    ref: 'profession', label: 'Nivel educativo', type: '', select: true, val: 'vacio', enums: ['name', 'id'], items: [
      { id: 'Bachiller', name: 'Bachiller' },
      { id: 'Técnico', name: 'Técnico' },
      { id: 'Técnolog', name: 'Técnolog' },
      { id: 'Profesional', name: 'Profesional' },
      { id: 'Especialista', name: 'Especialista' },
      { id: 'Magister', name: 'Magister' }
    ]
  },
  {
    ref: 'gender', label: 'Género', type: '', select: true, val: 'vacio', enums: ['name', 'id'], items: [
      { id: 'M', name: 'Masculino' },
      { id: 'F', name: 'Femenino' }
    ]
  },
]

const STYLES = theme => ({
  ...flex,
  ...globalStyles,
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
    fontSize: 13,
    '& input': {
      fontSize: 14,
    },
    '& div': {
      fontSize: 14,
    }
  },
  menu: {
    width: 200,
    fontSize: 13,
    '& input': {
      fontSize: 14,
    },
    '& select': {
      fontSize: 14,
    }
  },
  button: {
    fontSize: 14,
    height: 24,
    marginTop: 20,
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  mobileCss: {
    '&': {
      '@media (max-width: 376px)': {
        width: '100%'
      },
    },
  },
})

IngreseHojaDeVidaComponent.defaultProps = {
  inputs,
}

export default withStyles(STYLES, { name: 'HV' })(IngreseHojaDeVidaComponent)