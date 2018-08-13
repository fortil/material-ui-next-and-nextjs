import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { globalStyles, flex } from '../../../../src/styles'
import Grid from 'material-ui/Grid'
import Chip from 'material-ui/Chip'
import { connect } from 'react-redux'
import { INITIAL_STATE_PROVIDERS } from '../../../../redux/reducers/providers'
import Router from 'next/router'

const fields = {
  active: false,
  name: '',
  phone: '',
  nit: '',
  country: '',
  city: '',
  contactName: '',
  email: '',
  address: '',
}

const translate = {
  name: 'Proveedor',
  phone: 'Teléfono',
  nit: 'NIT',
  country: 'País',
  city: 'Ciudad',
  contactName: 'Contacto',
  email: 'Email',
  address: 'Dirección',
  createdAt: 'Inscrito',
  active: 'Activo',
}


class ViewSingleProvider extends React.Component {
  state = {
    provider: Object.assign({}, fields),
    services: {}
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  componentDidMount() {
    const provider = this.props.providers.filter(u => u.id === this.props.id)[0]
    this.setState({ provider })
    if (provider.supplierDetails) {
      const services = provider.supplierDetails.reduce((prev, curr, idx) => {
        prev[curr.serviceCategory.description] = (prev[curr.serviceCategory.description] || []).concat(curr)
        return prev
      }, {})
      this.setState({ services })
    }
  }
  goBack = () => {
    Router.push('/admin?page=providers&view=list', '/admin/providers/list')
  }
  render() {
    const { classes } = this.props
    const keys = Object.keys(this.state.provider).filter(e => !e.includes('Url') && e !== 'lastTimeStamp' && e !== 'supplierDetails' && e !== 'id')
    const servicios = Object.keys(this.state.services)
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            title={<Typography className={classes.title} color="textSecondary">Cuenta <b>{this.state.email}</b></Typography>}
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
            <Typography className={classes.title} color="textSecondary">Proveedor {this.state.provider.name}</Typography>
            <Grid container className={classes.container}>
              {
                keys.map(key => (
                  <Grid item md={4} className={classes.mt3} key={key} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                    <InputLabel htmlFor={key} style={{ fontSize: 14 }}>
                      {translate[key]}
                      {/* <Icon>face</Icon> */}
                    </InputLabel>
                    <Input
                      id={key}
                      style={{ fontSize: 13, width: '95%' }}
                      value={key === 'active' ? this.state.provider[key] ? 'Si' : 'No' : this.state.provider[key]}
                      disabled
                    />
                  </Grid>
                ))
              }
            </Grid>
          </CardContent>
        </Card>
        <Grid container className={classes.card} style={{ maxWidth: '95%' }} spacing={8}>
          {
            servicios.length ? servicios.map(keyService =>
              <Grid item xs key={keyService} className={classes.mt3}>
                <Card className={classes.card} >
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary"><b>{keyService}</b></Typography>
                    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                      {
                        this.state.services[keyService].map(service => (
                          <Chip
                            label={service.service.description}
                            // onClick={handleClick}
                            // onDelete={handleDelete}
                            style={{ fontSize: 10 }}
                            className={classes.chip}
                          />
                        ))
                      }
                    </div>
                  </CardContent>
                </Card>
              </Grid>
          ) : '' }
        </Grid>
      </div>
    )
  }
}

ViewSingleProvider.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

const mapStateToProps = (state = { providers: INITIAL_STATE_PROVIDERS }) => ({
  providers: state.providers.data,
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
  chip: {
    margin: theme.spacing.unit,
  },
  ...globalStyles, ...flex
})

export default connect(
  mapStateToProps,
  null
)(withStyles(styles, { withTheme: true, name: 'ViewSingleProviderAdmin' })(ViewSingleProvider))