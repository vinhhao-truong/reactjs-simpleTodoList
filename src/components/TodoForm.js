import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { AddButton } from "./CustomComponents"

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    id: '',
    task: '',
    description: '',
    completed: false
  })

  const handleTaskChange = (e) => {
    setTodo({ ...todo, task: e.target.value });
  }

  const handleDescriptionChange = (e) => {
    setTodo({ ...todo, description: e.target.value });
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
        <Grid container spacing={1} justify="center" >          
          <Grid item xs={12} sm={10} md={8} lg={7} xl={2} >
            <TextField
              fullWidth required
              label="Task"
              variant="outlined"
              type="text"
              onChange={ handleTaskChange }
              value={ todo.task }
            />
          </Grid> 
          <Grid item xs={12} sm={10} md={8} lg={7} xl={6} >
            <TextField
              fullWidth multiline
              label="Description"
              variant="outlined"
              type="text"
              onChange={ handleDescriptionChange }
              value={ todo.description }
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