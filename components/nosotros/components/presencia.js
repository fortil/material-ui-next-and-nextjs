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

const data = [
  {
    id: 1,
    dir: 'LA CABAÑA - GLP',
    city: 'SALADOBLANCO',
    lat: 1.998039, lng: -76.121376
  },
  {
    id: 2,
    dir: 'LOS CAUCHOS - GLP',
    city: 'SAN AGUSTIN',
    lat: 1.841862, lng: -76.228277
  },
  {
    id: 3,
    dir: 'MARTICAS - GLP',
    city: 'ACEVEDO',
    lat: 1.772001, lng: -75.905572
  },
  {
    id: 4,
    dir: 'ACEVEDO - GLP',
    city: 'ACEVEDO',
    lat: 1.804375, lng: -75.888937
  },
  {
    id: 5,
    dir: 'COLOMBIA - GLP',
    city: 'COLOMBIA',
    lat: 3.380489, lng: -74.804887
  },
  {
    id: 6,
    dir: 'ELIAS - GLP',
    city: 'ELIAS',
    lat: 2.012118, lng: -75.937407
  },
  {
    id: 7,
    dir: 'IQUIRA - GLP',
    city: 'IQUIRA',
    lat: 2.651906, lng: -75.632009
  },
  {
    id: 8,
    dir: 'OBANDO - GLP',
    city: 'SAN AGUSTIN',
    lat: 1.945251, lng: -76.303561
  },
  {
    id: 9,
    dir: 'PALESTINA - GLP',
    city: 'PALESTINA',
    lat: 1.72423, lng: -76.136521
  },
  {
    id: 10,
    dir: 'SAN ADOLFO - GLP',
    city: 'ACEVEDO',
    lat: 1.714304, lng: -76.022031
  },
  {
    id: 11,
    dir: 'ISNOS - GLP',
    city: 'ISNOS',
    lat: 1.928826, lng: -76.21367
  },
  {
    id: 12,
    dir: 'MORELIA - GLP',
    city: 'SALADO BLANCO',
    lat: 2.067229, lng: -76.186929
  },
  {
    id: 13,
    dir: 'ORITOGUAZ - GLP',
    city: 'ELIAS',
    lat: 1.986959, lng: -76.011363
  },
  {
    id: 14,
    dir: 'EL PALMAR - GLP',
    city: 'SAN AGUSTIN',
    lat: 1.961104, lng: -76.289351
  },
  {
    id: 15,
    dir: 'OPORAPA - GLP',
    city: 'OPORAPA',
    lat: 2.021514, lng: -75.99415
  },
  {
    id: 16,
    dir: 'POTRERILLO - GLP',
    city: 'ELIAS',
    lat: 1.990249, lng: -75.963739
  },
  {
    id: 17,
    dir: 'EL SOCORRO - GLP',
    city: 'PITAL',
    lat: 2.326262, lng: -75.84174
  },
  {
    id: 18,
    dir: 'VALENCIA LA PAZ - GLP',
    city: 'IQUIRA',
    lat: 2.693838, lng: -75.617105
  },
  {
    id: 19,
    dir: 'LA ARGENTINA - GLP',
    city: 'LA ARGENTINA',
    lat: 2.200977, lng: -75.980772
  },
  {
    id: 20,
    dir: 'NATAGA - GLP',
    city: 'NATAGA',
    lat: 2.547141, lng: -75.806579
  },
  {
    id: 21,
    dir: 'SANTA MARIA - GLP',
    city: 'SANTA MARIA',
    lat: 2.942454, lng: -75.581951
  },
  {
    id: 22,
    dir: 'SALADO BLANCO - GLP',
    city: 'SALADO BLANCO',
    lat: 1.993312, lng: -76.04362
  },
  {
    id: 23,
    dir: 'SALTO DE BORDONES - GLP',
    city: 'ISNOS',
    lat: 2.01729, lng: -76.187108
  },
  {
    id: 24,
    dir: 'SAN MARCOS - GLP',
    city: 'ACEVEDO',
    lat: 1.74231, lng: -75.96543
  },
  {
    id: 25,
    dir: 'LA MARIA - GLP',
    city: 'LA SANTA MARIA',
    lat: 2.91425, lng: -75.63489
  },
  {
    id: 26,
    dir: 'RIO NEGRO - GLP',
    city: 'IQUIRA',
    lat: 2.687814, lng: -75.74658
  },
  {
    id: 27,
    dir: 'SAN ROQUE - GLP',
    city: 'OPORAPA',
    lat: 2.061934, lng: -76.006025
  },
  {
    id: 28,
    dir: 'PATIO BONITO - GLP',
    city: 'NÁTAGA',
    lat: 2.650428, lng: -75.763227
  },
  {
    id: 29,
    dir: 'LLANO DE LA VIRGEN - GLP',
    city: 'ALTAMIRA',
    lat: 2.153457, lng: -75.688721
  },
  {
    id: 30,
    dir: 'BELEN - GLP',
    city: 'ISNOS',
    lat: 1.89923, lng: -76.178146
  },
  {
    id: 31,
    dir: 'CABECERA - PUEBLO VIEJO - GLP',
    city: 'ACEVEDO',
    lat: 1.804375, lng: -75.888937
  },
  {
    id: 32,
    dir: 'RIO CHIQUITO - GLP',
    city: 'INZA',
    lat: 2.662039, lng: -75.782493
  },
  {
    id: 33,
    dir: 'INZÁ - GLP',
    city: 'INZÁ',
    lat: 2.551218, lng: -76.062079
  },
  {
    id: 34,
    dir: 'BELALCÁZAR - GLP',
    city: 'PÁEZ',
    lat: 2.628316, lng: -75.976701
  },
  {
    id: 35,
    dir: 'ITAIBE - GLP',
    city: 'PÁEZ',
    lat: 2.480317, lng: -75.851073
  },
  {
    id: 36,
    dir: 'CIENAGA CHIQUITA - GLP',
    city: 'ISNOS',
    lat: 1.94532, lng: -76.185603
  },
  {
    id: 37,
    dir: 'LAS MINAS - GLP',
    city: 'PITAL',
    lat: 2.256546, lng: -75.865439
  },
  {
    id: 38,
    dir: 'EL CARMEN - GLP',
    city: 'OPORAPA',
    lat: 2.02128, lng: -76.03598
  },
  {
    id: 39,
    dir: 'LA ESPERANZA - GLP',
    city: 'PALESTINA',
    lat: 1.772993, lng: -76.120367
  },
  {
    id: 40,
    dir: 'PEDREGAL - GLP',
    city: 'INZÁ',
    lat: 2.521116, lng: -76.001114
  },
  {
    id: 41,
    dir: 'ALTO DEL OBISPO - GLP',
    city: 'SAN AGUSTIN',
    lat: 1.837994, lng: -76.265122
  },
  {
    id: 42,
    dir: 'SAN VICENTE - GLP',
    city: 'ISNOS',
    lat: 1.997882, lng: -76.249639
  },
  {
    id: 43,
    dir: 'SAN MARCOS - GLP',
    city: 'COLOMBIA',
    lat: 3.531409, lng: -74.720315
  },
  {
    id: 44,
    dir: 'MOCOA - GNC',
    city: 'MOCOA',
    lat: 1.175677, lng: -76.648859
  },
  {
    id: 45,
    dir: 'PUERTO ASIS - GNC',
    city: 'PUERTO ASIS',
    lat: 0.519408, lng: -76.516594
  },
  {
    id: 46,
    dir: 'PUERTO CAICEDO - GNC',
    city: 'PUERTO CAICEDO',
    lat: 0.674837, lng: -76.601649
  },
  {
    id: 47,
    dir: 'ALTAMIRA - GNC',
    city: 'ALTAMIRA',
    lat: 2.066422, lng: -75.786774
  },
  {
    id: 48,
    dir: 'GUADALUPE - GNC',
    city: 'GUADALUPE',
    lat: 2.022132, lng: -75.759283
  },
  {
    id: 49,
    dir: 'AGRADO - GNC',
    city: 'AGRADO',
    lat: 2.257198, lng: -75.775882
  },
  {
    id: 50,
    dir: 'PITALITO - GNC',
    city: 'PITALITO',
    lat: 1.86705, lng: -76.044195
  },
  {
    id: 51,
    dir: 'SAN AGUSTIN - GNC',
    city: 'SAN AGUSTIN',
    lat: 1.875535, lng: -76.261911
  },
  {
    id: 52,
    dir: 'SUAZA - GNC',
    city: 'SUAZA',
    lat: 1.975516, lng: -75.79234
  },
  {
    id: 53,
    dir: 'TIMANA - GNC',
    city: 'TIMANA',
    lat: 1.980471, lng: -75.933072
  },
  {
    id: 54,
    dir: 'PITAL - DESHABILITADA - GNC',
    city: 'PITAL',
    lat: 2.26499, lng: -75.799998
  },
  {
    id: 55,
    dir: 'PUERTO UMBRIA - GNC',
    city: 'VILLAGARZON',
    lat: 0.854783, lng: -76.576294
  },
  {
    id: 56,
    dir: 'VILLAGARZON - GNC',
    city: 'VILLAGARZON',
    lat: 1.008707, lng: -76.614173
  },
  {
    id: 57,
    dir: 'NEIVA - GNC',
    city: 'NEIVA',
    lat: 2.952961, lng: -75.287042
  },

  // {
  //   id: 1,
  //   dir: 'Cra. 16 No. 46-24 - Barrio Los Pinos',
  //   tel: '866 2076',
  //   cel: '311 812 1591',
  //   city: 'Neiva - Huila',
  //   lat: 2.9414479, lng: -75.2846907
  // },
  // {
  //   id: 2,
  //   dir: 'Cra. 1B No. 4 - 58',
  //   tel: '835 2592 - 836 7407',
  //   cel: '312 351 2890',
  //   city: 'Pitalito - Huila',
  //   lat: 1.8497568, lng: -76.0467906
  // },
  // {
  //   id: 3,
  //   dir: 'Salida a Pitalito KM2 Barrio la Reserva Estación de Servicio SURGAS S.A. E.S.P.',
  //   cel: '321 375 3539',
  //   city: 'Mocoa - Putumayo',
  //   lat: 1.1586967, lng: -76.6480133
  // },
  // {
  //   id: 4,
  //   dir: 'Cra 19 N. 11-54 Barrio Las Americas',
  //   cel: '316 397 3186',
  //   city: 'Puerto Asís - Putumayo',
  //   lat: 0.5131992, lng: -76.5019078
  // },
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