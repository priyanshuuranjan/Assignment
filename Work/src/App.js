import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./Component/TaskList";
import TaskDetail from "./Component/TaskDetail";
import TaskForm from "./Component/TaskForm";

function App() {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: "center" }}>Task Management Application</h1>
        <Routes>
          <Route exact path="/" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
      </div>
      <footer
        style={{
          color: "rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          padding: "10px",
          position: "fixed",
          bottom: "0",
          width: "100%",
          fontSize: "1.2em",
        }}
      >
      </footer>
    </Router>
  );
}

export default App;