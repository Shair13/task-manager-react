import React, {useEffect, useState} from 'react';
import {addOperation} from "../api/operations";
import Operation from "./Operation";

const Operations = ({taskId, form, setForm, operations, setRefreshOperationsToggle, status}) => {

    const [operation, setOperation] = useState({description: "", timeSpent: 0})

    const inputDescriptionHandler = (e) => {
        const {name, value} = e.target
        setOperation(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const addButtonHandler = async (e) => {
        e.preventDefault();
        if (operation.description.length > 0) {
            await addOperation(taskId, operation);
            await setForm(false);
            await setOperation({description: "", timeSpent: 0});
            await setRefreshOperationsToggle(prev => !prev);

        } else {
            console.warn("description must have at least 1 letter")
        }
    }

    return (
        <>
            {form ? <div className="card-body">
                <form>
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               name={"description"}
                               value={operation.description}
                               onChange={inputDescriptionHandler}
                               placeholder="Operation description"/>

                        <div className="input-group-append">
                            <button onClick={addButtonHandler} className="btn btn-info">
                                Add
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div> : ""}

            <ul className="list-group list-group-flush">
                {operations.map(operation => <Operation key={operation.id}
                                                        setRefreshOperationsToggle={setRefreshOperationsToggle}
                                                        description={operation.description}
                                                        timeSpent={operation.timeSpent} status={status}
                                                        operationId={operation.id}/>)}
            </ul>
        </>
    );
};

export default Operations;