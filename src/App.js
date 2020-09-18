import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
// import {ReactComponent as PlusIcon} from './assets/icons/plus-square.svg';
// import {ReactComponent as DeleteIcon} from './assets/icons/delete-icon.svg';
// import * as Icon from 'react-bootstrap-icons';

const LOCAL_STORAGE_KEY = 'todoApp.todos';
function App() {
  const todoList = [];
  const todoNameRef = useRef("Enter Task")
  const [todos, setTodos] = useState(todoList);

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  },[]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo=> todo.id==id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(event) {
    const name = todoNameRef.current.value;

    if (name === '') return;

    console.log({ name });
    setTodos(prevTodo => {
      return [...prevTodo, { id: uuidv4(), name: name, complete: false }]
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo=>!todo.complete);
    setTodos(newTodos);

  }
  return (
    <>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo} >Add</button>
      <button onClick={handleClearTodos}>Clear Done</button>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
