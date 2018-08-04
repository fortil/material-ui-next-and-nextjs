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
import { getAllUsers, removeUser, resetPwdAdm, activateUser } from '../../../../lib/http'
import { sortArray, sortArrayByDate } from '../../../../lib/utils'
import { connect } from 'react-redux'
import { INITIAL_STATE_USERS } from '../../../../redux/reducers/users'
import Router from 'next/router'
import swal from 'sweetalert'

const columnData = [
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'userName', numeric: false, disablePadding: true, label: 'Usuario' },
  { id: 'active', numeric: false, disablePadding: true, label: 'Activo' },
  { id: 'roles', numeric: false, disablePadding: true, label: 'Roles' },
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
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;
  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading" style={{ color: 'white' }}>
            {numSelected} Usuarios seleccionados
          </Typography>
        ) : (
            <Typography variant="title" id="tableTitle" style={{ color: 'white' }}>
              Usuarios {props.active ? 'Activos' : 'Eliminados'}
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

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  removeUser: PropTypes.func.isRequired,
  resetPwd: PropTypes.func.isRequired,
  activateUser: PropTypes.func.isRequired,
  resetSelected: PropTypes.func.isRequired,
};

const mapDispatchEnhancedTableToolbar = dispatch => ({
  removeUser: s => dispatch(removeUser(s)),
  resetPwd: s => dispatch(resetPwdAdm(s)),
  activateUser: s => dispatch(activateUser(s)),
})

// EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
EnhancedTableToolbar = connect(null, mapDispatchEnhancedTableToolbar)(withStyles(toolbarStyles)(EnhancedTableToolbar))

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
  constructor(props, context) {
    super(props, context)

    this.state = {
      active: true,
      order: 'asc',
      orderBy: 'email',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentWillMount() {
    this.props.getAllUsers()
  }

  componentWillReceiveProps({ users }) {
    if (users && users.length) {
      this.setState({
        data: users.sort((a, b) => (a.id < b.id ? -1 : 1))
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

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (action, user) => {
    if (action === 'edit') {
      Router.push(`/admin?page=users&view=update&params=${JSON.stringify({ id: user.id })}`, `/admin/users/edit/${user.id}`)
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
            if (action === 'activate') {
              if (this.state.active === true) {
                return this.props['removeUser'](user.id)
              } else {
                return this.props['activateUser'](user.id)
              }
            } else {
              return this.props[action](user.id)
            }
          } else {
            throw null
          }
        })
        .then(() => {
          swal('Usuario actualizado con éxito!', 'Has actualizado un usuario.', 'success')
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

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  goTo = id => Router.push(`/admin?page=users&view=update&params=${JSON.stringify({ id: id })}`, `/admin/users/edit/${id}`)
    
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state
    const dataFiltered = data.filter(e => e.active === this.state.active)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage);

    return (
      <div>
        <Paper className={[classes.root, classes.bgOrange].join(' ')}>
          <EnhancedTableToolbar numSelected={selected.length}
            selected={this.state.selected}
            active={this.state.active}
            resetSelected={() => this.setState({ selected: [] })}
            filterUsers={act => this.setState({ active: act })}
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
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  const isSelected = this.isSelected(n.id)
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        {this.state.active === true ? <Tooltip title="Editar"><IconButton onClick={() => this.handleClick('edit', n)}>
                          <Icon style={{ fontSize: 16 }}>edit_icon</Icon>
                        </IconButton></Tooltip> : ''}
                        {this.state.active === true ? <Tooltip title="Reenviar Contraseña"><IconButton onClick={() => this.handleClick('resetPwd', n)}>
                          <Icon style={{ fontSize: 16 }}>vpn_key</Icon>
                          </IconButton></Tooltip> : ''}
                        <Tooltip title={this.state.active === true ? 'Eliminar' : 'Activar'}><IconButton onClick={() => this.handleClick('activate', n)}>
                          <Icon style={{ fontSize: 16 }}>{this.state.active === true ? 'delete_outline' : 'publish'}</Icon>
                        </IconButton></Tooltip>
                      </TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goTo(n.id)}>{n.email}</TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goTo(n.id)}>{n.userName}</TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goTo(n.id)}>{n.active.toString()}</TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goTo(n.id)}>{n.roles ? n.roles.join(', ') : ''}</TableCell>
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
  users: PropTypes.array,
  getAllUsers: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getAllUsers()),
  removeUser: s => dispatch(removeUser(s)),
  resetPwd: s => dispatch(resetPwdAdm(s)),
  activateUser: s => dispatch(activateUser(s)),
})

const mapStateToProps = (state = { users: INITIAL_STATE_USERS }) => ({
  users: state.users.data
})

const component = withStyles(styles, { withTheme: true, name: 'UsersListAdmin' })(EnhancedTable)

export default connect(mapStateToProps, mapDispatchToProps)(component)
