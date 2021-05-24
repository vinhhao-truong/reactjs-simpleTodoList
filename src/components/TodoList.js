import React, { useState } from 'react';
import Todo from './Todo';

import { useMediaQuery } from 'react-responsive';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  FormControlLabel
} from '@material-ui/core'
import RemoveDialog from './RemoveDialog';
import {
  GreenCheckbox,
  useMarkCheckboxStyles,
  useBlankCheckboxStyles
} from './CustomComponents'

const TodoList = ({
  todos,
  toggle,
  checkOrUncheckAll,
  remove,
  removeChecked,
  removeAll,
  edit,
  openMessage
}) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' })
  const isTablet = useMediaQuery({ query: '(max-device-width: 768px)' })
  const isMobile = useMediaQuery({ query: '(max-device-width: 480px)' })
  const markCheckboxStyles = useMarkCheckboxStyles();
  const blankCheckboxStyles = useBlankCheckboxStyles();

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [removeContent, setRemoveContent] = useState("");

  const allCompleted = (todos.filter(todo => todo.completed === true).length === todos.length) ? true : false;
  const allIncompleted = (todos.filter(todo => todo.completed === false).length === todos.length) ? true : false;

  const handleRemoveAllDialog = () => {
    setOpenRemoveDialog(true);
    setRemoveContent("all")
  }

  const handleRemoveMarkedDialog = () => {
    setOpenRemoveDialog(true);
    setRemoveContent("marked")
  }

  const handleCheckAll = (e) => {
    e.stopPropagation();
    if (!allCompleted) {
      checkOrUncheckAll(true);
      e.target.checked = true;
    } else {
      checkOrUncheckAll(false);
      e.target.checked = false;
    }
  }

  const theList = (listWidth) => {
    return (
      <>
        <List
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: listWidth
          }}
        >
          {
            (todos.length > 0) ?
              <ListItem>
                <ListItemIcon>
                  <FormControlLabel
                    style={{ userSelect: "none" }}
                    control={ <GreenCheckbox
                      aria-label="Check"
                      edge="end"
                    /> }
                    label={ (allCompleted) ? "BLANK ALL" : "MARK ALL" }
                    classes={{ label: (allCompleted) ? markCheckboxStyles.label : blankCheckboxStyles.label }}
                    checked={ allCompleted }
                    onChange={ handleCheckAll }
                  />
                </ListItemIcon>
                <ListItemSecondaryAction>
                  {
                    (!allIncompleted) ?
                      <Button
                        color="secondary"
                        onClick={ handleRemoveMarkedDialog }
                      >Delete Marked</Button> : ""
                  }
                  {
                    (isDesktopOrLaptop) ?
                      <Button
                        color="secondary"
                        onClick={ handleRemoveAllDialog }
                      >Delete All</Button> : ""
                  }        
                </ListItemSecondaryAction>
              </ListItem> : ""
          }
          {
            todos.map((todo, idx) => (
              <Todo
                key={ idx }
                todo={ todo }
                toggle={ toggle }
                remove={ remove }
                edit={ edit }
                openMessage={ openMessage }
              />
            ))
          }
        </List>
        <RemoveDialog 
          open={ openRemoveDialog }
          setOpen={ setOpenRemoveDialog }
          removeType={ removeContent }
          removeChecked={ removeChecked }
          removeAll={ removeAll }
          openMessage={ openMessage }
        />
      </>
    )
  }

  //Return the list in responsive width
  return  (isMobile) ? theList("100%") :
          (isTablet) ? theList("80%") :
          (isDesktopOrLaptop) ? theList("50%") :
          theList("60%");
}

export default TodoList;