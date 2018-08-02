const generalCols = {
  position: 'relative',
  width: '100%',
  minHeight: 1,
  paddingRight: 15,
  paddingLeft: 15
}

const M = {
  0: '0 !important',
  1: '.25rem !important',
  2: '.25rem !important',
  3: '1rem !important',
  4: '1.5rem !important',
}

export default {
  mobileCss: {
    '&': {
      '@media (max-width: 376px)': {
        width: '100%'
      },
    },
  },
  flex: {
    display: 'flex',
  },
  textCenter: {
    textAlign: 'center !important'
  },
  alignItemsCenter: {
    alignItems: 'center !important'
  },
  m0: {
    margin: M[0]
  },
  mb0: {
    marginBottom: M[0]
  },
  mb1: {
    marginBottom: M[1]
  },
  mb4: {
    marginBottom: M[4]
  },
  mt0: {
    marginTop: M[0]
  },
  mt3: {
    marginTop: M[3]
  },
  mt4: {
    marginTop: M[4]
  },
  p0: {
    padding: M[0]
  },
  justifyContentStart: {
    justifyContent: 'flex-start !important'
  },
  justifyContentEnd: {
    justifyContent: 'flex-end !important'
  },
  justifyContentCenter: {
    justifyContent: 'center !important'
  },
  justifyContentMdStart: {
    '&': {
      '@media (min-width: 768px)': {
        justifyContent: 'flex-start!important'
      }
    }
  },
  textMdLeft: {
    '@media (min-width: 768px)': {
      textAlign: 'left!important'
    }
  },
  colLg8: {
    ...generalCols,
    '&': {
      '@media (min-width: 992px)': {
        flex: '0 0 66.666667%',
        maxWidth: '66.666667%',
      }
    }
  },
  colLg12: {
    ...generalCols,
    '&': {
      '@media (min-width: 992px)': {
        flex: '0 0 100%',
        maxWidth: '100%',
      }
    }
  },
  colMd4: {
    ...generalCols,
    '&': {
      '@media (min-width: 768px)': {
        flex: '0 0 33.333333%',
        maxWidth: '33.333333%',
      }
    }
  },
  col4: {
    ...generalCols,
    flex: '0 0 33.333333%',
    maxWidth: '33.333333%',
  }
}