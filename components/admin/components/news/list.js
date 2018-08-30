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
import { getAllNewsAdmin, doPublicNew, removeNew, updateService } from '../../../../lib/http'
import { sortArray, sortArrayByDate } from '../../../../lib/utils'
import { connect } from 'react-redux'
import { INITIAL_STATE_NEWS } from '../../../../redux/reducers/news'
import Router from 'next/router'
import swal from 'sweetalert'

const columnData = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'title', numeric: false, disablePadding: true, label: 'Titulo' },
  { id: 'active', numeric: false, disablePadding: true, label: 'Activa' },
  { id: 'isPublic', numeric: false, disablePadding: true, label: 'Publica' },
  { id: 'creationDate', numeric: false, disablePadding: true, label: 'Fecha' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(property)
  };

  render() {
    const { order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <TableSortLabel >
              Acciones
            </TableSortLabel>
          </TableCell>
          {columnData.map((column, i) => {
            return (
              <TableCell
                key={i}
                style={{ maxWidth: column.id === 'id' ? 20 : 'unset' }}
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
                    onClick={() => this.props.onRequestSort(column.id)}
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
  highlight: {
    color: theme.palette.text.primary,
    backgroundColor: 'white',
    // color: theme.palette.text.primary,
    // backgroundColor: theme.palette.secondary.dark,
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
  const { numSelected, classes, selected } = props;
  const handleClick = evt => {
    if (evt === 'editar') {
      Router.push(`/admin?page=news&view=update&params=${JSON.stringify({ id: selected[0] })}`, `/admin/news/update/${selected[0]}`)
    } else if (evt === 'remove') {
      // props.removeNew()
    }
  }
  const txt = props.active ? props.isPublic ? 'Públicas' : 'No publicadas' : 'Eliminadas'
  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography variant="title" style={{ color: 'white' }}>
            {numSelected} Noticias seleccionadas
          </Typography>
        ) : (
            <Typography variant="title" id="tableTitle" style={{ color: 'white' }}>
              Noticias {txt}
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <div className={classes.actions}>
            <Tooltip title="Eliminar">
              <IconButton aria-label="Delete" onClick={() => handleClick('remove')}>
                <Icon style={{ color: 'white' }}>delete</Icon>
              </IconButton>
            </Tooltip>
            {numSelected < 2 ? <Tooltip title="Editar">
              <IconButton aria-label="Editar" onClick={() => handleClick('editar')}>
                <Icon style={{ color: 'white' }}>edit</Icon>
              </IconButton>
            </Tooltip> : ''}
          </div>
        ) : <div className={classes.actions}>
            {props.active ? <Tooltip title={props.isPublic ? 'No publicadas' : 'Entradas públicas'}>
              <IconButton aria-label="Download" onClick={props.isPublicFn}>
                <Icon style={{ color: 'white' }}>repeat</Icon>
              </IconButton>
            </Tooltip> : ''}
            <Tooltip title={props.active ? 'Ver eliminadas' : 'Ver activas'}>
              <IconButton aria-label="eliminados" onClick={props.activeFn}>
                <Icon style={{ color: 'white' }}>{props.active ? 'restore_from_trash' : 'public'}</Icon>
              </IconButton>
            </Tooltip>
          </div>}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  removeNew: PropTypes.func.isRequired,
  doPublicNew: PropTypes.func.isRequired,
};

const mapDispatchEnhancedTableToolbar = dispatch => ({
  removeNew: d => dispatch(removeNew(d)),
  doPublicNew: d => dispatch(doPublicNew(d)),
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

class NewsAdminTable extends React.Component {
  state = {
    isPublic: true,
    active: true,
    order: 'asc',
    orderBy: 'creationDate',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
  }

  componentWillMount() {
    if (process.browser) {
      this.props.getAllNews()
    }
  }

  componentWillReceiveProps({ news }) {
    if (news.length) {
      this.setState({
        data: news.sort((a, b) => b.id - a.id)
      })
    }
  }

  handleRequestSort = property => {
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

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (action, noticia) => {
    let news = Object.assign({}, noticia)
    // const { selected } = this.state;
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }
    // this.setState({ selected: newSelected });
    
    if (action === 'edit') {
      Router.push(`/admin?page=news&view=update&params=${JSON.stringify({ id: news.id })}`, `/admin/news/update/${news.id}`)
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
              news.ispublic = this.state.isPublic === true ? false : true
            } else if (action === 'delete') {
              news.active = this.state.active === true ? false : true
            }
            news.creationdate = news.creationDate.split(' ')[0]
            delete news.creationDate
            delete news.isPublic
            delete news.links
            delete news.imageUrl
            const newNew = Object.keys(news).map(key => ({ val: news[key], key }))
            return this.props.updateService(newNew)
          } else {
            throw null
          }
        })
        .then(() => {
          swal('Noticia actualizada con éxito!', 'Has actualizado exitosamente esta noticia!!', 'success')
          this.props.getAllNews()
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

  goingTo = id => Router.push(`/admin?page=news&view=update&params=${JSON.stringify({ id: id })}`, `/admin/news/update/${id}`)

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state

    let dataFiltered = [...data]
    
    if (this.state.active === false) {
      dataFiltered = [...data].filter(e => !e.active)
    } else if (this.state.active === true) {
      if (this.state.isPublic) {
        dataFiltered = [...data].filter(e => e.active === true && e.isPublic === true)
      } else {
        dataFiltered = [...data].filter(e => e.active === true && e.isPublic === false)
      }
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage);

    return (
      <div>
        <Paper className={[classes.root, classes.bgOrange].join(' ')}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            selected={this.state.selected}
            isPublic={this.state.isPublic}
            isPublicFn={() => this.setState({ isPublic: !this.state.isPublic })}
            active={this.state.active}
            activeFn={() => this.setState({ active: !this.state.active })}
            clearSt={() => this.setState({ selected: [] })}
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
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={i}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        {this.state.active === true ? <Tooltip title="Editar"><IconButton onClick={() => this.handleClick('edit', n)}>
                          <Icon style={{ fontSize: 16 }}>edit_icon</Icon>
                        </IconButton></Tooltip> : ''}
                        {this.state.active === true ? <Tooltip title={this.state.isPublic === true ? 'Ocultar del público' : 'Hacer pública'}><IconButton onClick={() => this.handleClick('activate', n)}>
                          <Icon style={{ fontSize: 16 }}>{this.state.isPublic === true ? 'visibility_off' : 'visibility'}</Icon>
                        </IconButton></Tooltip> : ''}
                        <Tooltip title={this.state.active === true ? 'Eliminar' : 'Activar'}><IconButton onClick={() => this.handleClick('delete', n)}>
                          <Icon style={{ fontSize: 16 }}>{this.state.active === true ? 'delete_outline' : 'publish'}</Icon>
                        </IconButton></Tooltip>
                      </TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer' }} onClick={() => this.goingTo(n.id)}>{n.id}</TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => this.goingTo(n.id)}>
                        {n.title}
                      </TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 13 }} onClick={() => this.goingTo(n.id)}>{n.active === true ? 'Si' : 'No'}</TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 13 }} onClick={() => this.goingTo(n.id)}>{n.isPublic === true ? 'Si' : 'No'}</TableCell>
                      <TableCell padding="none" style={{ cursor: 'pointer', fontSize: 13 }} onClick={() => this.goingTo(n.id)}>{n.creationDate.toString().split(' ')[0]}</TableCell>
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

NewsAdminTable.propTypes = {
  classes: PropTypes.object.isRequired,
  news: PropTypes.array,
  getAllNews: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  getAllNews: () => dispatch(getAllNewsAdmin()),
  updateService: en => dispatch(updateService('/news/update', en)),
})
const mapStateToProps = (state = { news: INITIAL_STATE_NEWS }) => ({
  news: state.news.data
})

const component = withStyles(styles, { withTheme: true, name: 'NewsListAdmin' })(NewsAdminTable)

export default connect(mapStateToProps, mapDispatchToProps)(component)
