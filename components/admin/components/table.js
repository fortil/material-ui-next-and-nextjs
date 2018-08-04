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
import { sortArray, sortArrayByDate } from '../../../lib/utils'
import Router from 'next/router'
import swal from 'sweetalert'

class ComponentTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const { order, orderBy, columnData, actions } = this.props;

    return (
      <TableHead>
        <TableRow>
          {actions && actions.length ?<TableCell padding='checkbox'>
            <Tooltip title='Acción' enterDelay={300} >
              <TableSortLabel>
                Acción
              </TableSortLabel>
            </Tooltip>
          </TableCell> : ''}
          {columnData.map((column, i) => {
            let padding = 'none'
            if (!(actions && actions.length) && i === 0) {
              padding = 'default'
            } else {
              padding = column.disablePadding ? 'none' : 'default'
            }
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={padding}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title='Sort'
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

ComponentTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  columnData: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
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

let ComponentTableToolbar = props => {
  const { numSelected, classes, title, prelabel } = props
  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color='inherit' variant='subheading' style={{ color: 'white' }}>
            {numSelected} {prelabel} seleccionados
          </Typography>
        ) : (
            <Typography variant='title' id='tableTitle' style={{ color: 'white' }}>
              {title} {props.active ? 'Activos' : 'Eliminados'}
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title={props.active ? 'Ver eliminados' : 'Ver activos'}>
          <IconButton aria-label='eliminados' onClick={() => props.filterUsers(!props.active)}>
            <Icon style={{ color: 'white' }}>{props.active ? 'restore_from_trash' : 'face'}</Icon>
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

ComponentTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  resetSelected: PropTypes.func.isRequired,
};


ComponentTableToolbar = withStyles(toolbarStyles)(ComponentTableToolbar)

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

class ComponentTable extends React.Component {
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

  handleClick = (action, provider) => {
    let prov = Object.assign({}, provider)
    const redirect = this.props.redirect

    swal({
      title: 'Seguro que desea realizar esta acción?',
      text: '',
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Cancelar',
          value: null,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: 'Aceptar',
          value: true,
          visible: true,
          closeModal: false
        }
      }
    })
      .then(result => {
        if (result) {
          return action(prov, { ...this.state })
        } else {
          throw null
        }
      })
      .then(() => {
        this.props.getInitFn()
        swal('Actualizado con éxito!', 'Has actualizado exitosamente un registro!!', 'success')
          .then(() => {
            if (redirect) {
              Router.push(redirect.url, redirect.path)
            }
          })
      })
      .catch(error => {
        if (error) {
          swal(error.message, error.detail, 'error')
            .then(() => {
              if (redirect) {
                Router.push(redirect.url, redirect.path)
              }
            })
        }
        swal.stopLoading()
        swal.close()
      })
  }

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, columnData, title, prelabel, actions } = this.props
    const { data, order, orderBy, rowsPerPage, page } = this.state
    const dataFiltered = data.filter(e => e.active === this.state.active)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage);
    
    return (
      <div>
        <Paper className={[classes.root, classes.bgOrange].join(' ')}>
          <ComponentTableToolbar
            active={this.state.active}
            title={title}
            prelabel={prelabel}
            filterUsers={act => this.setState({ active: act })}
          />
        </Paper>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby='tableTitle'>
              <ComponentTableHead
                order={order}
                orderBy={orderBy}
                columnData={columnData}
                onRequestSort={this.handleRequestSort}
                rowCount={dataFiltered.length}
                actions={actions}
              />
              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, i) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      aria-checked={false}
                      tabIndex={-1}
                      key={n.id}
                      selected={false}
                    >
                      {actions && actions.length ? actions.map((action, i) => {
                        const active = this.state.active
                        const show = action.showOnlyActive && active === true ? true : 
                          action.showOnlyDeActive && active === false ? true :
                            action.show ? true : false
                        if (show) {
                          return <TableCell padding='checkbox' key={i}>
                            <Tooltip title={active === true ? action.labelActive : action.labelDeActive}>
                              <IconButton onClick={() => this.handleClick(action.fn, n)}>
                                <Icon style={{ fontSize: 16 }}>{active === true ? action.iconActive : action.iconDeActive}</Icon>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        }
                }) : ''}
                      {columnData.map((e, i) => {
                        let padding = 'none'
                        if (!(actions && actions.length) && i === 0) {
                          padding = 'default'
                        } else {
                          padding = e.disablePadding ? 'none' : 'default'
                        }
                        const c = e.type && e.type === 'link' ? <a href={n[e.id]} target='_blank'>link</a> : n[e.id]
                        return <TableCell padding={padding} style={{ fontSize: 10 }}>{c}</TableCell>
                      })}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * (dataFiltered.length === 0 ? emptyRows : 1) }}>
                    <TableCell colSpan={columnData.length + (actions && actions.length ? 1 : 0)} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component='div'
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

ComponentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  redirect: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string
  }),
  data: PropTypes.array,
  title: PropTypes.string,
  prelabel: PropTypes.string,
  columnData: PropTypes.array,
  actions: PropTypes.array.isRequired,
  getInitFn: PropTypes.func,
}

export default withStyles(styles, { withTheme: true, name: 'ComponentTableAdmin' })(ComponentTable)
