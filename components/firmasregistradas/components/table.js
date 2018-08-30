import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table'
import { lighten } from 'material-ui/styles/colorManipulator'
import Toolbar from 'material-ui/Toolbar'
import Paper from 'material-ui/Paper'
import SarchButton from '../../commons/searchButton'
import Tooltip from 'material-ui/Tooltip'

import { sortArray, sortArrayByDate } from '../../../lib/utils'

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const { order, orderBy, classes, columnData } = this.props;

    return (
      <TableHead className={classes.bgOrange}>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                variant={'head'}
                padding="none"
                style={{ paddingLeft: 10, fontSize: 12 }}
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
                    style={{ fontSize: 10 }}
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnData: PropTypes.array.isRequired
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
  bgOrange: {
    backgroundColor: '#ee8600'
  },
  search: {
    '& input': {
      fontSize: '12px !important'
    }
  }
});

let EnhancedTableToolbar = props => {
  const { lookingFor, cancelLookin, classes } = props;

  return (
    <Toolbar
      className={[classes.root, classes.bgOrange].join(' ')}
    >
      <div className={classes.title}>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <SarchButton className={classes.search} styleInput={{ fontSize: '12px !important' }} placeholder='Buscar' onChange={lookingFor} onCancelSearch={cancelLookin} />
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  lookingFor: PropTypes.func.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

class EnhancedTable extends React.Component {
  state = {
    active: true,
    order: 'desc',
    orderBy: 'userCode',
    selected: [],
    data: [],
    originData: [],
    page: 0,
    rowsPerPage: 5,
  }

  componentWillMount() {
    this.props.getInitFn(true)
  }

  componentWillReceiveProps({ data }) {
    if (data && data.length) {
      this.setState({
        data: data.sort((a, b) => (a.id < b.id ? -1 : 1)),
        originData: data
      })
    }
  }

  handleRequestSort = (_, property) => {
    const orderBy = property
    let order = 'desc'
    let includes = this.props.filterDate

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    let data
    if (includes.includes(orderBy)) {
      data = sortArrayByDate(order, this.state.data, orderBy)
    } else {
      data = sortArray(order, this.state.data, orderBy)
    }
    this.setState({ data, order, orderBy })
  }

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }

  lookingFor = looking => {
    if (this.state.originData.length) {
      const columnData = this.props.columnData
      const forLooking = looking.toLowerCase()
      const data = this.state.originData.filter(entry => {
        for (let idx = 0; idx < columnData.length; idx++) {
          const toLook = entry[columnData[idx].id].toLowerCase()
          if (toLook.includes(forLooking)) {
            return true
          }
        }
        return false
      })
      this.setState({ data })
    }
  }

  cancelLookin = () => {
    this.setState({ data: [...this.state.originData] })
  }

  render() {
    const { classes, columnData } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state
    const dataFiltered = data.sort((a, b) => (new Date(a.creationDate)) - (new Date(b.creationDate)))
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage)
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar lookingFor={this.lookingFor} cancelLookin={this.cancelLookin} />
        <div className={classes.tableWrapper}>
          <Table className={[classes.table, classes.td].join(' ')} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={dataFiltered.length}
              columnData={columnData}
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
                    {columnData.map(e => {
                      return <TableCell padding='none' style={{ fontSize: 10, textAlign: 'center' }}>{n[e.id]}</TableCell>
                    })}
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
  data: PropTypes.array,
  columnData: PropTypes.array,
  getInitFn: PropTypes.func,
}

export default withStyles(styles, { withTheme: true, name: 'TableList' })(EnhancedTable)
