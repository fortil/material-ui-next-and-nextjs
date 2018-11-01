export { default as header } from './header'
export { default as navbar } from './navbar'
export { default as flex } from './flex'
export { default as posts } from './posts'
export { default as footer } from './footer'
export { default as nosotros } from './nosotros'
// import imageBackground from '../../static/nuestra-empresa.png'

export const colors = {
  blue: '#2196f3 !important',
  bgPrimary: '#FFFFFF !important',
  bgSecondary: '#F4F4F4 !important',
  crPrimary: '#1d2127 !important',
  crSecondary: '#777 !important',
}

export const primaryBG = {
  backgroundColor: colors.bgPrimary,
  color: colors.crPrimary,
}


export const globalStyles = {
  centerCropped: {
    width: '100%',
    height: 125,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  },
  deletedIcon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '8px',
    right: '16px',
  },
  h4: {
    fontSize: '1.2em',
    fontWeight: 200,
    letterSpacing: 'normal',
    // lineHeight: 27,
    margin: '0 0 14px 0',
  },
  h2: {
    fontSize: '2.2em',
    fontWeight: 300,
    margin: '0 0 32px 0',
  },
  h3: {
    fontSize: '1.4em',
    fontWeight: 200,
    margin: '0 0 24px 0',
  },
  justifyText: {
    textAlign: 'justify',
    '& p': {
      textAlign: 'justify'
    }
  },
  featureBoxIcon: {
    borderColor: '#ff9c00',
    color: '#ff9c00'
    // borderColor: '#0088CC',
    // color: '#0088CC'
  },
  featureBoxInfo: {
    flex: '1 1 100%',
    paddingLeft: 15,
  },
  container: {
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    '&': {
      '@media (min-width: 576px)': {
        maxWidth: 540
      },
      '@media (min-width: 768px)': {
        maxWidth: 720
      },
      '@media (min-width: 992px)': {
        maxWidth: 960
      },
    }
  },
  section: {
    background: '#f4f4f4',
    borderTop: '5px solid #f1f1f1',
    margin: '30px 0',
    padding: '50px 0',
  },
  sectionNoBackground: {
    // backgroundImage: `url(${imageBackground})`
    // background: 'transparent',
    // borderTopColor: 'transparent',
  },
  lead: {
    fontSize: '1.25rem',
    fontWeight: 300,
    fontHeight: '1.8rem',
    textShadow: '#000 2px 0px 10px',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: -15,
    marginLeft: -15,
  },
  textDark: {
    color: '#2e353e !important'
  },
  '& p': {
    fontSize: '14px important',
  }
}