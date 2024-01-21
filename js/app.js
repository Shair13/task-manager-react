import React, {useState, useEffect} from "react";
import {createRoot} from "react-dom/client";
import {deleteTask, getTasks} from "./api/tasks";
import NewTask from "./components/NewTask";
import Task from "./components/Task";

function App() {

    const [tasks, setTasks] = useState([]);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        getTasks(setTasks);
        console.log(tasks)
    }, [toggle]);


    const onNewTask = () => {
        setToggle(prev => !prev)
    }

    const onRemoveTask = async (taskId) => {
        await deleteTask(taskId);
        await setToggle(prev => !prev);
    }

    return (
        <>
            <NewTask onNewTask={onNewTask}/>
            {tasks.map(task => <Task title={task.title} key={task.id} taskId={task.id} description={task.description}
                                     status={task.status} onRemoveTask={onRemoveTask}/>)}
        </>
    )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
