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
import { INITIAL_STATE_PQRS } from '../../../../redux/reducers/pqrs'
import { statusPQRs } from '../../../../lib/http'
import { connect } from 'react-redux'
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
  notificationAddress: '',
  address: '',
  phone: '',
  email: '',
  city: '',
  neighborhood: '',
  issue: '',
  situation: '',
  description: '',
  createdAt: '',
  active: false,
  annexes: []
}

const translate = {
  names: 'Nombres',
  lastNames: 'Apellidos',
  identification: 'Identificación',
  userCode: 'Código de Usuario',
  notificationAddress: 'Dirección de Noticiación',
  address: 'Dirección',
  phone: 'Teléfono',
  email: 'E-mail',
  city: 'Ciudad',
  neighborhood: 'Barrio',
  issue: 'Problema',
  situation: 'Situación',
  description: 'Descripción',
  createdAt: 'Fecha Creación',
  active: 'Activo',
  annexes: 'Anexos'
}


class ViewSinglePQR extends React.Component {
  state = {
    pqr: Object.assign({}, fields)
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
          if (this.state.pqr.active === true) {
            return this.props.inactivePQRs(obj.id)
          } else {
            return this.props.activePQRs(obj.id)
          }
        } else {
          throw null
        }
      })
      .then(() => {
        return swal('PQR actualizada con éxito!', 'Has resuelto una PQR.', 'success')
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
    const pqr = this.props.pqrs.filter(u => u.id === this.props.id)[0]
    this.setState({ pqr })
  }
  goBack = () => {
    Router.push('/admin?page=pqrs&view=list', '/admin/pqrs')
  }
  render() {
    const { classes } = this.props
    const keys = Object.keys(this.state.pqr).filter(e => e !== 'annexes' && e !== 'description' && e !== 'id')
    const values = Object.values(this.state.pqr)
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            title={<Typography className={classes.title} color="textSecondary">PQR de Usuario {this.state.pqr.email}</Typography>}
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
                      {/* <Icon>face</Icon> */}
                    </InputLabel>
                    <Input
                      id={e}
                      style={{ fontSize: 14, width: '95%' }}
                      value={e === 'active' ? this.state.pqr[e].toString() : this.state.pqr[e]}
                      disabled
                    />
                  </Grid>
                ))
              }
              <Grid item md={12} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                <InputLabel htmlFor={'annexes'} style={{ fontSize: 14 }}>
                  {translate['annexes']}
                </InputLabel>
                <Input
                  fullWidth  
                  id={'annexes'}
                  style={{ fontSize: 14, width: '95%' }}
                  value={this.state.pqr.annexes.length ? this.state.pqr.annexes.map(a => a.url).join(', ') : ''}
                  disabled
                  multiline
                />
              </Grid>
              <Grid item md={12} className={classes.mt3} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                <InputLabel htmlFor={'description'} style={{ fontSize: 14 }}>
                  {translate['description']}
                </InputLabel>
                <Input
                  fullWidth
                  style={{ fontSize: 14 }}
                  id={'description'}
                  value={this.state.pqr.description}
                  disabled
                  multiline
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" variant="raised" onClick={() => this.handleClick(this.state.pqr)}>
              {this.state.pqr.active ? 'Procesar' : 'Activar de nuevo'}
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

ViewSinglePQR.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

const mapDispatchToProps = dispatch => ({
  inactivePQRs: d => dispatch(statusPQRs('pqr/inactivate', d)),
  activePQRs: d => dispatch(statusPQRs('pqr/activate',d)),
})

const mapStateToProps = (state = { pqrs: INITIAL_STATE_PQRS }) => ({
  pqrs: state.pqrs.data
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, name: 'ViewSinglePqrAdmin' })(ViewSinglePQR))