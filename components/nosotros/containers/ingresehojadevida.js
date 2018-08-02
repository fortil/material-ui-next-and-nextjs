import { connect } from 'react-redux'
import { /* getCountries, */ sendAttachData } from '../../../lib/http'
// import { INITIAL_STATE_COUNTRIES } from '../../../redux/reducers/countries'
import ingresehojadevida from '../components/ingresehojadevida'

const mapDispatchToProps = dispatch => ({
  // getCountries: () => dispatch(getCountries()),
  sendCV: (data, cb) => dispatch(sendAttachData('cv', data, cb)),
})

// const mapStateToProps = (state = INITIAL_STATE_COUNTRIES) => ({
//   countries: state.countries.data
// })

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(ingresehojadevida)