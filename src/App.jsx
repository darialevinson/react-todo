import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
        }
      };

      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
       
        data.records.sort((objectA, objectB) => {
          const titleA = objectA.fields.title; 
          const titleB = objectB.fields.title;
          
          if (titleA < titleB) {
            return 1;
          }
          if (titleA > titleB) {
            return -1;
          }
          return 0;
        });
      
        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.title 
        }));
        setTodoList(todos);
      } catch (error) {
        console.error('Error fetching data:', error);

        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (!isLoading && todoList.length > 0) { 
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  function addTodo(newTodo) {
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  }

  function removeTodo(idToRemove) {
    const updatedTodoList = todoList.filter(todo => todo.id !== idToRemove);
    setTodoList(updatedTodoList);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddTodoForm addTodo={addTodo} />} />
        <Route path="/" element={<TodoList todoList={todoList} onRemoveTodo={removeTodo} />} />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter> 
  );
 
}

export default App;
