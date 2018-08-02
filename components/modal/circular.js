import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'

function Transition(props) {
  return <Slide direction="up" {...props} />
}
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class CircularDeterminate extends React.Component {
  state = {
    completed: 0,
  };
  handleClose = yOn => {
    this.props.closeModal(yOn, 'CLOSE_MODAL_CIRCLE')
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer;

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed === 100 ? 0 : completed + 1 });
  }

  render() {
    const { classes, open, message } = this.props
    if (!open) {
      clearInterval(this.timer)
      this.handleClose(false)
    }
    return (
      <Dialog
        open={open}
        transition={Transition}
        keepMounted
        // onClose={() => this.handleClose(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {message || ''}
        </DialogTitle>
        <DialogContent className={classes.flex}>
          <CircularProgress
            className={classes.progress}
            variant="determinate"
            size={50}
            value={this.state.completed}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularDeterminate)