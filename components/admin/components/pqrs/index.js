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
import { getAllPQRs, statusPQRs } from '../../../../lib/http'
import { sortArray, sortArrayByDate } from '../../../../lib/utils'
import { connect } from 'react-redux'
import { INITIAL_STATE_PQRS } from '../../../../redux/reducers/pqrs'
import Router from 'next/router'
import swal from 'sweetalert'
import single from './single'

const columnData = [
  { id: 'userCode', numeric: false, disablePadding: true, label: 'Código de usuario' },
  { id: 'issue', numeric: false, disablePadding: true, label: 'Caso' },
  { id: 'description', numeric: false, disablePadding: true, label: 'Descripción' },
  { id: 'annexes', numeric: false, disablePadding: true, label: 'Anexos' },
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
            padding="dense"
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
                Acciones
              </TableSortLabel>  
            </Tooltip>  
          </TableCell>
          {columnData.map((column, i) => {
            return (
              <TableCell
                key={i}
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
  const { numSelected, classes, state } = props;
  
  return (
    <Toolbar
      className={classNames(classes.root,
        // {
        //   [classes.highlight]: numSelected > 0,
        // }
      )}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading" style={{ color: 'white' }}>
            {numSelected} PQRs seleccionados
          </Typography>
        ) : (
            <Typography variant="title" id="tableTitle" style={{ color: 'white' }}>
              PQRS {state ? 'No Procesados' : 'Procesados'}
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title={state ? 'Ver procesados' : 'Ver no procesados'}>
          <IconButton aria-label="inactivos" onClick={() => props.show(!state)}>
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
    this.props.getAllPQRs()
  }
  
  componentWillReceiveProps({ pqrs }) {
    if (pqrs.length) {
      this.setState({
        data: pqrs.sort((a, b) => (new Date(b.createdAt)) - (new Date(a.createdAt)))
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
    if (orderBy === 'creationDate') {
      data = sortArrayByDate(order, this.state.data, orderBy)
    } else {
      data = sortArray(order, this.state.data, orderBy)
    }
    this.setState({ data, order, orderBy })
  }

  handleSelectAllClick = (_, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (action, pqr) => {
    if (action === 'view') {
      Router.push(`/admin?page=pqrs&view=single&params=${JSON.stringify({ id: pqr })}`, `/admin/pqrs/view/${pqr}`)
    } else if (action === 'activate') {
      swal({
        title: `Seguro que desea ${this.state.active === true ? 'procesar' : 'activar'} este PQR?`,
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
            return this.props['inactivePQRs'](pqr)
          } else {
            throw null
          }
        })
        .then(() => {
          return swal(`PQR ${this.state.active === true ? 'procesada' : 'activada'} con éxito`, '', 'success')
        })
        .catch(error => {
          swal.stopLoading()
          swal.close()
          if (error) {
            swal(error.message, error.detail, 'error')
          }
        })
    }
  };

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  innactiveHandler = id => {
    if (this.state.active) {
      this.props.inactivePQRs(id)
      this.setState({ selected: [] })
    }
  }
  goingToSingle = id => {
    Router.push(`/admin?page=pqrs&view=single&params=${JSON.stringify({ id: id })}`, `/admin/pqrs/view/${id}`)
  }
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const dataFiltered = data.filter(n => n.active === this.state.active)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage);
    
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
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={dataFiltered.length}
              />
              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, i) => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      key={i}
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell >
                        <Tooltip title="Ver completo"><IconButton onClick={() => this.handleClick('view', n.id)}>
                          <Icon style={{ fontSize: 16 }}>visibility</Icon>
                        </IconButton></Tooltip>
                        {this.state.active === true ? <Tooltip title="Procesar"><IconButton onClick={() => this.handleClick('activate', n.id)}>
                          <Icon style={{ fontSize: 16 }}>delete_outline</Icon>
                        </IconButton></Tooltip> : ''}
                      </TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }}   onClick={() => this.goingToSingle(n.id)} >{n.userCode}</TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goingToSingle(n.id)}>{n.issue}</TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12, maxWidth: 300 }} onClick={() => this.goingToSingle(n.id)}>{n.description}</TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goingToSingle(n.id)}>{
                        n.annexes.length ? n.annexes.map((e, i) => <span key={i}><a href={e.url}>Archivo {i + 1}</a>, </span>) : '- 0 -'
                      }</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
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
  pqrs: PropTypes.array,
  getAllPQRs: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  getAllPQRs: () => dispatch(getAllPQRs()),
  inactivePQRs: id => dispatch(statusPQRs('pqr/inactivate', id)),
  activePQRs: id => dispatch(statusPQRs('pqr/activate', id)),
})
const mapStateToProps = (state = { pqrs: INITIAL_STATE_PQRS }) => ({
  pqrs: state.pqrs.data
})

const component = withStyles(styles, { withTheme: true, name: 'PqrsListAdmin' })(EnhancedTable)

export default {
  list: connect(mapStateToProps, mapDispatchToProps)(component),
  single,
  permissions: ['Atención Usuario'],
  links: [
    { icon: 'inbox', txt: 'PQRs', primary: 'PQRs', secondary: '', url: '/admin?page=pqrs&view=list', as: '/admin/pqrs' }
  ]
}
