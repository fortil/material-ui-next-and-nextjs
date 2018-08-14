import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import COMPONENTS from './components'
import WellCome from './welcome'

const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    minHeight: '44px !important'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
})

class IndexAdmin extends React.Component {
  view = ({ page, view, params }) => {
    let props = {}
    if (params) {
      props = JSON.parse(params)
    }
    const Comp = COMPONENTS[page][view]
    return <Comp {...props}/>
  }
  
  render() {
    const { classes, query } = this.props
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          query.page && query.view ? 
            this.view(query) :
            <WellCome />
        }
      </main>
    );
  }
}

IndexAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true, name: 'WiIndexAdmin' })(IndexAdmin)