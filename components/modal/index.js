import { connect } from 'react-redux'
import { getCountries, sendAttachData } from '../../lib/http'
import { INITIAL_STATE_MODAL, openModalAction, closeModalAction } from '../../redux/reducers/modal'
import modal from './component'
import circular from './circular'

const mapDispatchToProps = dispatch => ({
  openModal: datos => dispatch(openModalAction(datos)),
  closeModal: resp => dispatch(closeModalAction(resp))
})

const mapStateToPropsModal = (state = { modal: INITIAL_STATE_MODAL }) => ({
  open: state.modal.modal.open,
  message: state.modal.modal.message,
  detail: state.modal.modal.detail
})

const mapStateToPropsModalCircular = (state = { modal: INITIAL_STATE_MODAL }) => ({
  open: state.modal.circle.open,
  message: state.modal.circle.message
})

export const Modal = connect(
  mapStateToPropsModal,
  mapDispatchToProps
)(modal)

export const ModalCircular = connect(
  mapStateToPropsModalCircular,
  mapDispatchToProps
)(circular)