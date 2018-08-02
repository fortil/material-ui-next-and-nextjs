export default {
  headerRow: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    maxHeight: '100%',
  },
  headerColumn: {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',
    flexGrow: 1,
    flexDirection: 'column',
  },
  containerHeader: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    transition: 'ease height 300ms',
    '&': {
      '@media (min-width: 1200px)': {
        maxWidth: 1140
      },
      // '@media (min-width: 375px)': {
      // },
      // '@media (max-width: 376px)': {
      //   alignItems: 'center',
      // },
    }
  }
}