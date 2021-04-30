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
  edit
}) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' })
  const isTablet = useMediaQuery({ query: '(max-device-width: 768px)' })
  const isMobile = useMediaQuery({ query: '(max-device-width: 480px)' })
  const markCheckboxStyles = useMarkCheckboxStyles();
  const blankCheckboxStyles = useBlankCheckboxStyles();

  const [openRemoveDialog, setOpenRemoveDialog] = useState({ openStatus: false, allOrChecked: false });

  const allCompleted = (todos.filter(todo => todo.completed === true).length === todos.length) ? true : false;
  const allIncompleted = (todos.filter(todo => todo.completed === false).length === todos.length) ? true : false;

  const handleOpenRemoveCheckedDialog = () => {
    setOpenRemoveDialog({ openStatus: true, allOrChecked: false });
  }

  const handleOpenRemoveAllDialog = () => {
    setOpenRemoveDialog({ openStatus: true, allOrChecked: true });
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

  console.log(todos)

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
                        onClick={ handleOpenRemoveCheckedDialog }
                      >Delete Marked</Button> : ""
                  }
                  {
                    (isDesktopOrLaptop) ?
                      <Button
                        color="secondary"
                        onClick={ handleOpenRemoveAllDialog }
                      >Delete All</Button> : ""
                  }        
                </ListItemSecondaryAction>
              </ListItem> : ""
          }
          {
            todos.map((todo, idx) => {
              return <Todo
                key={ idx }
                todo={ todo }
                toggle={ toggle }
                remove={ remove }
                edit={ edit }
              />
            })
          }
        </List>
        <RemoveDialog 
          open={ openRemoveDialog.openStatus }
          setOpen={ setOpenRemoveDialog }
          allOrChecked={ openRemoveDialog.allOrChecked }
          removeChecked={ removeChecked }
          removeAll={ removeAll }
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