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
import { getPurchases, updateService } from '../../../../lib/http'
import { sortArray, sortArrayByDate } from '../../../../lib/utils'
import { connect } from 'react-redux'
import { INITIAL_STATE_PURCHASES } from '../../../../redux/reducers/purchases'
import swal from 'sweetalert'

const columnData = [
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'publicationDate', numeric: true, disablePadding: true, label: 'Publicación' },
  { id: 'expirationDate', numeric: true, disablePadding: true, label: 'Expiración' },
  { id: 'object', numeric: false, disablePadding: true, label: 'Objeto' },
  { id: 'fileUrl', numeric: false, disablePadding: true, label: 'Archivo' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const { order, orderBy, active } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell
            variant={'head'}
            padding={'dense'}
            sortDirection={false}
          >
            <Tooltip
              title="Click para procesar"
              placement={'bottom-end'}
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === -1}
                direction={order}
                onClick={this.createSortHandler(-1)}
              >
                {active ? 'Eliminar' : 'Restaurar'}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                variant={'head'}
                padding={'dense'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title={`Ordenar por ${column.label}`}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
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
    color: 'white'
  },
});

let EnhancedTableToolbar = props => {
  const { classes, state } = props;

  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
        <Typography variant="title" id="tableTitle" style={{ color: 'white' }}>
          Compras {state ? 'Activas' : 'Eliminadas'}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title={state ? 'Ver eliminados' : 'Ver activos'}>
          <IconButton aria-label="eliminados" onClick={() => props.show(!state)}>
            <Icon style={{ color: 'white' }}>repeat</Icon>
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  bgOrange: {
    backgroundColor: '#ee8600'
  }
});

class EnhancedTable extends React.Component {
  state = {
    active: true,
    order: 'desc',
    orderBy: 'userCode',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
  }

  componentWillMount() {
    this.props.getPurchases()
  }

  componentWillReceiveProps({ purchase }) {
    if (purchase && purchase.length) {
      this.setState({
        data: purchase.sort((a, b) => (a.id < b.id ? -1 : 1))
      })
    }
  }

  handleRequestSort = (_, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    let data
    if (orderBy === 'publicationDate' || orderBy === 'expirationDate') {
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  innactiveHandler = id => {
    const params = ['publicationDate', 'expirationDate', 'object', 'email', 'id'].map(key => Object.assign({ [key]: id[key] }))
    if (this.state.active === true) {
      params.push({ active: false })
      this.props.inactivePurchase(Object.assign(...params))
    } else {
      params.push({ active: true })
      this.props.inactivePurchase(Object.assign(...params))
    }
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClick = purchase => {
    let pur = Object.assign({}, purchase)
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
          pur.active = !this.state.active
          const provedor = ['id', 'publicationDate', 'expirationDate', 'object', 'email', 'file', 'active']
            .map(key => ({ val: pur[key], key }))
          return this.props.updateService(provedor)
        } else {
          throw null
        }
      })
      .then(() => {
        this.props.getPurchases()
        swal('Compra procesada con éxito!', 'Has procesado una compra.', 'success')
      })
      .catch(error => {
        if (error) {
          swal(error.message, error.detail, 'error')
        }
        swal.stopLoading()
        swal.close()
      })
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const dataFiltered = data.filter(n => n.active === this.state.active)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage);

    return (
      <div>
        <Paper className={[classes.root, classes.bgOrange].join(' ')}>
          <EnhancedTableToolbar
            state={this.state.active}
            show={e => this.setState({ active: e })}
          />
        </Paper>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                active={this.state.active}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={dataFiltered.length}
              />
              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell>
                        <Tooltip title={this.state.active === true ? 'Eliminar' : 'Activar'}><IconButton onClick={() => this.handleClick(n)}>
                          <Icon style={{ fontSize: 16 }}>{this.state.active === true ? 'delete_outline' : 'publish'}</Icon>
                        </IconButton></Tooltip>
                      </TableCell>
                      <TableCell style={{ fontSize: 12 }}>{n.email}</TableCell>
                      <TableCell style={{ fontSize: 12 }}>{n.publicationDate}</TableCell>
                      <TableCell style={{ fontSize: 12 }}>{n.expirationDate}</TableCell>
                      <TableCell style={{ fontSize: 12, minWidth: 400 }}>{n.object}</TableCell>
                      <TableCell style={{ fontSize: 12 }} ><a href={n.fileUrl}>Enlace</a></TableCell>
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

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  purchase: PropTypes.array,
  getPurchases: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  getPurchases: () => dispatch(getPurchases()),
  updateService: n => dispatch(updateService('/purchaseprocess/update', n)),
})
const mapStateToProps = (state = { purchases: INITIAL_STATE_PURCHASES }) => ({
  purchase: state.purchases.data
})

const component = withStyles(styles, { withTheme: true, name: 'PurchaseListAdmin' })(EnhancedTable)

export default connect(mapStateToProps, mapDispatchToProps)(component)
