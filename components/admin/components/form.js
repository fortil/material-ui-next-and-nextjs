import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Input, { InputLabel } from 'material-ui/Input'
import TextField from 'material-ui/TextField'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { globalStyles, flex } from '../../../src/styles'
import { getColumns } from '../../../lib/utils'
import Grid from 'material-ui/Grid'
import Router from 'next/router'
import swal from 'sweetalert'

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

class FormAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign(
      { inputs: props.inputs },
      ...props.inputs.map(input => {
        return {
          [input.name]: Object.assign({}, { value: input.value || '', error: false }, input)
        }
      })
    )
  }
  componentWillReceiveProps({ inputs }) {
    if (inputs) {
      this.setState({ inputs })
    }
  }
  
  handleChange = prop => event => {
    const value = event.target.value
    let error = false
    if (this.state[prop].hasOwnProperty('validate')) {
      error = this.state[prop].validate.reduce((prev, validateFn) =>
        !validateFn(value) || prev,
        false)
    }
    this.setState({
      [prop]: Object.assign({}, this.state[prop], { value, error })
    })
  }
  createAction = () => {
    const { redirect } = this.props
    const { inputs } = this.state

    const inputsEmptys = inputs.filter(input => {
      const value = this.state[input.name].value
      if (input.hasOwnProperty('validate')) {
        return input.validate.reduce((prev, validateFn) => !validateFn(value) || prev, false)
      } else {
        return value !== 0 && !value
      }
    })

    if (inputsEmptys.length) {
      const inputsError = Object.assign(
        {},
        ...inputsEmptys.map(input => ({
          [input.name]: Object.assign({}, { error: true }, input)
        }))
      )
      this.setState(inputsError)
      swal('Rellene todos los campos', 'Es obligatorio llenar todos los campos', 'warning')
    } else {
      const inputsToCreate = Object.assign(
        {},
        ...inputs.map(input => ({
          [input.name]: this.state[input.name].value
        }))
      )
      this.props.actions.createFn(inputsToCreate)
        .then(() => {
          const inputsToCreateEmpty = Object.assign(
            {},
            ...inputs.map(input => ({
              [input.name]: Object.assign({}, { value: '', error: false }, input)
            }))
          )
          this.setState(inputsToCreateEmpty)
          if (redirect) {
            Router.push(redirect.url, redirect.path)
          }
        })
        .catch(error => {
          swal(error.message, error.detail, 'error')
        })
    }
  }

  render() {
    const { classes, title, botonlabel } = this.props
    const inputs = this.state.inputs

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color='textSecondary'>{title}</Typography>
            <Grid container className={classes.container}>
              {inputs.map((input, i, array) => {
                const md = getColumns(array.length)
                if (input.type === 'file') {
                  return <Grid key={i} item md={md} className={[classes.mt4, classes.flex, classes.justifyContentCenter].join(' ')}>
                    <input
                      accept='application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                      style={{ display: 'none' }}
                      id='raised-button-file'
                      type='file'
                      onChange={evt => {
                        const file = evt.target.files[0]
                        if (file) {
                          this.handleChange(input.name)({ target: { value: file } })
                        }
                      }}
                    />
                    <label htmlFor='raised-button-file'>
                      <div style={{ display: 'flex', flexFlow: 'column wrap', fontSize: 13 }}>
                        <Button variant='raised' component='span' className={classes.button} style={{ fontSize: 10, width: '100%' }}>
                          Adjuntar Archivo
                          <Icon>attach_file</Icon>
                        </Button>
                        {this.state[input.name].value ? <small className={classes.mt3}>{this.state[input.name].value.name}</small> : ''}
                      </div>
                    </label>
                  </Grid>
                } else if (input.type === 'select') {
                  return <Grid key={i} item md={md} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                    <InputLabel htmlFor={input.name} style={{ fontSize: 13 }}>
                      {input.icon ? <Icon>{input.icon}</Icon> : ''}{input.label}
                    </InputLabel>
                    <TextField
                      id={input.name}
                      select
                      className={classes.textField}
                      value={this.state[input.name].value}
                      onChange={this.handleChange(input.name)}
                      style={{ fontSize: 13, width: '95%' }}
                      SelectProps={{
                        native: true,
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin='none'
                      error={this.state[input.name].error}
                    >
                      <option value='' style={{ fontSize: 13 }}></option>
                      {input.choices && input.choices.length ? input.choices.map((option, i) => (
                        <option key={i} value={option.value} style={{ fontSize: 13 }}>
                          {option.label}
                        </option>
                      )) : ''}
                    </TextField>
                  </Grid>
                } else {
                  return <Grid key={i} item md={md} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                    <InputLabel style={{ fontSize: 13 }} htmlFor={input.name}><Icon>{input.icon}</Icon>{input.label}</InputLabel>
                    <Input
                      id={input.name}
                      value={this.state[input.name].value}
                      style={{ fontSize: 13, width: '95%' }}
                      onChange={this.handleChange(input.name)}
                      error={this.state[input.name].error}
                    />
                  </Grid>
                }
              })}
              <Grid item xs={12} className={[classes.mt4, classes.flex, classes.justifyContentCenter].join(' ')}>
                <Button id='button' variant='raised' color='primary' className={classes.button} onClick={this.createAction}>
                  {botonlabel}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>  
      </div>
    )
  }
}

FormAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
  botonlabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  redirect: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string
  }).isRequired,
  inputs: PropTypes.array.isRequired
}

FormAdmin.defaultProps = {
  inputs: []
}


export default withStyles(styles, { withTheme: true, name: 'FormAdmin' })(FormAdmin)