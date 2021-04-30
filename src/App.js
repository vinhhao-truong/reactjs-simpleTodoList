import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './assets/scss/custom.scss';

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageItems) {
      setTodos(storageItems)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (newTodo) => {
    setTodos(
      [...todos, newTodo].sort((a, b) => (b.date - a.date))
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

  return (
    <div className="App">
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggle={toggle}
        checkOrUncheckAll={checkOrUncheckAll}
        remove={remove}
        removeChecked={removeChecked}
        removeAll={removeAll}
        edit={edit}
      />
    </div>
  );
}

export default App;
