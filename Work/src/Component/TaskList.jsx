import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('There was an error fetching tasks!', error));
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Task List</h1>
        <Link to="/new" className="add-task-link">Add New Task</Link>
      </header>
      <div className="todos-list">
        {tasks.map(task => (
          <div className="todo-item" key={task._id}>
            <Link to={`/tasks/${task._id}`}>{task.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;