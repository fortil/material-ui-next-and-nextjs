import React, { Component } from 'react'
import { globalStyles, flex, nosotros, colors } from '../../../src/styles'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
const texto = `<p class='p'>El compromiso y la aprehensión de una cultura de calidad por parte de los funcionarios, ha logrado
generar un mayor sentido de pertenencia y una mayor productividad debido a la minimización de
errores que puedan generar reprocesos, esto contribuyendo de forma sistemática a un
mejoramiento continuo que deja como evidencia la otorgación de un certificado de calidad ISO
9001 para la compaña desde el año 2015.</p>
<p class='p'>Cuando hablamos en nuestra compañía de que contamos con Sistemas de Gestión certificados,
transmitimos a todos nuestros grupos de interés, clientes, accionistas, gobierno, proveedores,
colaboradores y comunidad en general, la imagen de una empresa confiable que trabaja con la
más alta calidad del servicio, y con un enfoque de efectividad en todos sus procesos.</p>
<p class='p'>Los Sistemas de Gestión, entre los requisitos para su implementación, contemplan la necesidad de
disponer del personal competente, la adquisición, almacenamiento y uso de materiales amigables
con el ambiente y con los colaboradores, el mantenimiento adecuado de la infraestructura, la
estandarización de métodos de trabajo, el establecimiento de condiciones ambiéntales que
favorezcan el producto y entorno, la utilización de instrumentos de medición adecuados, todos y
cada uno de ellos orientados a la disminución de los riesgos asociados con las consecuentes
ventajas del uso racional de los recursos.</p> 
<p class='p'>La adopción y certificación de los Sistemas de Gestión surgen como una decisión estratégica de la
compañía, motivada por intenciones de mejorar continuamente su desempeño y proyectarla como
una empresa sostenible a largo plazo y como parte de su enfoque de responsabilidad social
empresarial. Dentro de los principales beneficios que traen para nuestra empresa estas
certificaciones podemos mencionar:.</p>
<ul>
<li type="line" class='p'>Ordenamiento de la estructura interna, que facilita la definición de objetivos, autoridades y
responsabilidades, así como una comunicación más fluida, que facilita el logro de los
objetivos.</li>
<li type="line" class='p'>Incremento de la satisfacción de nuestros clientes, mediante procesos más efectivos que permitan el mejoramiento continuo.</li>
<li type="line" class='p'>Reducción de costos, a partir de menores costos por reprocesos, reclamos de clientes, pérdidas de materiales y la minimización de los tiempos de ciclos de trabajo.</li>
<li type="line" class='p'>Ambientes de trabajo seguro y saludable que previenen lesiones y enfermedades laborales.</li>
<li type="line" class='p'>Prevención de la contaminación y la preservación del medio ambiente, mediante el control de los impactos negativos que puedan generar nuestra operación.</li>
<li type="line" class='p'>Control adecuado de los riesgos que puedan afectar significativamente el negocio.</li>
<li type="line" class='p'>Cumplimiento de los requisitos legales y otros aplicables.</li>
</ul>

<p class='p'>Por todo lo anterior, es importante para nuestra organización contar con estos Sistemas de Gestión que se constituyen en valiosas herramientas de apoyo para los responsables de los procesos, garantizándonos el logro efectivo de todos los objetivos trazados.</p>
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
`

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