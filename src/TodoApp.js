import React, { useState, useEffect } from 'react';
import './TodoApp.css'

const TodoApp = () => {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to manage the new task input
  const [newTask, setNewTask] = useState('');

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    // Get the saved tasks from local storage, or an empty array if no tasks are saved
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Set the tasks state with the loaded tasks
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    // Save the tasks state as a JSON string in local storage with the key 'tasks'
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle adding a new task
  const addTask = () => {
    // Check if the new task is not empty
    if (newTask.trim() !== '') {
      // Use the setTasks function to add the new task to the tasks state
      // with a unique ID (using Date.now()) and a completed status set to false
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      // Reset the newTask state to clear the input field
      setNewTask('');
    }
  };

  // Function to handle marking a task as completed or uncompleted
  const completeTask = (taskId) => {
    // Use the setTasks function to map through the tasks state and find the task
    // with the matching ID (taskId). Then toggle the completed status for that task.
    // Use the spread operator (...) to create a new array with the updated task object.
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  // Function to handle deleting a task
  const deleteTask = (taskId) => {
    // Use the setTasks function to filter the tasks state and create a new array
    // without the task with the matching ID (taskId).
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <div>
        {/* Input field for entering a new task */}
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        {/* Button to add a new task */}
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {/* Map through the tasks array to display each task */}
        {tasks.map((task) => (
          <li key={task.id}>
            {/* Span to display the task text with a line-through style if completed */}
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => completeTask(task.id)}
            >
              {task.text}
            </span>
            {/* Button to delete the task */}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
