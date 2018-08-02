import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Input, { InputLabel } from 'material-ui/Input'
// import HtmlField from 'material-ui-html-field'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { globalStyles, flex } from '../../../../src/styles'
import Grid from 'material-ui/Grid'
import { createService } from '../../../../lib/http'
import { connect } from 'react-redux'
import Router from 'next/router'
import { validarFormatoFecha, existeFecha } from '../../../../lib/utils'
import swal from 'sweetalert'

const fields = {
  actDate: { val: '', error: false, label: 'Fecha Acto', type: 'date' },
  radicationNumber: { val: '', error: false, label: 'Número de radicación', type: 'text' },
  applicantPerson: { val: '', error: false, label: 'Solicitante', type: 'text' },
  issuedPerson: { val: '', error: false, label: 'Expidió', type: 'text' },
  file: { val: {}, error: false, label: 'Archivo', type: 'file' },
}

class CreateNotifications extends React.Component {
  state = Object.assign({}, fields)

  handleChange = prop => event => {
    if (prop === 'actDate') {
      if (validarFormatoFecha(event.target.value) && existeFecha(event.target.value)) {
        this.setState({ [prop]: Object.assign(this.state[prop], { val: event.target.value }) })
      } else {
        swal('Campos de la fecha incorrectos', 'La fecha debe ser válida y mayor a la fecha actual', 'error')
      }
    } else {
      this.setState({ [prop]: Object.assign(this.state[prop], { val: event.target.value }) })
    }
  }
  // Router.push('/admin?page=users&view=list', '/admin/users/list')
  createNotification = () => {
    swal({
      title: 'Va a publicar una notificación',
      text: '¿Está seguro de publicar esta notificación?',
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
      .then(result => {
        if (result) {
          const keys = Object.keys(fields) // ['radicationNumber', 'applicantPerson', 'issuedPerson']
          let errores = keys.filter(key => {
            if (this.state[key].val === '' || (typeof this.state[key].val === 'object' && !this.state[key].val.name)) {
              return true
            }
            return false
          })
          if (errores.length) {
            this.setState(Object.assign(...errores.map(field => ({ [field]: Object.assign({}, this.state[field], { error: true }) }))))
            swal('Debe rellenar todos los campos.', 'Estos campos son obligatorios: ' + errores.map(e => fields[e].label).join(', '), 'error')
            throw null
          } else {
            const values = keys.map(key => {
              let val = this.state[key].val
              if (fields[key] && fields[key].type === 'date') {
                const arr = val.split('-')
                arr[1] = arr[1].length === 1 ? `0${arr[1]}` : arr[1]
                val = `${arr[2]}/${arr[1]}/${arr[0]}`
              }
              return { val, key }
            })
            return this.props.createService(values)
          }
        } else {
          throw null
        }
      })
      .then(() => {
        this.clear()
        return swal('Notificación creada con éxito', 'La Notificación fue creada con éxito', 'success')
      })
      .then(() => {
        Router.push(`/admin?page=notifications&view=list`, `/admin/notifications`)
      })
      .catch(error => {
        if (error) {
          swal(error.message, error.detail, 'error')
        }
        swal.stopLoading()
        swal.close()
      })
  }
  clear = () => {
    this.setState(Object.assign({}, fields))
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">Crea un nuevo Usuario</Typography>
            <Grid container className={classes.container}>
              {
                Object.keys(fields).map(key => {
                  if (key !== 'file') {
                    return <Grid item key={key} md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                      <InputLabel style={{ fontSize: 13 }} htmlFor={fields[key].label}>{fields[key].label}</InputLabel>
                      <Input
                        required={true}
                        id={fields[key].label}
                        value={this.state[key].val}
                        type={fields[key].type}
                        error={this.state[key].error}
                        style={{ fontSize: 13, width: '95%' }}
                        onChange={this.handleChange(key)}
                      />
                    </Grid>
                  } else {
                    return ''
                  }
                })
              }
              <Grid item md={4} className={[classes.mt4, classes.flex, classes.justifyContentCenter].join(' ')}>
                <input
                  accept="application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={evt => {
                    const file = evt.target.files[0]
                    if (file) {
                      this.setState({ file: Object.assign({}, this.state.file, { val: file }) })
                    }
                  }}
                />
                <label htmlFor="raised-button-file">
                  <div style={{ display: 'flex', flexFlow: 'column wrap', fontSize: 13 }}>
                    <Button variant="raised" component="span" className={classes.button} style={{ fontSize: 10, width: '100%' }}>
                      Adjuntar Archivo
                    <Icon>attach_file</Icon>
                    </Button>
                    {this.state.file.val.name ? <small className={classes.mt3}>{this.state.file.val.name}</small> : ''}
                  </div>
                </label>
              </Grid>
              <Grid item xs={12} className={[classes.mt4, classes.flex, classes.justifyContentCenter].join(' ')}>
                <Button id="button" variant="raised" color="primary" className={classes.button} onClick={this.createNotification}>
                  Crear notificación
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>  
      </div>
    )
  }
}

CreateNotifications.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  createService: d => dispatch(createService('/notification/create', d)),
})

// const mapStateToProps = (state = { modal: INITIAL_STATE_MODAL }) => ({
//   modal: state.modal
// })

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    minWidth: '95%',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  menu: {
    fontSize: 14,
  },
  textField: {
    fontSize: 14,
    marginTop: 0,
    '& select': {
      fontSize: 14,
    }
  },
  ...globalStyles, ...flex
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, name: 'CreateUserAdmin' })(CreateNotifications))