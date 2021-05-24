import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './assets/scss/custom.scss';
import { ResponseMessage } from './components/CustomComponents'

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState({ openStatus: false, type: "", content: "" });

  useEffect(() => {
    const storageItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageItems) {
      storageItems.forEach(item => {
        item.date = new Date(item.date);
      })
      setTodos(storageItems)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (newTodo) => {
    //Entire todo list sorted by ascending dates
    setTodos(
      [...todos, newTodo].sort((a, b) => (a.date - b.date))
    )
  }

  const toggle = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    )
  }

  const checkOrUncheckAll = (status) => {
    setTodos(
      todos.map(todo => {
        return {
          ...todo,
          completed: status
        }
      })
    )
  }

  const remove = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const removeChecked = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  }

  const removeAll = () => {
    setTodos([]);
  }

  const edit = (id, newContent) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...newContent
          }
        }
        return todo;
      })
    )
  }

  const handleCloseMessage = () => {
    setMessage({ ...message, openStatus: false })
  }

  const openMessage = (messageType, messageContent) => {
    setMessage({
      openStatus: true,
      type: messageType,
      content: messageContent
    })
  }

  return (
    <div className="App">
      <TodoForm addTodo={addTodo} openMessage={ openMessage } />
      <TodoList
        todos={todos}
        toggle={toggle}
        checkOrUncheckAll={checkOrUncheckAll}
        remove={remove}
        removeChecked={removeChecked}
        removeAll={removeAll}
        edit={edit}
        openMessage={ openMessage }
      />
      <ResponseMessage
        type={ message.type }
        content={ message.content }
        openStatus={ message.openStatus }
        handleClose={ handleCloseMessage }
      />
    </div>
  );
}

export default App;
