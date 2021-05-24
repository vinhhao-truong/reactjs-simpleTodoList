import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  TextField,
  Typography,
  Toolbar
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { Add as AddIcon } from '@material-ui/icons';
import { AddButton } from "./CustomComponents"
import { useMediaQuery } from 'react-responsive';

const TodoForm = ({ addTodo, openMessage }) => {
  const [todo, setTodo] = useState({
    id: '',
    task: '',
    description: '',
    date: new Date(),
    completed: false
  })

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' })
  const isTablet = useMediaQuery({ query: '(max-device-width: 768px)' })
  const isMobile = useMediaQuery({ query: '(max-device-width: 480px)' })

  const handleTaskChange = (e) => {
    setTodo({ ...todo, task: e.target.value });
  }

  const handleDescriptionChange = (e) => {
    setTodo({ ...todo, description: e.target.value });
  }

  const handleDateChange = (e) => {
    setTodo({ ...todo, date: e })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(todo.task.trim()) {
      addTodo({ ...todo, id: uuidv4() });
      setTodo({ ...todo, task: '', description: '' });
    }  
    openMessage("success", `${todo.task} Added!`)
  }

  const theForm = (formWidth) => (
    <form
      onSubmit={ handleSubmit }
      style={{
        width: formWidth,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <Grid container justify="center" >
        <Typography
          style={{ color: "#0278ae" }}
          variant="h3"
          gutterBottom
        >SIMPLE TODO LIST</Typography>
        <Toolbar />
      </Grid>
      <Grid container spacing={2} justify="center" >          
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
          <TextField
            fullWidth required
            label="Task"
            type="text"
            onChange={ handleTaskChange }
            value={ todo.task }
          />
        </Grid> 
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker 
              fullWidth
              disableToolbar
              disablePast
              autoOk
              variant="inline"
              format="dd/MM/yyyy"
              margin="none"
              id="todo-date"                
              label="Date"
              onChange={handleDateChange}
              value={todo.date}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
          <TextField
            fullWidth multiline
            label="Description"
            type="text"
            onChange={ handleDescriptionChange }
            value={ todo.description }
            KeyboardButtonProps={{ 'aria-label': 'change date' }}
          />
        </Grid>     
      </Grid>
      <Grid container justify="center" style={{ marginTop: "1rem" }} >
        <AddButton
          aria-label="add"
          type="submit"
        >
          <AddIcon />
        </AddButton>
      </Grid> 
    </form>   
  )

  return  (isMobile) ? theForm("100%") :
            (isTablet) ? theForm("80%") :
            (isDesktopOrLaptop) ? theForm("50%") :
            theForm("60%");
}

export default TodoForm;