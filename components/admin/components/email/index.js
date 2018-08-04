import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { actionHttp, getHttp } from '../../../../lib/http'
import { validateEmail } from '../../../../lib/utils'
import { connect } from 'react-redux'
import Form from '../form'
import Table from '../table'
import { INITIAL_STATE_EMAIL } from '../../../../redux/reducers/emails'

const inputs = [
  { icon: '', type: 'select', name: 'code', label: 'Tipo de email' },
  { icon: '', type: 'text', name: 'value', label: 'Email', validate: [validateEmail] },
]
class Create extends Component {
  state = { inputs }

  componentWillMount () {
    this.props.getCodes()
  }
  
  componentWillReceiveProps({ codes }) {
    if (codes) {
      const newCodes = codes.map(code => ({ label: code.description, value: code.code }))
      const newItems = this.state.inputs.map(item => {
        if (item.type === 'select') {
          item.choices = newCodes
        }
        return item
      })
      this.setState({ inputs: newItems })
    } 
  }
  

  render() {
    const { createFn } = this.props
    return <Form
      botonlabel='Añadir'
      title='Añadir Email al manager'
      inputs={this.state.inputs || inputs}
      actions={{
        createFn
      }}
      redirect={{
        url: '/admin?page=emails&view=list',
        path: '/admin/email'
      }}
    />
  }
}

Create.propTypes = {
  createFn: PropTypes.func.isRequired
}

const mapDispatchToPropsCreate = dispatch => ({
  createFn: data => dispatch(actionHttp('email', 'create', data)),
  getCodes: () => dispatch(getHttp('parameter', 'getemailcodes')),
})

const mapStateToPropsCreate = (state = { emails: INITIAL_STATE_EMAIL }) => ({ codes: state.emails.codes })

const create = connect(mapStateToPropsCreate, mapDispatchToPropsCreate)(Create)

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre de la Circular' },
  { id: 'url', numeric: false, disablePadding: true, label: 'Enlace', type: 'link' },
  { id: 'creationDate', numeric: false, disablePadding: true, label: 'Creado' }
]
class List extends React.Component {
  render() {
    const { getEmails, emails, actionEmail } = this.props
    return <Table
      title='Circulares de Firmas Registradas'
      prelabel='Circulares'
      actions={
        [
          {
            fn: actionEmail,
            show: true,
            labelActive: 'Eliminar',
            labelDeActive: 'Activar',
            iconActive: 'delete_outline',
            iconDeActive: 'publish'
          }
        ]
      }
      columnData={columnData}
      getInitFn={getEmails}
      filterDate={['creationDate']}
      data={emails}
    />
  }
}


const mapDispatchToPropsList = dispatch => ({
  getEmails: () => dispatch(getHttp('parameter', 'getemailcodes')),
  actionEmails: (data, state) => {
    data.active = !state.active
    return dispatch(actionFrc('fcrmailshot', 'update', data))
  },
})
const mapStateToPropsList = (state = { emails: INITIAL_STATE_EMAIL }) => ({ emails: state.emails.data })

const list = connect(mapStateToPropsList, mapDispatchToPropsList)(List)

export default {
  create,
  list,
  permissions: ['Admin'],
  links: [
    { icon: 'email', txt: 'EMAIL', primary: 'Emails', secondary: '', url: '/admin?page=emails&view=list', as: '/admin/emails' },
    { icon: 'add_box', txt: 'Crear', primary: 'Crear Email', secondary: '', url: '/admin?page=emails&view=create', as: '/admin/emails/create' }
  ]
}
