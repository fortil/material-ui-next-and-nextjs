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
import { getAllService, updateService } from '../../../../lib/http'
import { sortArray, sortArrayByDate } from '../../../../lib/utils'
import { connect } from 'react-redux'
import Router from 'next/router'
import { INITIAL_STATE_RTR } from '../../../../redux/reducers/rtr'
import swal from 'sweetalert'
import single from './single'

const columnData = [
  { id: 'userCode', numeric: false, disablePadding: true, label: 'Código de usuario' },
  { id: 'address', numeric: false, disablePadding: true, label: 'Dirección' },
  { id: 'city', numeric: false, disablePadding: true, label: 'Ciudad' },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell
            variant={'head'}
            padding={'dense'}
            sortDirection={ false}
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
                Solucionar
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
  const { numSelected, classes, selected, state } = props;
  
  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading" style={{ color: 'white' }}>
            {numSelected} RTRs seleccionados
          </Typography>
        ) : (
            <Typography variant="title" id="tableTitle" style={{ color: 'white' }}>
              RTRs {state ? 'No Procesadas' : 'Procesadas'}
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title={state ? 'Ver procesadas' : 'Ver no procesadas'}>
          <IconButton aria-label="procesadas" onClick={() => props.show(!state)}>
            <Icon style={{ color: 'white' }}>repeat</Icon>
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
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
    this.props.getAllRTR()
  }
  
  componentWillReceiveProps({ rtr }) {
    if (rtr.length) {
      this.setState({
        data: rtr.sort((a, b) => b.id - a.id)
      })
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    // const data =
    //   order === 'desc'
    //     ? this.state.data.sort((a, b) => b[orderBy] - a[orderBy])
    //     : this.state.data.sort((a, b) => a[orderBy] - b[orderBy])
    let data
    if (orderBy === 'creationDate') {
      data = sortArrayByDate(order, this.state.data, orderBy)
    } else {
      data = sortArray(order, this.state.data, orderBy)
    }
    this.setState({ data, order, orderBy })
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
        rtr.active = !this.state.active
        const rev = Object.assign({}, ...['id', 'userCode', 'address', 'city', 'names', 'lastNames', 'identification', 'mobile', 'message', 'active']
          .map(key => ({ [key]: rtr[key] })))
        return this.props.updateService(rev)
      } else {
        throw null
      }
    })
      .then(() => {
        this.props.getAllRTR()
        swal('RTR actualizada con éxito!', 'Has actualizado una revisión.', 'success')
      })
      .catch(error => {
        if (error) {
          swal(error.message, error.detail, 'error')
        }
        swal.stopLoading()
        swal.close()
      })
  };

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  goingToSingle = id => {
    Router.push(`/admin?page=rtr&view=single&params=${JSON.stringify({ id: id })}`, `/admin/rtr/view/${id}`)
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const dataFiltered = data.filter(n => n.active === this.state.active)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage);
    console.log(emptyRows);
    return (
      <div>
        <Paper className={[classes.root, classes.bgOrange].join(' ')}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            selected={this.state.selected}
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
                      <TableCell>
                        <Tooltip title="Ver RTR"><IconButton onClick={() => this.goingToSingle(n.id)}>
                          <Icon style={{ fontSize: 16 }}>visibility</Icon>
                        </IconButton></Tooltip>
                        <Tooltip title={this.state.active === true ? 'Procesar' : 'Activar'}><IconButton onClick={() => this.handleClick(n)}>
                          <Icon style={{ fontSize: 16 }}>{this.state.active === true ? 'delete_outline' : 'publish'}</Icon>
                        </IconButton></Tooltip>
                      </TableCell>
                      <TableCell style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goingToSingle(n.id)}>{n.userCode}</TableCell>
                      <TableCell style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goingToSingle(n.id)}>{n.address}</TableCell>
                      <TableCell style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goingToSingle(n.id)}>{n.city}</TableCell>
                      <TableCell style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goingToSingle(n.id)}>{n.email}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows <= 5 && (
                  <TableRow style={{ height: 49 * (dataFiltered.length === 0 ? emptyRows : 1) }}>
                    <TableCell colSpan={5} />
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
  rtr: PropTypes.array,
  getAllRTR: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  getAllRTR: () => dispatch(getAllService('/rtr/getall', 'rtr')),
  updateService: data => dispatch(updateService('/rtr/update', data, 'json')),
})
const mapStateToProps = (state = { rtr: INITIAL_STATE_RTR }) => ({
  rtr: state.rtr.data
})

const component = withStyles(styles, { withTheme: true, name: 'RTRListAdmin' })(EnhancedTable)

export default {
  list: connect(mapStateToProps, mapDispatchToProps)(component),
  single,
  permissions: ['RTR'],
  links: [
    { icon: 'done', txt: 'RTR', primary: 'RTRs', secondary: '', url: '/admin?page=rtr&view=list', as: '/admin/rtr' }
  ]
}
