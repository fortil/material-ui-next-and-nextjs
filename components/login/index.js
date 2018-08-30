import React, { Component } from 'react'
import { globalStyles, flex } from '../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Input from 'material-ui/Input'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { INITIAL_STATE_USER } from '../../redux/reducers/user'
import { setLogin } from '../../lib/api'
import Router from 'next/router'
import Paper from 'material-ui/Paper'
import LOGO from '../../static/logo.svg'
import swal from 'sweetalert'

const STYLES = theme => ({
  ...flex,
  ...globalStyles,
  button: {
    marginTop: 20,
    backgroundColor: '#2d6fb1',
    color: 'white'
  },
  input: {
    color: 'white',
    '&:before': {
      backgroundColor: 'rgba(255, 255, 255, 0.42)'
    },
    '&:after': {
      backgroundColor: 'rgba(255, 255, 255, 0.42)'
    },
  },
  cssUnderline: {
    color: 'white',
    '&:before': {
      backgroundColor: 'rgba(255, 255, 255, 0.42)'
    },
    '&:after': {
      backgroundColor: 'rgba(255, 255, 255, 0.42)'
    },
    '&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.42)'
    }
  },
  allbody: {
    minHeight: '100vh'
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
})

class Login extends Component {
  state = {
    email: { val: '', error: false },
    pwd: { val: '', error: false }
  }  
  
  handleChange = e => evt => {
    this.setState({ [e]: Object.assign({}, this.state[e], { val: evt.target.value }) })
  }
  handleClick = () => {
    const keys = Object.keys(this.state).map(k => Object.assign({}, this.state[k], { key: k })).filter(v => v.val === '')
    if (keys.length === 0) {
      this.props.actions.setLogin(this.state.email.val, this.state.pwd.val)
    } else {
      keys.forEach(item => {
        this.setState({ [item.key]: Object.assign({}, this.state[item.key], { error: true })})
      })
      swal('Faltan los siguientes campos', keys.map(i => i.key === 'pwd' ? 'Contraseña' : i.key === 'email' ? 'Email o Usuario': '').join(' y '), 'warning')
    }
  }

  validateUser = ({ user, token }) => {
    if (user && user.email && token && token.auth_token) {
      return true
    }
    return false
  }
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, allbody } = classes
    if (this.validateUser(this.props)) {
      Router.push('/admin')
    }

    return (
      <section className={[seccion, m0, allbody].join(' ')}>
        <Grid container className={container} direction="row" alignItems="center" justify="center" style={{height: '70vh'}}>
          {/* <Grid item xs={12}> */}
            {/* <h2 className={[h2, textCenter].join(' ')}><strong>Login</strong></h2> */}
          {/* </Grid> */}
          <Grid item md={2}>
          </Grid>
          <Grid item md={8}>
            <Paper elevation={4}>
              <Grid container direction="row" alignItems="center" justify="center">
                <Grid item md={6}>
                  <img src={LOGO} alt="SURGAS" style={{ width: '100%' }} />
                </Grid>
                <Grid item md={6} style={{ paddingBottom: 40, paddingTop: 40, backgroundColor: '#d68500' }} >
                  <Grid container direction="column" justify="center" alignItems="center" >
                    <Grid item xs={12}>
                      <Input
                        ref={'email'}
                        className={classes.cssUnderline}
                        required={true}
                        error={this.state.email.error}
                        inputProps={{
                          className: classes.input,
                        }}
                        classes={{
                          underline: classes.cssUnderline
                        }}
                        placeholder={'Nombre de usuario'}
                        type={'text'}
                        margin="none"
                        value={this.state.email.val}
                        onChange={this.handleChange('email')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        ref={'pwd'}
                        className={classes.cssUnderline}
                        required={true}
                        error={this.state.pwd.error}
                        inputProps={{
                          className: classes.input,
                        }}
                        classes={{
                          underline: classes.cssUnderline
                        }}
                        placeholder={'Contraseña'}
                        type={'password'}
                        margin="none"
                        value={this.state.pwd.val}
                        onChange={this.handleChange('pwd')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button className={classes.button} variant="raised" onClick={this.handleClick} size="small">
                        Ingresar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={2}>
          </Grid>
        </Grid>
      </section>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  actions: {
    setLogin: (usr, pwd) => dispatch(setLogin(usr, pwd))
  }
})

const mapStateToProps = (state = {user: INITIAL_STATE_USER}) => ({
  user: state.user.user,
  token: state.user.token
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(STYLES, { name: 'WiLogin' })(Login))
