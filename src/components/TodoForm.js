import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import AddIcon from '@material-ui/icons/Add';
import { AddButton } from "./CustomComponents"

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    id: '',
    task: '',
    description: '',
    date: new Date(),
    completed: false
  })

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
  }

  return (
      <form onSubmit={ handleSubmit } >
        <Grid container justify="center" >
          <Typography
            style={{ color: "#0278ae" }}
            variant="h4"
            gutterBottom
          >SIMPLE TODO LIST</Typography>
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
}

export default TodoForm;