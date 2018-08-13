import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Input, { InputLabel } from 'material-ui/Input'
import TextField from 'material-ui/TextField'
// import HtmlField from 'material-ui-html-field'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { globalStyles, flex } from '../../../../src/styles'
import Grid from 'material-ui/Grid'
import { openModal } from '../../../../redux/reducers/modal'
import { createUser } from '../../../../lib/http'
import { connect } from 'react-redux'
import Router from 'next/router'

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

class CreateUsers extends React.Component {
  state = {
    email: '',
    names: '',
    lastnames: '',
    username: '',
    password: '',
    role: ''
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  createUser = () => {
    const v = Object.values(this.state).filter(e => e === '')
    if (v.length) {
      this.props.openModal({ message: 'Rellene todos los campos', detail: 'Es obligatorio llenar todos los campos' })
    } else {
      this.props.createUser(this.state)
      this.setState({
        email: '',
        names: '',
        lastnames: '',
        username: '',
        password: '',
        role: ''
      })
      Router.push('/admin?page=users&view=list', '/admin/users/list')
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">Crea un nuevo Usuario</Typography>
            <Grid container className={classes.container}>
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel style={{fontSize: 13}} htmlFor="username"><Icon>face</Icon>Nombre de Usuario</InputLabel>
                <Input
                  id="username"
                  value={this.state.username}
                  style={{ fontSize: 13, width: '95%' }}
                  onChange={this.handleChange('username')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel style={{fontSize: 13}} htmlFor="first-name"><Icon>text_rotation_none</Icon>Nombre</InputLabel>
                <Input
                  id="first-name"
                  value={this.state.names}
                  style={{ fontSize: 13, width: '95%' }}
                  onChange={this.handleChange('names')}
                />  
              </Grid>  
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel style={{fontSize: 13}} htmlFor="last-name"><Icon>text_rotation_none</Icon>Apellido</InputLabel>
                <Input
                  id="last-name"
                  value={this.state.lastnames}
                  style={{ fontSize: 13, width: '95%' }}
                  onChange={this.handleChange('lastnames')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel style={{fontSize: 13}} htmlFor="email"><Icon>alternate_email</Icon>Email</InputLabel>
                <Input
                  id="email"
                  value={this.state.email}
                  style={{ fontSize: 13, width: '95%' }}
                  onChange={this.handleChange('email')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel style={{fontSize: 13}} htmlFor="password"><Icon>lock</Icon>Contraseña</InputLabel>
                <Input
                  id="password"
                  style={{ fontSize: 13, width: '95%' }}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel htmlFor="roles" style={{ fontSize: 13 }}><Icon>account_box</Icon>Rol: </InputLabel>
                <TextField
                  id="roles"
                  select
                  className={classes.textField}
                  value={this.state.role}
                  onChange={this.handleChange('role')}
                  style={{ fontSize: 13, width: '95%' }}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  // helperText="Please select your currency"
                  margin="normal"
                >
                  {[{ label: '', value: '' }, { label: 'Admin', value: 'a' }, { label: 'Publicador', value: 'p' }, { label: 'Atención al Usuario', value: 'u' }, { label: 'Compras', value: 'c' }].map(option => (
                    <option key={option.value} value={option.value} style={{ fontSize: 13 }}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} className={[classes.mt4, classes.flex, classes.justifyContentCenter].join(' ')}>
                <Button id="button" variant="raised" color="primary" className={classes.button} onClick={this.createUser}>
                  Crear usuario
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>  
      </div>
    )
  }
}

CreateUsers.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  openModal: d => dispatch(openModal(d)),
  createUser: d => dispatch(createUser(d)),
})

// const mapStateToProps = (state = { modal: INITIAL_STATE_MODAL }) => ({
//   modal: state.modal
// })

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, name: 'CreateUserAdmin' })(CreateUsers))