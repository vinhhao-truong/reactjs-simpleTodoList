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
  OkButton,
} from './CustomComponents'

const transitionSlide = forwardRef((props, ref) => {
  return <Slide ref={ ref } direction="up" { ...props } />
})

const RemoveDialog = ({
  open,
  removeType,
  todoTask,
  setOpen,
  removeChecked,
  removeAll,
  removeOne,
  openMessage
}) => {
  const setRemoveMessage = (messageContent) => {
    openMessage("error", messageContent)
  }

  const handleRemove = () => {
    switch(removeType) {
      case "all":
        removeAll();
        setRemoveMessage("All Tasks Deleted!");
        break;
      case "marked":
        removeChecked();
        setRemoveMessage("Marked Tasks Deleted!");
        break;
      default:
        removeOne();  
        setRemoveMessage(`${todoTask} Deleted!`);     
    }
    setOpen(false);
  }

  const handleOnClose = () => {
    setOpen(false);    
  }

  return (
    <>
      <Dialog
        TransitionComponent={ transitionSlide }
        open={ open }
        onClose={ handleOnClose }
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ display: "flex", justifyContent: "center" }} >
          { (removeType === "all" || removeType === "marked") ? `Delete ${removeType} tasks?` : `Delete ${todoTask}?` }
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
    </>
  )
}


export default RemoveDialog;