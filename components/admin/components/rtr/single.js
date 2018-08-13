import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
// import HtmlField from 'material-ui-html-field'
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import { globalStyles, flex } from '../../../../src/styles'
import Grid from 'material-ui/Grid'
import { updateService } from '../../../../lib/http'
import { connect } from 'react-redux'
import Router from 'next/router'
import swal from 'sweetalert'
import { INITIAL_STATE_RTR } from '../../../../redux/reducers/rtr'

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
    fontWeight: 500,
    fontSize: 14,
  },
  ...globalStyles, ...flex
})
const fields = {
  names: '',
  lastNames: '',
  identification: '',
  userCode: '',
  address: '',
  phone: '',
  email: '',
  city: '',
  mobile: '',
  // message: '',
  creationDate: '',
  active: false,
  authorizedPersonName: '',
  authorizedPersonPhone: '',
}

const translate = {
  names: 'Nombres',
  lastNames: 'Apellidos',
  identification: 'Identificación',
  userCode: 'Código de Usuario',
  address: 'Dirección',
  phone: 'Teléfono',
  email: 'E-mail',
  city: 'Ciudad',
  mobile: 'Celular',
  message: 'Mensaje',
  creationDate: 'Fecha Creación',
  active: 'Activo',
  authorizedPersonName: 'Persona autorizada',
  authorizedPersonPhone: 'Contacto de la persona autorizada',
}


class ViewSingleRTR extends React.Component {
  state = {
    rtr: Object.assign({}, fields)
  }

  handleClick = obj => {
    swal({
      title: 'Seguro que desea realizar esta acción?',
      text: '',
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
          let rtr = Object.assign({}, obj)
          rtr.active = !this.state.rtr.active
          const rev = Object.assign({}, ...['id', 'userCode', 'address', 'city', 'names', 'lastNames', 'identification', 'mobile', 'message', 'active']
            .map(key => ({ [key]: rtr[key] })))
          return this.props.updateService(rev)
        } else {
          throw null
        }
      })
      .then(() => {
        return swal('RTR actualizada con éxito!', 'Has actualizado una revisión.', 'success')
      })
      .then(() => {
        this.goBack()
      })
      .catch(error => {
        if (error) {
          swal(error.message, error.detail, 'error')
        }
        swal.stopLoading()
        swal.close()
      })
  };
  componentDidMount() {
    const rtr = this.props.rtrs.filter(u => u.id === this.props.id)[0]
    this.setState({ rtr })
  }
  goBack = () => {
    Router.push('/admin?page=rtr&view=list', '/admin/rtr')
  }
  render() {
    const { classes } = this.props
    const keys = Object.keys(this.state.rtr).filter(e => e !== 'id')
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            title={<Typography className={classes.title} color="textSecondary">RTR de Usuario {this.state.rtr.email}</Typography>}
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
                keys.map(e => (
                  <Grid item md={4} className={classes.mt3} key={e} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                    <InputLabel htmlFor={e} style={{ fontSize: 14 }}>
                      {translate[e]}  
                    </InputLabel>
                    <Input
                      id={e}
                      style={{ fontSize: 14, width: '95%' }}
                      value={e === 'active' ? this.state.rtr[e].toString() : this.state.rtr[e]}
                      disabled
                    />
                  </Grid>
                ))
              }
              <Grid item md={12} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                <InputLabel htmlFor={'message'} style={{ fontSize: 14 }}>
                  {translate['message']}
                </InputLabel>
                <Input
                  fullWidth
                  style={{ fontSize: 14 }}
                  id={'message'}
                  value={this.state.rtr.message}
                  disabled
                  multiline
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" variant="raised" onClick={() => this.handleClick(this.state.rtr)}>
              {this.state.rtr.active ? 'Procesar' : 'Activar de nuevo'}
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

ViewSingleRTR.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

const mapDispatchToProps = dispatch => ({
  updateService: data => dispatch(updateService('/rtr/update', data, 'json')),
})

const mapStateToProps = (state = { rtr: INITIAL_STATE_RTR }) => ({
  rtrs: state.rtr.data
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, name: 'ViewSingleRTRAdmin' })(ViewSingleRTR))