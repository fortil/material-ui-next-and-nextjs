import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Typography from 'material-ui/Typography'
import { globalStyles, flex } from '../../../../src/styles'
import Grid from 'material-ui/Grid'
import { createPurchase } from '../../../../lib/http'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { evaluateAllFechas } from '../../../../lib/utils'
import Router from 'next/router'

const fields = {
  publicationDate: { val: '', error: false, type: 'date', label: 'Fecha de publicación' },
  expirationDate: { val: '', error: false, type: 'date', label: 'Fecha de expiración' },
  object: { val: '', error: false, type: 'text', label: 'Objeto del proceso'},
  email: { val: '', error: false, type: 'email', label: 'Email' },
}

class CreatePurchase extends React.Component {
  state = Object.assign({ file: { val: {}, error: false } }, fields)

  handleChange = prop => event => {
    if (prop === 'publicationDate' || prop === 'expirationDate') {
      if (evaluateAllFechas(event.target.value)) {
        this.setState({ [prop]: Object.assign(this.state[prop], { val: event.target.value }) })
      } else {
        swal('Campos de la fecha incorrectos', 'La fecha debe ser válida y mayor a la fecha actual', 'error')
      }
    } else {
      this.setState({ [prop]: Object.assign(this.state[prop], { val: event.target.value }) })
    }
  }

  createPurchase = () => {

    swal({
      title: 'Va a publicar una compra',
      text: '¿Está seguro de publicar esta compra?',
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
          const keys = Object.keys(fields).concat('file')
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
            return this.props.createPurchase(values)
          }
        } else {
          throw null
        }
      })
      .then(() => {
        this.clear()
        return swal('Noticia creada con éxito', 'La noticia fue creada con éxito', 'success')
      })
      .then(() => {
        Router.push(`/admin?page=purchase&view=list`, `/admin/purchase`)
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
    this.setState(Object.assign({}, { file: { val: {}, error: false } }, fields))
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">Crea un nuevo Proceso de Compra</Typography>
            <Grid container className={classes.container}>
              {
                Object.keys(fields).map(field => (
                  <Grid item md={4} key={field} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                    <InputLabel style={{ fontSize: 13 }} htmlFor={field}>{this.state[field].label}</InputLabel>
                    <Input
                      required={true}
                      type={fields[field].type}
                      id={field}
                      style={{ fontSize: 15, width: '95%' }}
                      error={this.state[field].error}
                      value={this.state[field].val}
                      onChange={this.handleChange(field)}
                    />
                  </Grid>
                ))
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
                      this.setState({ file: Object.assign(this.state.file, { val: file }) })
                    }
                  }}
                />
                <label htmlFor="raised-button-file">
                  <div style={{ display: 'flex', flexFlow: 'column wrap', fontSize: 13 }}>
                    <Button variant="raised" component="span" className={classes.button} style={{ fontSize: 10, width: '100%' }}>
                      Adjuntar Archivo
                    <Icon>attach_file</Icon>
                    </Button>
                    {this.state.file.val.name ? <small>{this.state.file.val.name}</small> : ''}
                  </div>
                </label>
              </Grid>
              <Grid item xs={12} className={[classes.mt4, classes.flex, classes.justifyContentCenter].join(' ')}>
                <Button id="button" variant="raised" color="primary" className={classes.button} onClick={this.createPurchase}>
                  Crear Compra
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}

CreatePurchase.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  createPurchase: d => dispatch(createPurchase(d)),
})

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
  button: {
    marginTop: 20,
    width: 'calc(100% - 24px)',
  },
  ...globalStyles, ...flex
})
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, name: 'CreatePurchaseAdmin' })(CreatePurchase))