import React, {useEffect, useState} from 'react';
import {updateTask} from "../api/tasks";
import Operations from "./Operations";
import {getOperations} from "../api/operations";

const Task = ({title, description, taskId, status, onRemoveTask}) => {

    const [localStatus, setLocalStatus] = useState(status);
    const [form, setForm] = useState(false);
    const [operations, setOperations] = useState([]);
    const [refreshOperationsToggle, setRefreshOperationsToggle] = useState(true);

    const finishBtnHandler = async () => {
        const data = {
            title: title,
            description: description,
            status: "closed"
        }
        await updateTask(taskId, data)
        setLocalStatus("closed")
    }

    const onAddOperationHandler = () => {
        setForm(prev => !prev);
    }

    useEffect(() => {
        getOperations(taskId, setOperations);
    }, [refreshOperationsToggle]);

    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{title}</h5>
                    <h6 className="card-subtitle text-muted">{description}</h6>
                </div>


                <div>

                    {localStatus === "open" ?
                        <button onClick={onAddOperationHandler} className="btn btn-info btn-sm mr-2">
                            Add operation
                            <i className="fas fa-plus-circle ml-1"></i>
                        </button> : ""}

                    {localStatus === "open" ? <button onClick={finishBtnHandler} className="btn btn-dark btn-sm">
                        Finish
                        <i className="fas fa-archive ml-1"></i>
                    </button> : ""}

                    {operations.length === 0 ?
                        <button onClick={() => onRemoveTask(taskId)} className="btn btn-outline-danger btn-sm ml-2">
                            <i className="fas fa-trash false"></i>
                        </button> : ""}
                </div>
            </div>
            <Operations taskId={taskId} form={form} setForm={setForm} operations={operations}
                        setRefreshOperationsToggle={setRefreshOperationsToggle} status={localStatus}/>

        </section>
    );
};

export default Task;