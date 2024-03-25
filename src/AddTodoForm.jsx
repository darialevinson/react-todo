import React, { useState } from 'react';

function AddTodoForm({ addTodo }) { 
  const [todoTitle, setTodoTitle] = useState('');

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      id: Date.now()
    };
    addTodo(newTodo);
    setTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input
        id="todoTitle"
        type="text"
        name="todoTitle"
        placeholder="Enter case title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddTodoForm;