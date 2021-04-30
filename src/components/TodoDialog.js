import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Typography,
  Box,
  Button
} from '@material-ui/core'
import {
  Edit as EditIcon
} from '@material-ui/icons';
import {
  GreenCheckbox,
  EditCheckedButton,
  EditUncheckedButton,
  checkedStyle,
  uncheckedStyle
} from './CustomComponents'

const darkGreen = "#0fa37c";
const darkRed = "#dd4747";

const TodoDialog = ({ todo, edit, openStatus, setOpenStatus }) => {
  const [tempTodo, setTempTodo] = useState(todo);
  const [editableT, setEditableT] = useState(false)  

  const handleFocusEnd = (e) => {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  }

  const handleCheckbox = (e) => {
    e.stopPropagation(); //Ignore clicked from parent 
    setTempTodo({ ...tempTodo, completed: !tempTodo.completed });
    e.target.checked = tempTodo.completed;
  }

  const handleEditDes = (e) => {
    setTempTodo({ ...tempTodo, description: e.target.value });
  }

  const handleEditTask = (e) => {
    setTempTodo({ ...tempTodo, task: e.target.value });
  }

  const handleLeaveTask = () => {
    setEditableT(false);
  }

  const handleDialogClose = () => {
    setOpenStatus(false);
    setTempTodo(todo);
  }

  const handleSubmitDialog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    edit(todo.id, { ...tempTodo })
    setOpenStatus(false);
  }

  const handleDialogTitleClick = (e) => {
    e.stopPropagation();
    setEditableT(true)
  }

  return (
    <Dialog
      open={ openStatus }
      onClose={ handleDialogClose }
      fullWidth={ true }
    >    
      <DialogTitle>
        <Grid container spacing={2}>
          <Grid
            item
            sm={( editableT) ?? 8 }
            md={( editableT) ?? 8 }
            xs={( editableT) ?? 8 }
            lg={( editableT) ?? 8 }
            xl={( editableT) ?? 8 }
          >
            {
              (editableT) ? 
                <TextField
                  autoFocus
                  fullWidth
                  value={ tempTodo.task }
                  onChange={ handleEditTask }
                  onFocus={ handleFocusEnd }
                  onBlur={ handleLeaveTask }
                /> :
                <Typography
                  variant="h4"
                  style={ (tempTodo.completed) ? checkedStyle: uncheckedStyle }
                > 
                  { tempTodo.task }
                </Typography>
            }
          </Grid>
          <Grid item>
            {
              (tempTodo.completed) ?
                <EditUncheckedButton size="small" onClick={ handleDialogTitleClick } >
                  <EditIcon />
                </EditUncheckedButton> :
                <EditCheckedButton size="small" onClick={ handleDialogTitleClick } >
                  <EditIcon />
                </EditCheckedButton>
            }                      
          </Grid>
          <Grid item >
            <GreenCheckbox
              checked={ tempTodo.completed }
              onChange={ handleCheckbox }
              disableRipple
            />              
          </Grid>
        </Grid>      
      </DialogTitle>

      <DialogContent>
        <form onSubmit={ handleSubmitDialog } >
          <TextField
            fullWidth multiline
            label="Description"
            value={ tempTodo.description }
            onChange={ handleEditDes }
            onFocus={ handleFocusEnd }
          />
          <Box
            marginTop="2rem"
            display="flex"
            justifyContent="space-between"
          >
            <Button
              onClick={ handleDialogClose }
              style={{ color: darkRed, fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{ color: darkGreen, fontWeight: 600 }}
            >
              Save
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TodoDialog;