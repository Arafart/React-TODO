import React, { useEffect, useState } from 'react';
import '../App.css';

function Task ({ task, index, completeTask, removeTask }) {
    return (
        <div 
        className="task"
        style={ { textDecoration: task.completed ? "line-through" : ""} }
        >
            {task.title}
            <button style={ { background: "red" }} onClick= { () => removeTask(index)}>x</button>
            <button onClick={ () => completeTask(index) }>Complete</button>
        </div>
    );
}

function CreateTask ({ addTask }) {
        const [value, setValue] = useState("");
        
        const handleSubmit = e => {
            e.preventDefault();
            if (!value) return;

            addTask(value);
            setValue("");
        }

        return (
            <form onClick={handleSubmit}>
                <input
                    type="text"
                    className="input me-2"
                    value={value}
                    placeholder="Add a new task"
                    aria-label="text"
                    onChange={e => setValue(e.target.value)}    
                />
                <button style={ { height: "47px"}} type="submit" className="btn btn-outline-success">Add</button>
            </form>
        );
    }

    
function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([]);
   
    useEffect (() => {
        saveLocalTodos();
    }, [tasks]);

    useEffect(() => {
    getLoacalTodos();
  }, [])

    useEffect (() => {
        setTasksRemaining(tasks.filter(task => !task.completed).length)
    });

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false}];
        setTasks(newTasks);
    };
  
    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    // Save to local
    const saveLocalTodos = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //console.log(tasks);
    };

    const getLoacalTodos = () => {
        if(localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", JSON.stringify([]));
        
        }else { 
            let todoLocal = JSON.parse(localStorage.getItem("tasks"));
            setTasks(todoLocal);
        }
    };

    return (
        <div className="todo-container">
            <div className="header"><h1>Arafat TODO List</h1></div>
            <div className="header">Pending tasks ({tasksRemaining})</div>
            <div className="task">
                {tasks.map((task, index) => (
                    <Task 
                        task={task}
                        index={ index}
                        key = {index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        saveLocalTodos = {saveLocalTodos}
                        getLoacalTodos = {getLoacalTodos}
                    />
                ))}
            </div>
            <div className="create-task">
                <CreateTask addTask={addTask} />
            </div>

        </div>
    );
}

export default Todo;
