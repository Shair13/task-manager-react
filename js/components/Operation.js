import React, {useState} from 'react';
import {deleteOperation, updateOperation} from "../api/operations";
import {minutesToHours} from "../api/utils";

const Operation = ({description, timeSpent, status, operationId, setRefreshOperationsToggle}) => {

    const [timeInputToggle, setTimeInputToggle] = useState(true);
    const [newTime, setNewTime] = useState(0);

    const timeUpdateInputHandler = (e) => {
        const time = +e.target.value
        setNewTime(time)
    }

    const addTimeBtnHandler = (e) => {
        e.preventDefault();
        setNewTime(0);
        setTimeInputToggle(prev => !prev);
    }

    const updateTimeHandler = async (e) => {
        e.preventDefault();
        await updateOperation(operationId, {description: description, timeSpent: newTime + timeSpent});
        setNewTime(0);
        setRefreshOperationsToggle(prev => !prev);
        setTimeInputToggle(prev => true);
    }

    const onRemoveOperationHandler = async (e) => {
        e.preventDefault();
        await deleteOperation(operationId)
        setRefreshOperationsToggle(prev => !prev);
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {description}
                {timeSpent > 0 ? <span
                    className="badge badge-success badge-pill ml-2">{minutesToHours(timeSpent)}</span> : ""}
            </div>


            {timeInputToggle ? <div>
                    {status === "open" ?
                        <button onClick={addTimeBtnHandler} className="btn btn-outline-success btn-sm mr-2">
                            Add time
                            <i className="fas fa-clock ml-1"></i>
                        </button> : ""}

                    <button onClick={onRemoveOperationHandler} className="btn btn-outline-danger btn-sm"><i
                        className="fas fa-trash"></i></button>
                </div> :
                <form>
                    <div className="input-group input-group-sm">
                        <input type="number"
                               value={newTime}
                               onChange={timeUpdateInputHandler}
                               className="form-control"
                               placeholder="Spent time in minutes"
                               style={{width: "12rem"}}/>
                        <div className="input-group-append">
                            <button onClick={updateTimeHandler} className="btn btn-outline-success"><i
                                className="fas fa-save"></i></button>
                            <button onClick={addTimeBtnHandler} className="btn btn-outline-dark"><i
                                className="fas fa-times false"></i></button>
                        </div>
                    </div>
                </form>}
        </li>
    );
};

export default Operation;