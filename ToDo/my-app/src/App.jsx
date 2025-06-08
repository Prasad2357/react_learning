import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import { Footer } from './Components/Footer'
import { ToDos } from './Components/ToDos'
import React, { useEffect, useState } from 'react'
import { AddToDo } from './Components/AddToDo'
import { About } from './Components/About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  let initTodo;

  try {
    const storedTodos = localStorage.getItem("todos");
    initTodo = storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("Invalid JSON in localStorage for 'todos':", error);
    initTodo = [];
  }

  const [todos, setTodos] = useState(initTodo);

  const addToDo = (title, description) => {
    console.log("I am adding this todo", title, description);
    let sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;

    const myTodo = {
      sno: sno,
      title: title,
      description: description,
    };

    console.log(myTodo);
    const newTodos = [...todos, myTodo];
    setTodos(newTodos);
  };

  const onDelete = (todo) => {
    console.log("I am ondelete", todo);
    const newTodos = todos.filter((e) => e !== todo);
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <Header title="My ToDos List" searchBar={true} />
      <Routes>
        <Route path="/" element={
          <>
            <AddToDo AddToDo={addToDo} />
            <ToDos todos={todos} onDelete={onDelete} />
          </>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
