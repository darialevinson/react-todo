

import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]); 

  function addTodo(newTodo) {
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  }

  return (
    <div>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;