import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Tooltip from 'material-ui/Tooltip'
import { getPurchases } from '../../../lib/http'
import { sortArray, sortArrayByDate } from '../../../lib/utils'
import { connect } from 'react-redux'
import { INITIAL_STATE_PURCHASES } from '../../../redux/reducers/purchases'

const columnData = [
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'active', numeric: false, disablePadding: true, label: 'Estado' },
  // { id: 'publicationDate', numeric: false, disablePadding: true, label: 'Publicación' },
  { id: 'expirationDate', numeric: false, disablePadding: true, label: 'Expiración' },
  { id: 'fileUrl', numeric: false, disablePadding: true, label: 'Archivo' },
  { id: 'object', numeric: false, disablePadding: true, label: 'Objeto' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const { order, orderBy, classes } = this.props;

    return (
      <TableHead className={classes.bgOrange}>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                variant={'head'}
                padding="none"
                // style={{ fontSize: 10, padding: '1px 1px 1px 1px'}}
                style={{ paddingLeft: 10 }}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title={`Ordenar por ${column.label}`}
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={10}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    style={{ fontSize: 12 }}
                    onClick={this.createSortHandler(column.id)}
                    style={{ color: 'white' }}
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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 5,
  },
  table: {
    minWidth: 320,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  td: {
    '& td': {
      width: 10
    }
  },
  bgOrange: {
    backgroundColor: '#ee8600'
  }
});

EnhancedTableHead = withStyles(styles, { withTheme: true, name: 'EnhancedTableHeadAdmin' })(EnhancedTableHead)

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
    if (purchase.length) {
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
    if (orderBy === 'expirationDate') {
      data = sortArrayByDate(order, this.state.data, orderBy)
    } else {
      data = sortArray(order, this.state.data, orderBy)
    }
    this.setState({ data, order, orderBy })
  }

  handleChangePage = (_, page) => {
    this.setState({ page })
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state
    const dataFiltered = data.sort((a, b) => (new Date(a.publicationDate)) - (new Date(b.publicationDate)))
      .map(entry => {
        if (entry.object.length > 141) {
          entry.object = entry.object.substr(0, 141)
          entry.object += '...'
        }
        return entry
      })
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={[classes.table, classes.td].join(' ')} aria-labelledby="tableTitle">
            <EnhancedTableHead
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
                    tabIndex={-1}
                    key={n.id}
                    style={{ maxWidth: 250 }}
                  >
                    <TableCell padding='none' style={{ fontSize: 10, padding: '0px 0px 0px 5px'}}>{n.email}</TableCell>
                    <TableCell padding='none' style={{ fontSize: 10}}>{n.active ? 'Activo' : 'Inactivo'}</TableCell>
                    {/* <TableCell padding='none' style={{ fontSize: 10}}>{n.publicationDate}</TableCell> */}
                    <TableCell padding='none' style={{ fontSize: 10}}>{n.expirationDate}</TableCell>
                    <TableCell padding='none' style={{ fontSize: 10}}><a href={n.fileUrl}>Enlace</a></TableCell>
                    <TableCell padding='none' style={{ fontSize: 10, minWidth: 250 }}>{n.object}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
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
})
const mapStateToProps = (state = { purchases: INITIAL_STATE_PURCHASES }) => ({
  purchase: state.purchases.data
})

const component = withStyles(styles, { withTheme: true, name: 'PurchaseList' })(EnhancedTable)

export default connect(mapStateToProps, mapDispatchToProps)(component)
