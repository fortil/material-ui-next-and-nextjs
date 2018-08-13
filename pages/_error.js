import React from 'react'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  renderMsg = () => {
    if (/\/admin\//.test(this.props.url.asPath)) {
      return <p>Si intentaste recargar en admin y te aparece este error es porque hemos deshabilitado esta función por seguridad. <a href="/admin">Click Aquí</a> Para volver.</p>
    } else {
      return <p>Ha ocurrido un error en el servidor, por favor pongase en contacto con nostros a informar de este error lo más pronto posible</p>
    }
  }

  render() {    
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', flexFlow: 'column wrap' }}>
        <div style={{
          maxWidth: '50%', display: 'flex', alignItems: 'center', flexFlow: 'column wrap'
        }}>
          <h1>Ocurrió un error {this.props.statusCode}</h1>
          {this.renderMsg()}
        </div>  
      </div>  
    )
  }
}