import React from 'react'
import Table from './table'
import { getHttp } from '../../../lib/http'
import { INITIAL_STATE_FRCR } from '../../../redux/reducers/frcr'
import { connect } from 'react-redux'

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre de la Circular' },
  { id: 'url', numeric: false, disablePadding: true, label: 'Enlace', prepare: [val => <a href={`${val}`} >Descarga la circular aquí...</a>] },
  { id: 'creationDate', numeric: false, disablePadding: true, label: 'Creado' },
]
class Firmas extends React.Component {
  render() {
    const { getFrc, frcr } = this.props
    return <Table
      columnData={columnData}
      getInitFn={getFrc}
      filterDate={['creationDate']}
      data={frcr}
    />
  }
}


const mapDispatchToProps = dispatch => ({
  getFrc: () => dispatch(getHttp('fcrmailshot', 'getallactive')),
})
const mapStateToProps = (state = { frcr: INITIAL_STATE_FRCR }) => ({
  frcr: state.frcr.data
})

export default connect(mapStateToProps, mapDispatchToProps)(Firmas)
