import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { actionFrc, getFrc } from '../../../../lib/http'
import { connect } from 'react-redux'
import Form from '../form'
import Table from '../table'
import { INITIAL_STATE_FRC } from '../../../../redux/reducers/frc'

const inputs = [
  { icon: '', type: 'text', name: 'name', label: 'Nombre de la empresa' },
  { icon: '', type: 'text', name: 'nit', label: 'NIT' },
  { icon: '', type: 'text', name: 'city', label: 'Ciudad de Domicilio' },
  { icon: '', type: 'text', name: 'address', label: 'Dirección' },
  { icon: '', type: 'text', name: 'phone', label: 'Teléfono' },
  { icon: '', type: 'text', name: 'sicRegistry', label: 'No de registro ante SIC' },
  { icon: '', type: 'text', name: 'legalRepresentative', label: 'Nombre del representante legal' },
  { icon: '', type: 'text', name: 'surgasRegistry', label: 'No de registro ante Sur Colombiana de Gas S.A' }
]
class Create extends Component {
  render() {
    const { createFn } = this.props

    return <Form
      botonlabel='Crear Firma'
      title='Crear firma registrada'
      inputs={inputs}
      actions={{
        createFn: createFn
      }}
      redirect={{
        url: '/admin?page=fcr&view=list',
        path: '/admin/fcr'
      }}
    />
  }
}

Create.propTypes = {
  createFn: PropTypes.func.isRequired
}


const mapDispatchToPropsCreate = dispatch => ({
  createFn: data => dispatch(actionFrc('fcr', 'create', data, 'json')),
})

// const mapStateToProps = (state = { modal: INITIAL_STATE_MODAL }) => ({
//   modal: state.modal
// })
const create = connect(null, mapDispatchToPropsCreate)(Create)


const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre de la empresa' },
  { id: 'nit', numeric: false, disablePadding: true, label: 'NIT' },
  { id: 'city', numeric: false, disablePadding: true, label: 'Ciudad de Domicilio' },
  { id: 'address', numeric: false, disablePadding: true, label: 'Dirección' },
  { id: 'phone', numeric: false, disablePadding: true, label: 'Teléfono' },
  { id: 'sicRegistry', numeric: false, disablePadding: true, label: 'No Registro ante la SIC' },
  { id: 'legalRepresentative', numeric: false, disablePadding: true, label: 'Representante Legal' },
  { id: 'surgasRegistry', numeric: false, disablePadding: true, label: 'No registro SURGAS' },
]
class List extends React.Component {
  render() {
    const { getFrc, fcr, actionFrc } = this.props
    return <Table
      title='FCR'
      prelabel='FCR'
      actions={
        []
      }
      updateService={actionFrc}
      columnData={columnData}
      getInitFn={getFrc}
      filterDate={['creationDate']}
      data={fcr}
    />
  }
}


const mapDispatchToPropsList = dispatch => ({
  getFrc: () => dispatch(getFrc('fcr')),
  actionFrc: data => dispatch(actionFrc('fcr', 'update', data)),
})
const mapStateToPropsList = (state = { frc: INITIAL_STATE_FRC }) => ({ fcr: state.frc.data })

const list = connect(mapStateToPropsList, mapDispatchToPropsList)(List)

export default {
  create,
  list
}
