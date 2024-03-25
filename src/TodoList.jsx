import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({todoList}) {
  return (
    <div>
      <h1>List todo</h1>
      <ul>
        {todoList.map((todo, i) => <TodoListItem key={todo.id} todo={todo} />)}
      </ul> 
    </div>
  );
}

export default TodoList;