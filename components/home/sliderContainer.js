import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getImagesSlider } from '../../lib/http'
import { INITIAL_STATE_SLIDERS } from '../../redux/reducers/sliders'
import SliderComponent from './slider'

const mapDispatchToProps = dispatch => ({
  actions: { getImagesSlider: () => dispatch(getImagesSlider()) },
})

const mapStateToProps = (state = { sliders: INITIAL_STATE_SLIDERS }) => ({
  sliders: state.sliders.data
})

class SliderContainer extends Component {
  
  componentWillMount () {
    this.props.actions.getImagesSlider()
  }
  
  render() {
    return (
      <SliderComponent sliders={this.props.sliders} />
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderContainer)