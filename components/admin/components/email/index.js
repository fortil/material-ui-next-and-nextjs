import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { actionHttp, getHttp } from '../../../../lib/http'
import { validateEmail } from '../../../../lib/utils'
import { connect } from 'react-redux'
import Form from '../form'
import Table from '../table'
import { INITIAL_STATE_EMAIL, setEmailCode } from '../../../../redux/reducers/emails'

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
  createFn: data => dispatch(actionHttp('parameter', 'createemail', data)),
  getCodes: () => dispatch(getHttp('parameter', 'getemailcodes')),
})

const mapStateToPropsCreate = (state = { emails: INITIAL_STATE_EMAIL }) => ({ codes: state.emails.codes })

const create = connect(mapStateToPropsCreate, mapDispatchToPropsCreate)(Create)

const columnData = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'codeDesc', numeric: false, disablePadding: true, label: 'Tipo' },
  { id: 'value', numeric: false, disablePadding: true, label: 'Email' }
]
class List extends React.Component {
  render() {
    const { getInit, emails, actionEmail } = this.props
    return <Table
      title='Email registrados'
      prelabel='Email'
      actions={
        [
          {
            fn: actionEmail,
            show: true,
            labelActive: 'Eliminar',
            iconActive: 'delete_outline',
          }
        ]
      }
      columnData={columnData}
      getInitFn={getInit}
      switchActive={false}
      filterDate={['creationDate']}
      data={emails}
    />
  }
}

function getInit(active) {
  return (dispatch, getState) => {
    const state = getState()
    const codes = state.emails.codes
    const emails = state.emails.data
    if (!emails.length || active) {
      dispatch(getHttp('parameter', 'getallemails')).then(value => {
        if (!codes.length) {
          dispatch(getHttp('parameter', 'getemailcodes'))
        } else {
          dispatch(setEmailCode(codes))
        }
      })
    }
  }
}

const mapDispatchToPropsList = dispatch => ({
  getInit: () => dispatch(getInit(true)),
  actionEmail: (data, _) => {
    const id = [].concat(data.id)
    return dispatch(actionHttp('parameter', 'deleteemail', { id }))
  },
})
const mapStateToPropsList = (state = { emails: INITIAL_STATE_EMAIL }) => ({
  emails: state.emails.data,
  codes: state.emails.codes
})

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
