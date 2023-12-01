import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setErrorMessage("Error fetching tasks. Please try again.");
      });
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
    try {
      await axios.post("http://localhost:3001/tasks", newTask);
      setTasks([...tasks, newTask]);
      setNewTask({ title: "", description: "" });
      setErrorMessage(null); // Clear previous error messages
      getTasks(); // Update tasks after creation
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        // Handle other errors
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleStartEditing = (id, task) => {
    setEditingTaskId(id);
    setEditedTask(task);
  };

  const handleCancelEditing = () => {
    setEditingTaskId(null);
    setEditedTask({ title: "", description: "" });
  };

  const handleUpdateTask = async (id) => {
    try {
      await axios.put(`http://localhost:3001/tasks/${id}`, editedTask);
      setTasks(tasks.map((task) => (task.id === id ? editedTask : task)));
      setEditingTaskId(null);
      setErrorMessage(null); // Clear previous error messages
      getTasks(); // Update tasks after update
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        // Handle other errors
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      setErrorMessage(null);
      getTasks(); // Update tasks after deletion
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        // Handle other errors
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <h1 className="mb-4">Task Manager</h1>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="title"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                />
                <textarea
                  className="form-control mb-2"
                  name="description"
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                />
                <div>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleUpdateTask(task.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCancelEditing}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h5 className="mb-1">{task.title}</h5>
                  <p className="mb-1">{task.description}</p>
                </div>
                <div>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleStartEditing(task.id, task)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h2>Create New Task</h2>
        <form>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleCreateTask}
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
