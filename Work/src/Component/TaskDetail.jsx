import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../CSS/TaskDetail.css';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/tasks/${id}`)
      .then(response => {
        setTask(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the task!', error);
        setError('There was an error fetching the task.');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/api/tasks/${id}`)
      .then(() => {
        console.log('Task deleted successfully');
        navigate('/');
      })
      .catch(error => console.error('There was an error deleting the task!', error));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="task-details">
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>{new Date(task.dueDate).toLocaleDateString()}</p>
        <div className="task-actions">
          <Link to={`/edit/${task._id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;