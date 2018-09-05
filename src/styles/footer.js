import image from '../../static/footer.png'

export default {
  footer: {
    // background: '#cf8100',
    backgroundImage: `url(${image})`,
    borderTop: '4px solid #cf8100',
    fontSize: '0.9em',
    // marginTop: 50,
    padding: '70px 0 0',
    position: 'relative',
    clear: 'both',
    '& p': {
      marginTop: '0.8rem',
      marginBottom: '0.8rem',
      color: 'white',
      textAlign: 'left'
    },
    '& b': {
      color: 'white',
      // textAlign: 'center'
    }
  }
}