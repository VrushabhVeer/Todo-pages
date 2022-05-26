import React from "react";
import './App.css';
import Todo from "./components/Todo";
// import Todos from "./components/Todos";


function App() {

  return (
    <div className="App">
      <div className="main">
        <header className="App-header">
          <h1>Todo List</h1>
          <p>Add Your Task Here</p>
        </header>
        <div className="todo">
          <Todo></Todo>
        </div>
      </div>
    </div>
  );
}

export default App;
