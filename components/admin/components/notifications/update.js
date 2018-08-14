import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Input, { InputLabel } from 'material-ui/Input'
import FormControl from 'material-ui/Form/FormControl'
import FormControlLabel from 'material-ui/Form/FormControlLabel'
import Switch from 'material-ui/Switch'
// import HtmlField from 'material-ui-html-field'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import { globalStyles, flex } from '../../../../src/styles'
import Grid from 'material-ui/Grid'
import { updateService } from '../../../../lib/http'
import { formatDateGuion } from '../../../../lib/utils'
import { connect } from 'react-redux'
import Router from 'next/router'
import swal from 'sweetalert'
import { INITIAL_STATE_NOTIFICATIONS } from '../../../../redux/reducers/notifications'

const fields = {
  id: { val: '', error: false, label: 'Fecha Acto', type: 'txt' },
  active: { val: true, error: false, label: 'Activado', type: 'checkbox' },
  actDate: { val: '', error: false, label: 'Fecha Acto', type: 'date' },
  radicationNumber: { val: '', error: false, label: 'Número de radicación', type: 'text' },
  applicantPerson: { val: '', error: false, label: 'Solicitante', type: 'text' },
  issuedPerson: { val: '', error: false, label: 'Expidió', type: 'text' },
  file: { val: {}, error: false, label: 'Archivo', type: 'file' },
  fileUrl: { val: '', error: false, label: 'Archivo', type: 'text' },
}

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

class UpdateNotify extends React.Component {
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

  componentDidMount () {
    const notify = this.props.notifications.filter(u => u.id === this.props.id)[0]
    notify.actDate = formatDateGuion(notify.actDate)
    const noty = Object.assign({}, ...Object.keys(fields).map(key => ({ [key]: Object.assign({}, fields[key], { val: notify[key] }) })))
    this.setState(noty)
  }
  

  updateNotify = () => {
    swal({
      title: 'Va a actualizar una notificación',
      text: '¿Está seguro de actualizar esta notificación?',
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
          const keys = Object.keys(fields).filter(k => !k.includes('file'))
          let errores = keys.filter(key => {
            if (this.state[key].val === '') {
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
            if (this.state.file.val && this.state.file.val.name) {
              values.push({ key: 'file', val: this.state.file.val })
            }
            return this.props.updateService(values)
          }
        } else {
          throw null
        }
      })
      .then(() => {
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
  goBack = () => {
    Router.push('/admin?page=notifications&view=list', '/admin/notifications/list')
  }
  render() {
    const { classes } = this.props
    const nameFile = this.state.file.val && this.state.file.val.name ? this.state.file.val.name : this.state.fileUrl.val
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            title={<Typography className={classes.title} color="textSecondary">Editar la notificación {this.state.radicationNumber.val}</Typography>}
            action={
              <Tooltip
                title={`Volver a la lista`}
                enterDelay={30}
              >
                <IconButton onClick={this.goBack}>
                  <Icon>keyboard_backspace</Icon>
                </IconButton>
              </Tooltip>
            }
          />  
          <CardContent>
            <Grid container className={classes.container}>
              {
                Object.keys(this.state).map(key => {
                  if (!key.includes('file') && key !== 'id' && key !== 'active') {
                    return <Grid item key={key} md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                      <InputLabel htmlFor={fields[key].label} style={{ fontSize: 13 }}>{fields[key].label}</InputLabel>
                      <Input
                        id={fields[key].label}
                        require={true}
                        type={fields[key].type}
                        style={{ fontSize: 13, width: '95%' }}
                        value={this.state[key].val}
                        error={this.state[key].error}
                        onChange={this.handleChange(key)}
                      />
                    </Grid>
                  } else if (key === 'active') {
                    return <Grid item key={key} md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                      <FormControl fullWidth className={classes.margin} autoComplete="off">
                        <FormControlLabel
                          style={{ fontSize: 14 }}
                          control={
                            <Switch
                              checked={this.state.active.val}
                              style={{ fontSize: 14 }}
                              onChange={() => this.setState({ active: Object.assign({}, this.state.active, { val: !this.state.active.val }) })}
                              value={`Activa? ${this.state.active.val ? 'Si' : 'No'}`}
                              color="primary"
                            />
                          }
                          label={`Activa? ${this.state.active.val ? 'Si' : 'No'}`}
                        />
                      </FormControl>
                    </Grid>
                  } else {
                    return ''
                  }
                })
              }
              <Grid item md={6} className={[classes.mt4, classes.flex, classes.justifyContentCenter].join(' ')}>
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
                    <Button variant="raised" component="span" className={classes.button} style={{ fontSize: 10, width: '85%' }}>
                      Adjuntar Archivo
                    <Icon>attach_file</Icon>
                    </Button>
                    {nameFile ? <small className={classes.mt3}>{nameFile}</small> : ''}
                  </div>
                </label>
              </Grid>
              <Grid item xs={12} className={[classes.mt4, classes.flex, classes.justifyContentCenter].join(' ')}>
                <Button id="button" variant="raised" color="primary" className={classes.button} onClick={this.updateNotify}>
                  Actualizar notificación
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}

UpdateNotify.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateService: d => dispatch(updateService('/notification/update', d)),
})

const mapStateToProps = (state = { notifications: INITIAL_STATE_NOTIFICATIONS }) => ({
  notifications: state.notifications.data
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, name: 'EditNotifyAdmin' })(UpdateNotify))