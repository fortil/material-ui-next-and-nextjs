import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table'
import { lighten } from 'material-ui/styles/colorManipulator'
import Toolbar from 'material-ui/Toolbar'
import SarchButton from '../commons/searchButton'
import Paper from 'material-ui/Paper'
import Tooltip from 'material-ui/Tooltip'
import { getAllService } from '../../lib/http'
import { connect } from 'react-redux'
import { INITIAL_STATE_NOTIFICATIONS, setNotifications } from '../../redux/reducers/notifications'
import { sortArray, sortArrayByDate } from '../../lib/utils'

const columnData = [
  { id: 'actDate', numeric: false, disablePadding: true, label: 'Fecha Acto' },
  { id: 'radicationNumber', numeric: false, disablePadding: true, label: 'No. Radicado' },
  { id: 'applicantPerson', numeric: false, disablePadding: true, label: 'Solicitante' },
  { id: 'issuedPerson', numeric: false, disablePadding: true, label: 'Expidió' },
  { id: 'fileUrl', numeric: false, disablePadding: true, label: 'Archivo' },
];

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

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const { order, orderBy, classes } = this.props;

    return (
      <TableHead className={classes.bgOrange}>
        <TableRow >
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                style={{ paddingLeft: 10 }}
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
};


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 600,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  bgOrange: {
    backgroundColor: '#ee8600',
  }
});

EnhancedTableHead = withStyles(styles, {withTheme: true, name: 'EnhancedTableHeadAdmin' })(EnhancedTableHead)

class EnhancedTable extends React.Component {
  state = {
    active: true,
    order: 'asc',
    orderBy: 'email',
    selected: [],
    data: [],
    originData: [],
    page: 0,
    rowsPerPage: 5,
  }

  componentWillMount() {
    this.props.getAllService()
  }

  componentWillReceiveProps({ notifications }) {
    if (notifications && notifications.length) {
      this.setState({
        data: notifications.filter(a => a.active === true).sort((a, b) => (new Date(b.actDate)) - (new Date(a.actDate))),
        originData: notifications
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
    if (orderBy === 'actDate') {
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

  lookingFor = looking => {
    if (this.state.originData.length) {
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
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state
    const dataFiltered = data.filter(e => e.active === this.state.active)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar lookingFor={this.lookingFor} cancelLookin={this.cancelLookin} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
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
                    aria-checked={false}
                    tabIndex={-1}
                    key={n.id}
                    selected={false}
                  >
                    <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12, paddingLeft: 10 }}>{n.actDate}</TableCell>
                    <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }}>{n.radicationNumber}</TableCell>
                    <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }}>{n.applicantPerson}</TableCell>
                    <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }}>{n.issuedPerson}</TableCell>
                    <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }}> <span><a href={n.fileUrl}>Archivo</a></span></TableCell>
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
  users: PropTypes.array,
  getAllService: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  getAllService: () => dispatch(getAllService('/notification/getall', 'notifications', setNotifications)),
})

const mapStateToProps = (state = { notifications: INITIAL_STATE_NOTIFICATIONS }) => ({
  notifications: state.notifications.data
})

const component = withStyles(styles, { withTheme: true, name: 'NotificationsListAdmin' })(EnhancedTable)

export default connect(mapStateToProps, mapDispatchToProps)(component)
