import React from 'react'
import Table from './table'
import { getHttp } from '../../../lib/http'
import { INITIAL_STATE_FRC } from '../../../redux/reducers/frc'
import { connect } from 'react-redux'

const columnData = [
  { id: 'name', label: 'Nombre de la empresa' },
  { id: 'nit', label: 'NIT' },
  { id: 'city', label: 'Ciudad de Domicilio' },
  { id: 'address', label: 'Dirección' },
  { id: 'phone', label: 'Teléfono' },
  { id: 'sicRegistry', label: 'No Registro ante la SIC' },
  { id: 'legalRepresentative', label: 'Representante Legal' },
  { id: 'tipo', label: 'Reparadora o Inspectora' },
  { id: 'surgasRegistry', label: 'No registro SURGAS' },
]

class Firmas extends React.Component {
  render() {
    const { getFrc, frc } = this.props
    return <Table
      columnData={columnData}
      getInitFn={getFrc}
      filterDate={['actDate']}
      data={frc}
    />
  }
}


const mapDispatchToProps = dispatch => ({
  getFrc: () => dispatch(getHttp('fcr', 'getallactive')),
})
const mapStateToProps = (state = { frc: INITIAL_STATE_FRC }) => ({
  frc: state.frc.data
})

export default connect(mapStateToProps, mapDispatchToProps)(Firmas)
