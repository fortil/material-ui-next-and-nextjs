import React from 'react'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class AlertDialogSlide extends React.Component {

  handleClose = yOn => {
    this.props.closeModal(yOn)
  }

  render() {
    const { open, message, detail } = this.props
    return (
      <Dialog
        open={open}
        transition={Transition}
        keepMounted
        onClose={() => this.handleClose(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {message}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {detail}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose(false)} color="secondary">
            Cerrar
          </Button>
          <Button onClick={() => this.handleClose(true)} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AlertDialogSlide