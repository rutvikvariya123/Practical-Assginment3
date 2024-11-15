import React, { Component } from 'react';
import './App.css';
const TaskItem = ({ task, onToggleComplete, onDelete }) => (
    <div className="task-item">
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span className={task.completed ? 'completed' : ''}>{task.text}</span>
      <button onClick={() => onDelete(task.id)} className="delete-button">Delete</button>
    </div>
);

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks to display</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

const TaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = React.useState('');

  const handleChange = (e) => setTaskText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input 
        type="text"
        value={taskText}
        onChange={handleChange}
        placeholder="Enter a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        // { id: 1, text: "Buy groceries", completed: false },
        // { id: 2, text: "Clean the house", completed: false },
        // { id: 3, text: "Finish homework", completed: false },
      ],
    };
  }

  addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
    }));
  };

  toggleTaskCompletion = (taskId) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  deleteTask = (taskId) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== taskId),
    }));
  };

  render() {
    const { tasks } = this.state;

    return (
      <div className="task-manager">
        <h1>Task Manager</h1>
        <TaskForm onAddTask={this.addTask} />
        <TaskList 
          tasks={tasks}
          onToggleComplete={this.toggleTaskCompletion}
          onDelete={this.deleteTask}
        />
      </div>
    );
  }
}

export default TaskManager;