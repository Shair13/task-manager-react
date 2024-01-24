import React, {useEffect, useState} from 'react';
import {addTask} from "../api/tasks";

const NewTask = ({onNewTask}) => {

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "open"
    })

    const inputHandler = (e) => {
        const {name, value} = e.target
        setNewTask(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const addButtonHandler = async (e) => {
        e.preventDefault();
        if (newTask.title.length > 0 && newTask.description.length > 0) {
            await addTask(newTask);
            onNewTask();
            setNewTask({
                title: "",
                description: "",
                status: "open"
            });
        } else {
            console.warn("Title and description must have at least 1 letter")
        }
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="title"
                               value={newTask.title}
                               onChange={inputHandler}
                               placeholder="Title"/>
                    </div>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               value={newTask.description}
                               onChange={inputHandler}
                               name="description"
                               placeholder="Description"/>
                    </div>
                    <button className="btn btn-info" type="submit" onClick={addButtonHandler}>
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewTask;