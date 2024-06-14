import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/TaskForm.css';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/api/tasks/${id}`)
        .then(response => setTask(response.data))
        .catch(error => console.error('There was an error fetching the task!', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:3001/api/tasks/${id}`, task)
        .then(() => navigate(`/tasks/${id}`))
        .catch(error => console.error('There was an error updating the task!', error));
    } else {
      axios.post('http://localhost:3001/api/tasks', task)
        .then(() => navigate('/'))
        .catch(error => console.error('There was an error creating the task!', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <label>Title</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={task.description} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default TaskForm;