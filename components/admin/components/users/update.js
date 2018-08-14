import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Input, { InputLabel } from 'material-ui/Input'
import TextField from 'material-ui/TextField'
// import HtmlField from 'material-ui-html-field'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import { globalStyles, flex } from '../../../../src/styles'
import Grid from 'material-ui/Grid'
import { openModal } from '../../../../redux/reducers/modal'
import { INITIAL_STATE_USERS } from '../../../../redux/reducers/users'
import { updateUser } from '../../../../lib/http'
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
const roles = {
  Editor: 'e',
  'Atención Usuario': 'u',
  Compras: 'c',
  Publicador: 'p',
  Admin: 'a'
}
class CreateUsers extends React.Component {
  state = {
    id: '',
    email: '',
    names: '',
    lastnames: '',
    username: '',
    role: ''
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  componentDidMount () {
    const user = this.props.users.filter(u => u.id === this.props.id)[0]
    this.setState({
      email: user.email,
      names: user.firstName,
      lastnames: user.lastName,
      username: user.userName,
      id: user.id,
      role: roles[user.roles[0]],
    })
  }
  

  updateUser = () => {
    const v = Object.values(this.state).filter(e => e === '')
    if (v.length) {
      this.props.openModal({ message: 'Rellene todos los campos', detail: 'Es obligatorio llenar todos los campos' })
    } else {
      this.props.updateUser(this.state, () => {
        this.setState({
          email: '',
          names: '',
          lastnames: '',
          username: '',
          role: ''
        })
        Router.push('/admin?page=users&view=list', '/admin/users/list')
      })
    }
  }
  goBack = () => {
    Router.push('/admin?page=users&view=list', '/admin/users/list')
  }
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            title={<Typography className={classes.title} color="textSecondary">Editar la cuenta de {this.state.email}</Typography>}
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
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel htmlFor="username" style={{ fontSize: 13 }}>Nombre de Usuario</InputLabel>
                <Input
                  id="username"
                  style={{ fontSize: 13, width: '95%' }}
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel htmlFor="first-name" style={{ fontSize: 13 }}>Nombre</InputLabel>
                <Input
                  id="first-name"
                  style={{ fontSize: 13, width: '95%' }}
                  value={this.state.names}
                  onChange={this.handleChange('names')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel htmlFor="last-name" style={{ fontSize: 13 }}>Apellido</InputLabel>
                <Input
                  id="last-name"
                  style={{ fontSize: 13, width: '95%' }}
                  value={this.state.lastnames}
                  onChange={this.handleChange('lastnames')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel htmlFor="email" style={{ fontSize: 13 }}>Email</InputLabel>
                <Input
                  id="email"
                  style={{ fontSize: 13, width: '95%' }}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <InputLabel htmlFor="roles" style={{ fontSize: 13 }}>Rol: </InputLabel>
                <TextField
                  id="roles"
                  select
                  style={{ fontSize: 11, width: '95%' }}
                  className={classes.textField}
                  value={this.state.role}
                  onChange={this.handleChange('role')}
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
                    <option key={option.value} value={option.value} style={{ fontSize: 11 }}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} className={[classes.mt4, classes.flex, classes.justifyContentCenter].join(' ')}>
                <Button id="button" variant="raised" color="primary" className={classes.button} onClick={this.updateUser}>
                  Actualizar Usuario
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
  id: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  openModal: d => dispatch(openModal(d)),
  updateUser: (d, cb) => dispatch(updateUser(d, cb)),
})

const mapStateToProps = (state = { users: INITIAL_STATE_USERS }) => ({
  users: state.users.data
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, name: 'EditUserAdmin' })(CreateUsers))