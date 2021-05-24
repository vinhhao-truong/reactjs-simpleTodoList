import React, { useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Typography,
  Tooltip
} from '@material-ui/core'
import {
  Delete as DeleteIcon
} from '@material-ui/icons'
import TodoDialog from './TodoDialog';
import RemoveDialog from './RemoveDialog';
import {
  GreenCheckbox,
  checkedStyle,
  uncheckedStyle
} from './CustomComponents'

const Todo = ({ todo, toggle, remove, edit, openMessage }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);

  const handleCheckbox = (e) => {
    e.stopPropagation(); //Ignore clicked from parent
    toggle(todo.id);
  }

  const handleRemove = () => {
    remove(todo.id);
  }

  const handleOpenDialog = () => {
    setDialogOpen(true);
  }
  
  return (
    <>
      <ListItem
        divider
        dense
        button
        onClick={ handleOpenDialog }
        disableRipple
      >
        <Tooltip title="Completed?" >
          <ListItemIcon>
            <GreenCheckbox
              edge="start"
              disableRipple
              onClick={ handleCheckbox }
              checked={ todo.completed }
            />
          </ListItemIcon>
        </Tooltip>                  
        <ListItemText
          primary={
            <Typography variant="h5" >
              { todo.task } - <span style={{color: "#972ea9"}}>{ todo.date.toLocaleDateString('en-GB') }</span>
            </Typography>
          }
          secondary={ todo.description }
          style={
            (todo.completed) ? checkedStyle : uncheckedStyle
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => { setRemoveDialog(true) }}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {
        (dialogOpen) ?  <TodoDialog
                          todo={ todo }
                          edit={ edit }
                          openStatus={ dialogOpen }
                          setOpenStatus={ setDialogOpen }
                          openMessage={ openMessage }
                        /> : ""
      }
      {
        (removeDialog) ?  <RemoveDialog
                            open={ removeDialog }
                            setOpen={ setRemoveDialog }
                            todoTask={ todo.task }
                            removeOne={ handleRemove }
                            openMessage={ openMessage }
                          /> : ""
      }           
    </>
  )
}

export default Todo;