import React, { Component } from 'react'
import Layout from '../layouts/main'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import { globalStyles, flex } from '../src/styles'

const STYLES = theme => ({
  ...flex,
  ...globalStyles,
  textStyle: {
    textAlign: 'justify'
  },
  contenedor: {
    '&': {
      '@media (min-width: 768px)': {
        maxWidth: '60%'
      }
    }
  },
  title: {
    // color: colors.crSecondary,
    color: '#4b4b4b',
  }
})

class NuestrosServicios extends Component {
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, h3, mb4, textCenter, title, p0 } = classes

    return (
      <Layout title="NuestrosServicios" page="NuestrosServicios">
        <article id="que-es-gas-natural" className={[seccion, m0, p0].join(' ')}>
          <Grid container className={[container, classes.contenedor].join(' ')}>
            <Grid item xs={12} className={classes.justifyText} style={{ marginTop: 20, fontSize: 14 }}>
              <h3 className={[h3, textCenter, title].join(' ')}><strong>¿QUÉ ES EL GAS NATURAL?</strong></h3>
              <p>Es una fuente de energía limpia de procedencia fósil, que se encuentra en grandes cantidades en yacimientos subterráneos, la cual aporta el máximo confort doméstico y provee a la industria de la energía necesaria para su funcionamiento. No deteriora la naturaleza o estropea los paisajes y lugares por los que atraviesan sus conducciones, puesto que se transporta por canalizaciones subterráneas.</p>
              <div className={textCenter} style={{ maxWidth: '100%', height: 'auto' }}><img src="../../static/que es el gas N.png" className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt="Qué es el gas natural" /></div>

              <p>Es un gas limpio, sin color y sin olor, pero como medida de seguridad se le agrega una sustancia química denominada odorizante, con el fin de detectarlo en caso de fuga.</p>
            </Grid>
          </Grid>
        </article>
        <article id="instalacion" className={[seccion, m0, p0].join(' ')}>
          <Grid container className={[container, classes.contenedor].join(' ')}>
            <Grid item xs={12} className={classes.justifyText} style={{ marginTop: 20, fontSize: 14 }}>
              <h3 className={[h3, textCenter, title].join(' ')}><strong>INSTALACIÓN DE GAS NATURAL</strong></h3>
              <h3>Como está compuesta una instalación de gas natural?</h3>
              <p>Las instalaciones de gas natural están compuestas por un conjunto de tuberías y accesorios necesarios para llevar el gas desde la parte exterior de las viviendas hasta los gasodomésticos.</p>
              <h4>1. Acometida externa</h4>
              <p>El operador o distribuidor de gas natural (Surcolombiana de Gas S.A. ESP) posee una red urbana a la cual se conecta la acometida que va hasta el medidor o contador, allí va instalada una válvula de cierre rápido (1/4 de giro) que permite cortar el suministro en un caso requerido.</p>
              <h4>2. Centro de Medición</h4>
              <p>Comprende el sistema de regulación y medición, en donde se registrará el volumen de gas que el usuario consuma periódicamente.</p>
              <p>No altere los equipos del centro de medición, pues ello ocasiona riesgos para su familia y sus vecinos.</p>
              <p>La revisión del centro de medición sólo debe efectuarse por personal de Surcolombiana de Gas S. A. ESP, reporte inmediatamente a la empresa sobre cualquier irregularidad que detecte en su equipo de medición a nuestra línea de servicio al cliente.</p>
              <p>La rotura de sellos y la manipulación o alteración de los equipos de medición constituyen fraude y dan lugar a la terminación del contrato y a las acciones penales correspondientes.</p>
              <h4>3. Red Interna</h4>
              <p>Desde el contador o medidor se derivan los tubos que conducen el gas hasta la estufa y/o el calentador de agua o cualquier otro gasodoméstico. Todo este conjunto es propiedad del cliente y por ende, la responsabilidad del buen manejo, conservación y uso dependen de él.</p>
              <h4>4. Sistemas de Seguridad</h4>
              <p>La instalación de gas natural cuenta con un sistema de válvulas de corte que permiten el fácil control del suministro de gas cuando se presente un problema. Generalmente existen dos válvulas, una a la entrada del centro de medición y otra para controlar el paso de gas a cada artefacto o gasodoméstico.</p>
              <h4>Recomendaciones y cuidados con su instalación interna.</h4>
              <ul>
                <li>No utilice la instalación interna para colgar objetos.</li>
                <li>Si va a realizar trabajos sobre las paredes de su vivienda, verifique el trazado de la instalación de gas para evitar un daño.</li>
                <li>Contrate únicamente los servicios de un instalador, con certificado de competencia laboral vigente emitido por el SENA, u otro organismo de acreditación (exija carné), para la construcción o modificación de su instalación interna, así como para la instalación de sus artefactos a gas.</li>
                <li>Este instalador deberá laborar con una firma instaladora inscrita y autorizada por la SIC (Superintendencia de Industria y Comercio).</li>
                <li>Como norma de seguridad, Surcolombiana de Gas S. A. ESP, realizará una inspección general de su instalación interna por lo menos una vez cada cinco (5) años.</li>
                <li>Si efectúa modificaciones a su instalación interna, recuerde que debe reportarla a la Oficina de Servicio al Cliente de Surcolombiana de Gas S. A. ESP, más cercana.</li>
                <li>No extienda cables eléctricos alrededor de la tubería de gas, ni la use como toma de tierra de aparatos eléctricos.</li>
                <li>No coloque materiales inflamables o corrosivos cerca de la llama de un gasodoméstico, ni de su instalación de gas.</li>
                <li>En ausencias largas cierre la válvula de corte de gas.</li>
                <li>No deje los quemadores prendidos cuando no los esté utilizando.</li>
                <li>Evite que se derramen líquidos sobre los quemadores, pues al apagarse la llama se escapa el gas.</li>
              </ul>
              <div className={textCenter} style={{ maxWidth: '100%', height: 'auto' }}><img src="../../static/instalacion_gas.png" className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt="Instalación Gas Natural" /></div>
              <h4>¿Qué hacer si huele a gas?</h4>
              <ul>
                <li>Cierre todas las válvulas de paso de los artefactos a gas.</li>
                <li>Proporcione adecuada ventilación en toda la vivienda, abriendo puertas y ventanas para crear corrientes de aire.</li>
                <li>No accione interruptores eléctricos, ni encienda fósforos o cigarrillos.</li>
                <li>No utilice el teléfono de su residencia o su celular personal al interior de la vivienda. Comuníquese con nuestra línea de emergencias a través del teléfono de un vecino.</li>
                <li>Si el olor es muy fuerte, realice las operaciones anteriores y evacue la vivienda inmediatamente.</li>
                <li>Si el escape es fuera de su casa o detecta algún ruido extraño en el centro de medición, llame inmediatamente a nuestra oficina.</li>
                <li>Espere la llegada del personal de emergencias de Surcolombiana de Gas S.A. ESP., y acate sus recomendaciones.</li>
              </ul>
              <div className={textCenter} style={{ maxWidth: '100%', height: 'auto' }}>
                <img src="../../static/gas/1.png" className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt="Instalación Gas Natural" />
                <img src="../../static/gas/2.png" className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt="Instalación Gas Natural" />
                <img src="../../static/gas/3.png" className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt="Instalación Gas Natural" />
                <img src="../../static/gas/4.png" className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt="Instalación Gas Natural" />
              </div>
              <p></p>
            </Grid>
          </Grid>
        </article>
        <article id="que-es-gas-natural-comprimido" className={[seccion, m0, p0].join(' ')}>
          <Grid container className={[container, classes.contenedor].join(' ')}>
            <Grid item xs={12} className={classes.justifyText} style={{ marginTop: 20, fontSize: 14 }}>
              <h3 className={[h3, textCenter, title].join(' ')}><strong>¿QUÉ ES EL GAS NATURAL COMPRIMIDO?</strong></h3>
              <p>Más conocido por la sigla GNC, es esencialmente gas natural almacenado a altas presiones. Es un combustible para uso vehicular y residencial, utilizado en este último caso, en aquellos lugares donde la demanda a atender es pequeña y la distancia de transporte es larga.</p>

              <p>El GNC requiere las siguientes etapas:</p>
              <ol>
                <li><b>La compresión:</b> se toma el gas natural del campo de producción, de un gasoducto de transporte o de una red de distribución y mediante compresores se aumenta la presión del gas que se deposita en cilindros o tanques diseñados para el caso. La presión máxima utilizada para el gas comprimido es de 3600 psi.</li>
                <li><b>El transporte y almacenamiento:</b> los cilindros o tanques se transportan en vehícolos por carretera o vía fluvial.</li>
                <li><b>La descompresión:</b> utilizando válvulas para expandir el gas se reduce la presión y se inyecta el gas a las redes de distribución para llevarlo a los usuarios finales. </li>
              </ol>
              <h4>BENEFICIOS DEL GAS NATURAL:</h4>
              <h4>Seguridad.</h4>
              <p>Utiliza redes domiciliarias, con las más altas especificaciones de calidad. No es toxico ni corrosivo, y se disipa rápidamente cuando hay alguna fuga.</p>
              <h4>Economía.</h4>
              <p>Es el combustible más económico disponible en el mercado. Con gas natural solo paga lo que consume.</p>
              <h4>Limpieza.</h4>
              <p>El gas natural no deja partículas sólidas ni hollín, no ensucia sus artefactos a gas, ni su cocina. Por ser una energía natural, preserva el medio ambiente. La combustión del gas natural produce una mínima cantidad de residuos contaminantes.</p>
              <h4>Comodidad.</h4>
              <p>El gas natural llega por tubería directamente a los hogares, al comercio y a la industria. No tiene que cargar ni recargar incómodos y pesados cilindros. Podrá cocinar, hornear, secar la ropa, además de disfrutar del agua caliente, la calefacción, la chimenea y muchas aplicaciones más.</p>
              <h4>Servicio.</h4>
              <p>Surcolombiana de Gas S. A. ESP atenderá con gusto sus solicitudes e inquietudes. Personal especializado le garantizará un mejor servicio.</p>
            </Grid>
          </Grid>
        </article>
      </Layout>
    )
  }
};

NuestrosServicios.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiNuestrosServicios' })(NuestrosServicios)
