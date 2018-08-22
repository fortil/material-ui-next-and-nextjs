import React, { Component } from 'react'
import { globalStyles, flex, nosotros, colors } from '../../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
const texto = `<p class='p'>El compromiso y la aprehensión de una cultura de calidad por parte de los funcionarios, ha logrado generar un mayor sentido de pertenencia y una mayor productividad debido a la minimización de errores que puedan generar reprocesos, esto contribuyendo de forma sistematica a un mejoramiento continuo que deja como evidencia la otorgación de un certificado de calidad ISO 9001 para la compaña desde el año 2007.</p>

<h3>Política Del Sistema Integrado De Gestión HSEQ </h3>
<p class='p'><b>SURCOLOMBIANA DE GAS S.A. E.S.P.</b>, garantiza la construcción de instalaciones para asegurar la prestación del servicio público de gas natural, bajo condiciones de seguridad y confiabilidad. Satisfaciendo de manera oportuna las necesidades de nuestros clientes, cumpliendo con los requisitos legales y normativos del Sistema integrado HSEQ, comprometidos con la Calidad, Seguridad y Salud en el Trabajo, la protección del medio ambiente; previniendo los accidentes de trabajo, lesión a personas, enfermedades laborales, contaminación ambiental y daño a la propiedad, mediante la identificación y control de los peligros, valoración de los riesgos, aspectos e impactos, y análisis de vulnerabilidad en emergencias, dirigido a todos los trabajadores, incluyendo a los contratistas y partes interesadas.</p>
<p class='p'><b>SURCOLOMBIANA DE GAS S.A. E.S.P</b> cuenta con la asignación de recursos financieros, técnicos, y el personal competente, que desarrolla procesos estandarizados y se encuentra comprometido con el mejoramiento continuo del sistema integrado de Gestión HSEQ.</p>
<h3>Mapa de Procesos </h3>
<img src="../../../static/sgc/mapa.jpg" alt="mapa processos surgas" width="100%"/>
<h3>Objetivos Estratégicos Del Sistema Integrado De Gestión de Calidad - (HSEQ)</h3>
<ul>
<li type="line" class='p'>Cumplir con la promesa básica de prestación del servicio en máximo 10 días calendario.</li>
<li type="line" class='p'>Cumplir con los requisitos de la normatividad técnica en todas las construcciones.</li>
<li type="line" class='p'>Aumentar la densificación de redes en un 80%.</li>
<li type="line" class='p'>Garantizar la satisfacción continua de las necesidades de los clientes 80%.</li>
<li type="line" class='p'>Cumplir con los requisitos contractuales, normas legales y otros requisitos aplicables vigentes.</li>
<li type="line" class='p'>Lograr la efectividad del programa de capacitación en un 80%.</li>
<li type="line" class='p'>Identificar los peligros, evaluar y valorar los riesgos y establecer los respectivos controles.</li>
<li type="line" class='p'>Proteger la seguridad y salud de todos los trabajadores, mediante la mejora continua del Sistema de Gestión de la Seguridad y Salud en el Trabajo, acorde con los factores de riesgo identificados como prioritarios a fin de prevenir la ocurrencia de accidentes de trabajo, lesión a personas, y enfermedades laborales.</li>
<li type="line" class='p'>Disminuir la contaminación ambiental y los efectos perjudiciales de nuestras actividades productos y servicios.</li>
<li type="line" class='p'>Conseguir que la calificación del mejoramiento de los procesos sea superior al 80%.</li>
</ul>
<h3>Certificado APPLUS </h3>
<img src="../../../static/sgc/certificado.jpg" alt="certificado applus surgas" width="100%"/>
<h3>Valores corporativos</h3>
<ul>
<li type="line" class='p'><b>Honestidad:</b> trabajamos bajo lineamientos de bases transparentes que promueven la sinergia en nuestros equipos de trabajo.</li>
<li type="line" class='p'><b>Responsabilidad:</b> Buscamos el desarrollo armónico e integral, que impulsan el cumplimiento de las metas y los retos corporativos.</li>
<li type="line" class='p'><b>Compromiso:</b> Estamos comprometidos con un servicio de calidez para cada hogar del Surcolombiano.</li>
<li type="line" class='p'><b>Liderazgo:</b> Abanderamos día a día proyectos de inclusión a través de nuestro servicio generando un impacto social positivo.</li>
<li type="line" class='p'><b>Respeto:</b> Interactuamos reconociendo los intereses colectivos, la diversidad individual, la sostenibilidad de los recursos naturales y la institucionalidad.</li>
<li type="line" class='p'><b>Lealtad:</b> Nos debemos a nuestros usuarios, por ello trabajamos en la sensibilización y la orientación al servicio.</li>
</ul>
<h3>Construcción de acometidas e instalación de redes internas de gas domiciliario </h3>
<p class='p'>Venta, diseño, construcción, inspección y puesta en servicio de instalaciones internas para suministro de gas natural a usuarios residenciales y comerciales.</p>
<p class='p'>Venta y construcción de acometidas y centros de medición para suministro de gas natural.</p>`

const STYLES = theme => ({
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

class NuestroSGC extends Component {
  render() {
    const { classes } = this.props
    const { section: seccion, m0, container, textStyle, p0 } = classes

    return (
      <article className={[seccion, m0, p0].join(' ')}>
        <Grid container className={container}>
          <Grid item xs={12}>
            <div className={[textStyle, classes.styleText].join(' ')} dangerouslySetInnerHTML={{ __html: texto }}></div>
          </Grid>
        </Grid>
      </article>
    );
  }
}

NuestroSGC.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(STYLES, { name: 'WiNuestroSGC' })(NuestroSGC)