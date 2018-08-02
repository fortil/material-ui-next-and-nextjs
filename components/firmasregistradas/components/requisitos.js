import React, { Component } from 'react'
import { globalStyles, flex, colors } from '../../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

const STYLES = () => ({
  ...flex,
  ...globalStyles,
  textStyle: {
    textAlign: 'justify'
  },
  title: {
    color: colors.crSecondary
  },
  styleText: {
    fontSize: 13,
  }
})

class Historia extends Component {
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, h3, mb4, textCenter, title, p0 } = classes

    return (
      <article className={[seccion, m0, p0].join(' ')}>
        <Grid container className={container}>
          <Grid item xs={12} className={[classes.justifyText, classes.styleText].join(' ')}>
            {/* <img src="../../static/historia.jpg" className={mb4} style={{ maxWidth: '100%', height: 'auto' }} alt="" /> */}
            {/* <h3 className={[h3, textCenter, title].join(' ')}><strong>Una empresa para beneficio de todos</strong></h3> */}
                {/* <p>&nbsp;</p>
                <p align="justify"><strong>&nbsp;</strong></p> */}
                <p align="justify"><strong>1. Requisitos para inscripción en el registro de constructores de instalaciones internas de gas natural en edificaciones residenciales y comerciales</strong></p>
                <p>&nbsp;</p>
                <p align="justify"><strong>1.1.</strong> La firma constructora y reparadora, debe presentar ante la empresa, la solicitud por escrito, dirigida a SURCOLOMBIANA DE GAS S.A. E.S.P., en donde Solicite la inscripción en el Registro de constructores de Instalaciones Internas de gas natural, junto con los documentos que allí se relacionan, indicando nombre de la persona para la cual se solicita el registro (natural o jurídica), documento de identidad, domicilio y las ciudades donde desarrollara las actividades. La FCR debe Indicar en la solicitud, la dirección de Notificaciones y la dirección de las oficinas ubicadas en las ciudades donde desarrolla sus actividades, en las cuales los usuarios pueden presentar cualquier tipo de petición.</p>
                <p>&nbsp;</p>
                <p align="justify"><strong>1.2.</strong> Certificado de Cámara de Comercio que acredite la existencia y representación legal de la persona jurídica o la inscripción en el registro mercantil de la persona natural que desarrolla la actividad de comercio, para la cual se solicita el registro, con fecha de expedición no mayor a un mes.</p>
                <p>&nbsp;</p>
                <p align="justify"><strong>1.3.</strong> Copia de la Acreditación del registro de la persona para la cual se solicita la inscripción, en el Registro de Fabricantes e Importadores ante la Superintendencia de Industria y Comercio, conforme lo dispuesto en la Resolución SIC 14471 de 2002, sujeto al cumplimiento de reglamentos técnicos aplicables para el servicio de gas natural.</p>
                <p>&nbsp;</p>
                <p align="justify"><strong>1.4.</strong> Copia de los certificados de competencia laboral vigente de los instaladores que utilizará en la construcción de las instalaciones internas de gas natural, expedidos por un organismo de certificación de personal acreditado ante el Organismo Nacional de Acreditación de Colombia  ONAC o la Superintendencia de Industria y Comercio  SIC, o expedido por el Servicio Nacional de Aprendizaje SENA, en virtud de lo dispuesto en el numeral 1.2.6.3.2. literal g) de la resolución 14471 de 2002.</p>
                <p>&nbsp;</p>
                <p align="justify"><strong>2. Requisitos relativos a la construcción de instalaciones internas para suministro de gas natural en edificaciones residenciales y comerciales.</strong></p>
                <p>&nbsp;</p>
                <p align="justify">Las Empresas o personas inscritas en el Registro de Firmas Constructoras y Reparadoras (FRC) de Surcolombiana de Gas S.A. E.S.P. , deberán cumplir con las siguientes condiciones para el recibo y puesta en servicio de las instalaciones construidas, reformadas, ampliadas o modificadas por estas.</p>
                <p><br /><strong>2.1.</strong><span>&nbsp;Para edificaciones residenciales o comerciales se deberá cumplir con los siguientes requisitos:&nbsp;</span></p>
                  <p align="justify"><strong>a.</strong> Plano(s) Isométrico(s): Plano con el trazado y diámetro de la tubería, ubicación de los gasodomésticos y de las válvulas de corte, debidamente suscrito(s) por el personal calificado que los elaboró.</p>
                  <p>&nbsp;</p>
                  <p align="justify"><strong>b. </strong>Memoria(s) técnica(s) en original, debidamente suscrita(s) por el personal calificado que lo(s) elaboró, en cuyo contenido establezca:</p>
                  <p><br /><strong>i.</strong><span> Perdidas por tramo&nbsp;</span><br /><strong>ii.</strong><span> Clase y número de accesorios por tramo.&nbsp;</span><br /><strong>iii.</strong><span> Potencia de cada uno de los gasodomésticos a instalar&nbsp;</span><br /><strong>iv.</strong><span> Potencia conjunta máxima permitida para cada uno de los recintos donde se proyecte ubicar artefactos a gas.&nbsp;</span><br /><strong>v.</strong><span> Método y cálculo de ventilación de cada uno de los espacios confinados (NTC-3631).</span></p>
                    <p>&nbsp;</p>
                    <p align="justify"><strong>c.</strong> Fotocopia del Certificado de competencia laboral vigente de quien construya, reforme, amplíe o modifique la instalación y de quien realiza la adecuación del gasodoméstico.</p>
                    <p>&nbsp;</p>
                    <p align="justify"><strong>d.</strong> Certificado de materiales: Podrá probarse por uno cualquiera de los siguientes documentos: Certificado de conformidad, Declaración del distribuidor o comercializador del producto autorizado para Colombia o Informe de resultados de ensayos realizados al producto por el fabricante o distribuidor.</p>
                    <p>&nbsp;</p>
                    <p align="justify"><strong>e.</strong> Fotocopia del Registro SIC del Instalador si es por primera vez, de lo contrario, se verificará el registro del constructor en la página web.</p>
                    <p>&nbsp;</p>
                    <p align="justify">Cuando se realicen modificaciones en instalaciones internas para suministro de gas natural en servicio, se deberá notificar inmediatamente por parte del usuario al distribuidor a fin de que SURCOLOMBIANA DE GAS S.A. E.S.P. la revise frente a los requisitos establecidos en el numeral 1.2.6. de la Resolución SIC 14471 de 2002.</p>
                    <p align="justify">NOTA: El numeral 1.2.3.4.2 de la Resolución 14471 de 2002 expedida por la Superintendencia de Industria y Comercio, establece en el evento de diseño de una instalación para el suministro de gas combustible en edificación residencial o comercial nueva o que no esté legalizada, lo siguiente:</p>
                    <p><br /><strong>&#147;1.2.6.3.4.2 Verificación por autoridades municipales</strong><span>&nbsp;</span><br /><br /></p>
                      <p align="justify"><strong>a)</strong>&nbsp;Como parte integral del trámite de expedición de licencia de construcción de una edificación residencial o comercial nueva o que no esté legalizada, en cuyo diseño se contemple la instalación para el suministro de gas combustible, ésta deberá tener como responsable del diseño a un profesional calificado en la materia y este diseño deberá estar previamente aprobado por la empresa distribuidora como requisito de calidad e idoneidad para ser presentado ante el alcalde, curador urbano o autoridad competente para su estudio de acuerdo a lo señalado en los artículos 43 letra f) y 44 del decreto 3466 de 1982. En consecuencia, además de los requisitos exigidos por las correspondientes autoridades, se deberá presentar la siguiente documentación:</p>
                      <p>&nbsp;</p>
                      <p align="justify"><strong>1)</strong>&nbsp;Memoria técnica, con descripción detallada del proyecto de la instalación para el suministro de gas combustible y los respectivos planos firmados por un Ingeniero o Arquitecto, graduado, matriculado y con tarjeta profesional vigente.</p>
                      <p>&nbsp;</p>
                      <p align="justify"><strong>2)</strong>&nbsp;Aprobación por parte de la empresa distribuidora de gas, con concepto sobre la disponibilidad de la prestación del servicio en el sitio de construcción de la instalación.</p>
                      <p>&nbsp;</p>
                      <p align="justify"><strong>2.2.</strong>&nbsp;Los materiales y equipos a utilizar en la construcción, ampliación y/o reforma de cada instalación para suministro de gas natural deberán ser exclusivamente aquellos que han sido diseñados para la conducción de gas natural; en los casos que los materiales o equipos se encuentren sujetos al cumplimiento de reglamento técnico o norma técnica colombiana oficial obligatoria, estos deberán contar con el correspondiente certificado de conformidad expedido por un organismo acreditado por la Superintendencia de Industria y Comercio o con el certificado de calidad de producto o norma técnica a través de una entidad acreditada.</p>
                      <p align="justify"><strong>2.3.</strong>&nbsp;La instalación interna deberá ser certificada por un Organismo de Inspección acreditado por la Superintendencia de Industria y Comercio o por el Organismo Nacional de Acreditación de Colombia  ONAC, que pueda emitir el certificado de conformidad de la instalación interna de gas natural, tal como lo ordena en el numeral 1.2.6.4. de la resolución 14471 de 2002 proferida por la mencionada Superintendencia. Al momento de la venta se deberá hacer entrega de los siguientes documentos:</p>
                      <p>&nbsp;</p>
                      <p align="justify">- Planos Isométricos (Plano con el trazado de la tubería y ubicación de los Gasodomésticos y de las válvulas de corte y los diámetros de la tubería.)</p>
                      <p>&nbsp;</p>
                      <p align="justify">- Memorias técnicas (en original donde se establezcan los cálculos de ventilación, máxima potencia a instalar, la máxima potencia permitida en kilovatios para cada punto de salida y la presión de suministro de gas que se obtendrá en el mismo, cálculos de diámetros y presiones, firmado por el responsable de la construcción de la instalación).</p>
                      <p>&nbsp;</p>
                      <p align="justify">- Certificado de competencia laboral (tanto como del que construye la instalación, como de quien realiza la adecuación del gasodoméstico).</p>
                      <p>&nbsp;</p>
                      <p align="justify">- Certificado de materiales (mediante cualquiera de los siguientes documentos Certificado de conformidad o Declaración del distribuidor o comercializador del producto autorizado para Colombia o Informe de resultados de ensayos realizados al producto por el fabricante o distribuidor).</p>
                      <p><br /><span>- Fotocopia del Registro SIC del Instalador.</span></p>
                      <p>&nbsp;</p>
                      <p align="justify"><strong>2.4</strong>&nbsp;Documento en el que se declare expresamente que de acuerdo con la información contenida en el artefacto instalado, éste no supera la potencia máxima permitida en kilovatios para el punto de salida. As í mismo, deberá declarar que el artefacto se adecua a la presión de suministro de gas que se obtiene en el punto de salida y al tipo de gas que se suministrará, cuando aplique.</p>
                      <p align="justify"><strong>2.5</strong>&nbsp;Características de construcción de los artefactos, y localización de los mismos de acuerdo a la resolución 1023 del 2004 y resolución 14471, en donde se establezca el correcto uso, instalación y mantenimiento, (cuando aplique).</p>
                      <p align="justify"><strong>2.6</strong>&nbsp;Requerimientos de aire, métodos de ventilación utilizados y cálculos realizados para verificar confinamiento, (cuando aplique).</p>
                      <p align="justify"><strong>2.7</strong>&nbsp;Documento en el que se declare expresamente que no se han hecho modificaciones al artefacto, o en caso de haberlas, se señale expresamente las modificaciones efectuadas, cuando aplique.</p>
                      <p align="justify"><strong>2.8</strong>&nbsp;El constructor deberá comprometerse con el cumplimiento de normas técnicas nacionales y las especificaciones técnicas exigidas para la construcción de instalaciones internas de gas natural en edificaciones de uso residencial, en edificaciones multifamiliares (edificios y conjuntos residenciales), y comerciales y a cumplir con los demás requisitos exigidos por la ley.</p>
                      <p align="justify">&nbsp;</p>
          </Grid>
        </Grid>
      </article>
    );
  }
}

Historia.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiHistoria' })(Historia)