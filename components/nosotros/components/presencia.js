import React from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
const config = require('../../../config.json')
const data = config['map-points']
const googleMapsKey = config['google_maps_key']
// const data = [
  // {
  //   id: 1,
  //   dir: 'Cra. 16 No. 46-24 - Barrio Los Pinos',
  //   tel: '866 2076',
  //   cel: '311 812 1591',
  //   city: 'Neiva - Huila',
  //   lat: 2.9414479, lng: -75.2846907
  // }
// ]

const Presencia = compose(
  withStateHandlers(() => ({
    isOpen: {}
  }), {
      onToggleOpen: ctx => item => ({
        isOpen: {
          [item.id]: !ctx.isOpen[item.id]
        }
      })
    }
  ),
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `450px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 1.791824, lng: -75.696546 }}>
      <MarkerClusterer
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {data.map((item, i) => <Marker
          key={i}
          position={{ lat: item.lat, lng: item.lng }}
          onClick={() => props.onToggleOpen(item)}
        >
          {props.isOpen[item.id] && <InfoWindow onCloseClick={() => props.onToggleOpen(item)}>
            <div>
              <p>{item.dir}</p>
              {item.city ? <p><b>CITY:</b> {item.city}</p> : ''}
              {item.cel ? <p><b>Tel:</b> {item.cel}</p> : ''}
            </div>
          </InfoWindow>}
        </Marker>)}
      </MarkerClusterer>
    </GoogleMap>
  )
})

export default Presencia