import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import { lighten } from 'material-ui/styles/colorManipulator'
import { getAllProviders, updateService } from '../../../../lib/http'
import { sortArray, sortArrayByDate } from '../../../../lib/utils'
import { connect } from 'react-redux'
import Router from 'next/router'
import { INITIAL_STATE_PROVIDERS } from '../../../../redux/reducers/providers'
import swal from 'sweetalert'

const columnData = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Empresa' },
  { id: 'contactName', numeric: false, disablePadding: false, label: 'Contacto' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Teléfono' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Creado' },
];

class ProveedoresTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const {  order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Tooltip title="Acción" enterDelay={300} >
              <TableSortLabel>
                Acción
              </TableSortLabel>
            </Tooltip>
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

ProveedoresTableHead.propTypes = {
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
});

let ProveedoresTableToolbar = props => {
  const { numSelected, classes } = props;
  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading" style={{ color: 'white' }}>
            {numSelected} Proveedores seleccionados
          </Typography>
        ) : (
            <Typography variant="title" id="tableTitle" style={{ color: 'white' }}>
              Proveedores {props.active ? 'Activos' : 'Eliminados'}
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title={props.active ? 'Ver eliminados' : 'Ver activos'}>
          <IconButton aria-label="eliminados" onClick={() => props.filterUsers(!props.active)}>
            <Icon style={{ color: 'white' }}>{props.active ? 'restore_from_trash' : 'face'}</Icon>
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

ProveedoresTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  resetSelected: PropTypes.func,
};

const ProveedorestchEnhancedTableToolbar = dispatch => ({
})

// ProveedoresTableToolbar = withStyles(toolbarStyles)(ProveedoresTableToolbar);
ProveedoresTableToolbar = connect(null, ProveedorestchEnhancedTableToolbar)(withStyles(toolbarStyles)(ProveedoresTableToolbar))

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  bgOrange: {
    backgroundColor: '#ee8600'
  }
});

class ProveedoresTable extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      active: true,
      order: 'asc',
      orderBy: 'email',
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentWillMount() {
    this.props.getAllProviders()
  }

  componentWillReceiveProps({ providers }) {
    if (providers && providers.length) {
      this.setState({
        data: providers.sort((a, b) => b.id - a.id)
      })
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    let data
    if (orderBy === 'createdAt') {
      data = sortArrayByDate(order, this.state.data, orderBy)
    } else {
      data = sortArray(order, this.state.data, orderBy)
    }
    this.setState({ data, order, orderBy })
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (action, provider) => {
    let prov = Object.assign({}, provider)
    if (action === 'ver') {
      Router.push(`/admin?page=providers&view=single&params=${JSON.stringify({ id: provider.id })}`, `/admin/providers/view/${provider.id}`)
    } else {
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
            prov.active = !this.state.active
            const provedor = ['id', 'nit', 'name', 'phone', 'country', 'city', 'contactName', 'email', 'address', 'active']
                .map(key => ({ val: prov[key], key }))
            return this.props.updateService(provedor)
          } else {
            throw null
          }
        })
        .then(result => {
          this.props.getAllProviders()
          swal('Proveedor actualizado con éxito!', 'Has actualizado exitosamente un proveedor!!', 'success')
        })
        .catch(error => {
          if (error) {
            swal(error.message, error.detail, 'error')
          }
          swal.stopLoading()
          swal.close()
        })
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state
    const dataFiltered = data.filter(e => e.active === this.state.active)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage);

    return (
      <div>
        <Paper className={[classes.root, classes.bgOrange].join(' ')}>
          <ProveedoresTableToolbar
            active={this.state.active}
            filterUsers={act => this.setState({ active: act })}
          />
        </Paper>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <ProveedoresTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={dataFiltered.length}
              />
              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={false}
                      tabIndex={-1}
                      key={n.id}
                      selected={false}
                    >
                      <TableCell padding="checkbox">
                        <Tooltip title='Ver proveedor'><IconButton onClick={() => this.handleClick('ver', n)}>
                          <Icon style={{ fontSize: 16 }}>visibility</Icon>
                        </IconButton></Tooltip>
                        <Tooltip title={this.state.active === true ? 'Eliminar' : 'Activar'}><IconButton onClick={() => this.handleClick('activate', n)}>
                          <Icon style={{ fontSize: 16 }}>{this.state.active === true ? 'delete_outline' : 'publish'}</Icon>
                        </IconButton></Tooltip>
                      </TableCell>
                      <TableCell scope="row" style={{ cursor: 'pointer', fontSize: 13 }}  onClick={() => this.handleClick('ver', n)}>{n.name}</TableCell>
                      <TableCell style={{ cursor: 'pointer', fontSize: 13 }}  onClick={() => this.handleClick('ver', n)}>{n.contactName}</TableCell>
                      <TableCell style={{ cursor: 'pointer', fontSize: 13 }}  onClick={() => this.handleClick('ver', n)}>{n.phone}</TableCell>
                      <TableCell style={{ cursor: 'pointer', fontSize: 13 }}  onClick={() => this.handleClick('ver', n)}>{n.email}</TableCell>
                      <TableCell style={{ cursor: 'pointer', fontSize: 13 }}  onClick={() => this.handleClick('ver', n)}>{n.createdAt}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * (dataFiltered.length === 0 ? emptyRows : 1) }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

ProveedoresTable.propTypes = {
  classes: PropTypes.object.isRequired,
  providers: PropTypes.array,
  getAllProviders: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  getAllProviders: () => dispatch(getAllProviders()),
  updateService: d => dispatch(updateService('/supplier/update', d)),
})

const mapStateToProps = (state = { providers: INITIAL_STATE_PROVIDERS }) => ({
  providers: state.providers.data
})

const component = withStyles(styles, { withTheme: true, name: 'ProveedoresListAdmin' })(ProveedoresTable)

export default connect(mapStateToProps, mapDispatchToProps)(component)
