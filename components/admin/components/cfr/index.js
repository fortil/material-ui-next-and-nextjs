import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { actionHttp, getHttp } from '../../../../lib/http'
import { connect } from 'react-redux'
import Form from '../form'
import Table from '../table'
import { INITIAL_STATE_FRCR } from '../../../../redux/reducers/frcr'

const inputs = [
  { icon: '', type: 'text', name: 'name', label: 'Nombre de la circular' },
  { icon: '', type: 'file', name: 'file', label: 'Archivo' },
]
class Create extends Component {
  render() {
    const { createFn } = this.props

    return <Form
      botonlabel='Crear Circular'
      title='Crear Circular'
      inputs={inputs}
      actions={{
        createFn: createFn
      }}
      redirect={{
        url: '/admin?page=cfr&view=list',
        path: '/admin/circulares'
      }}
    />
  }
}

Create.propTypes = {
  createFn: PropTypes.func.isRequired
}


const mapDispatchToPropsCreate = dispatch => ({
  createFn: data => dispatch(actionHttp('fcrmailshot', 'create', data, 'formData')),
})

const create = connect(null, mapDispatchToPropsCreate)(Create)


const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre de la Circular' },
  { id: 'url', numeric: false, disablePadding: true, label: 'Enlace', type: 'link' },
  { id: 'creationDate', numeric: false, disablePadding: true, label: 'Creado' }
]
class List extends React.Component {
  render() {
    const { getFrc, fcr, actionFrc } = this.props
    return <Table
      title='Circulares de Firmas Registradas'
      prelabel='Circulares'
      actions={
        [
          {
            fn: actionFrc,
            show: true,
            labelActive: 'Eliminar',
            labelDeActive: 'Activar',
            iconActive: 'delete_outline',
            iconDeActive: 'publish'
          }
        ]
      }
      columnData={columnData}
      getInitFn={getFrc}
      filterDate={['creationDate']}
      data={fcr}
    />
  }
}


const mapDispatchToPropsList = dispatch => ({
  getFrc: () => dispatch(getHttp('fcrmailshot', 'getall')),
  actionFrc: (data, state) => {
    data.active = !state.active
    return dispatch(actionHttp('fcrmailshot', 'update', data))
  },
})
const mapStateToPropsList = (state = { frcr: INITIAL_STATE_FRCR }) => ({ fcr: state.frcr.data })

const list = connect(mapStateToPropsList, mapDispatchToPropsList)(List)

export default {
  create,
  list,
  permissions: ['FCR'],
  links: [
    { icon: 'view_list', txt: 'FCRC', primary: 'Circulares', secondary: '', url: '/admin?page=cfr&view=list', as: '/admin/circulares' },
    { icon: 'add_box', txt: 'Crear', primary: 'Crear Circular', secondary: '', url: '/admin?page=cfr&view=create', as: '/admin/circular/create' }
  ]
}
