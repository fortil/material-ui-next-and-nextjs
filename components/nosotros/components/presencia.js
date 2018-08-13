import React, { Component } from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'

const data = [
  {
    id: 1,
    dir: 'Cra. 16 No. 46-24 - Barrio Los Pinos',
    tel: '866 2076',
    cel: '311 812 1591',
    city: 'Neiva - Huila',
    lat: 2.9414479, lng: -75.2846907
  },
  {
    id: 2,
    dir: 'Cra. 1B No. 4 - 58',
    tel: '835 2592 - 836 7407',
    cel: '312 351 2890',
    city: 'Pitalito - Huila',
    lat: 1.8497568, lng: -76.0467906
  },
  {
    id: 3,
    dir: 'Salida a Pitalito KM2 Barrio la Reserva Estación de Servicio SURGAS S.A. E.S.P.',
    cel: '321 375 3539',
    city: 'Mocoa - Putumayo',
    lat: 1.1586967, lng: -76.6480133
  },
  {
    id: 4,
    dir: 'Cra 19 N. 11-54 Barrio Las Americas',
    cel: '316 397 3186',
    city: 'Puerto Asís - Putumayo',
    lat: 0.5131992, lng: -76.5019078
  },
]

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
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCa7BH5_vLUYCIevtvmBnoHnI6LniHSTOw&v=3.exp&libraries=geometry,drawing,places',
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
        {data.map(item => <Marker
          key={item.cel}  
          position={{ lat: item.lat, lng: item.lng }}
          onClick={() => props.onToggleOpen(item)}
        >
          {props.isOpen[item.id] && <InfoWindow onCloseClick={() => props.onToggleOpen(item)}>
            <div>
              <p>{item.dir}</p>
              <p><b>Tel:</b> {item.cel}</p>
            </div>
          </InfoWindow>}
        </Marker>)}
      </MarkerClusterer>
    </GoogleMap>
  )
})

export default Presencia