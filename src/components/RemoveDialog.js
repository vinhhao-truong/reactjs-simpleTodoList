import React, { forwardRef } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Slide,
} from '@material-ui/core'
import {
  Check,
  Close
} from '@material-ui/icons'
import {
  CancelButton,
  OkButton
} from './CustomComponents'

const transitionSlide = forwardRef((props, ref) => {
  return <Slide ref={ ref } direction="up" { ...props } />
})

const RemoveDialog = ({
  open,
  setOpen,
  allOrChecked,
  removeChecked,
  removeAll
}) => {
  const handleRemove = () => {
    (allOrChecked) ? removeAll() : removeChecked();
    setOpen({ ...open, openStatus: false });
  }
  const handleOnClose = () => {
    setOpen({ ...open, openStatus: false });
  }
  return (
    <Dialog
      TransitionComponent={ transitionSlide }
      open={ open }
      onClose={ handleOnClose }
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle style={{ display: "flex", justifyContent: "center" }} >
        { (allOrChecked) ? "Delete All Tasks?" : "Delete Marked?" }
      </DialogTitle>
      <DialogActions >
        <CancelButton
          size="small"
          aria-label="cancel"
          onClick={ handleOnClose }
        >
          <Close />
        </CancelButton>
        <OkButton
          autoFocus
          size="small"
          aria-label="ok"
          onClick={ handleRemove }
        >
          <Check />
        </OkButton>
      </DialogActions>
    </Dialog>
  )
}


export default RemoveDialog;