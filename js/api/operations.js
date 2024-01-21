import {API_KEY, API_URL} from "./constants";

/**
 * Fetch all operations
 * @param {string} taskId - ID of task
 * @param {function} successCallback - Function that saves incoming data
 */
export const getOperations = async (taskId, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}/operations`, {
            headers: {
                Authorization: API_KEY,
            },
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }
};

/**
 * Add an operation to task
 * @param {string} taskId - ID of task
 * @param {Object} data - Function that saves incoming data
 */

export const addOperation = async (taskId, data) => {
    try {
        await fetch(`${API_URL}/tasks/${taskId}/operations`, {
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    } catch (err) {
        console.error(err)
    }
}

export const getOperation = async (operationId, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/operations/${operationId}`, {
            headers: {
                Authorization: API_KEY,
            },
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }
}

export const updateOperation = async (operationId, data) => {
    try{
        await fetch(`${API_URL}/api/operations/${operationId}`, {
            method: "PUT",
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }catch (err){
        console.error(err);
    }
}

export const deleteOperation = async (operationId) => {
    try {
        await fetch(`${API_URL}/operations/${operationId}`, {
            method: "DELETE",
            headers: {
                Authorization: API_KEY,
            },
        })
    }catch (err){
        console.error(err);
    }
}