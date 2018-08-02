import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import TextField from 'material-ui/TextField'
// import HtmlField from 'material-ui-html-field'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
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
  ...globalStyles, ...flex
})
const roles = {
  Editor: 'e',
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

  componentDidMount() {
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

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">Editar la cuenta de {this.state.email}</Typography>
            <Grid container className={classes.container}>
              <Grid item md={4} className={classes.mt3}>
                <InputLabel htmlFor="username"><Icon>face</Icon>Nombre de Usuario</InputLabel>
                <Input
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3}>
                <InputLabel htmlFor="first-name"><Icon>text_rotation_none</Icon>Nombre</InputLabel>
                <Input
                  id="first-name"
                  value={this.state.names}
                  onChange={this.handleChange('names')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3}>
                <InputLabel htmlFor="last-name"><Icon>text_rotation_none</Icon>Apellido</InputLabel>
                <Input
                  id="last-name"
                  value={this.state.lastnames}
                  onChange={this.handleChange('lastnames')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3}>
                <InputLabel htmlFor="email"><Icon>alternate_email</Icon>Email</InputLabel>
                <Input
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                />
              </Grid>
              <Grid item md={4} className={classes.mt3}>
                <InputLabel htmlFor="roles"><Icon>account_box</Icon>Rol: </InputLabel>
                <TextField
                  id="roles"
                  select
                  // label="Native select"
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
                  {[{ label: '', value: '' }, { label: 'Admin', value: 'a' }, { label: 'Editor', value: 'e' }].map(option => (
                    <option key={option.value} value={option.value}>
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
  updateUser: d => dispatch(updateUser(d)),
})

const mapStateToProps = (state = { users: INITIAL_STATE_USERS }) => ({
  users: state.users.data
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, name: 'EditUserAdmin' })(CreateUsers))