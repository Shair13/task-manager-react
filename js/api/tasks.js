import {API_KEY, API_URL} from "./constants";

/**
 * Fetch all tasks
 * @param {function} successCallback - Function that saves incoming data
 */
export const getTasks = async (successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
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
        console.error(err);
    }
};

export const addTask = async (data) => {
    try {
        await fetch(`${API_URL}/tasks`, {
            method: "POST",
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

export const updateTask = async (id, data) => {
    try {
        await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
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

export const deleteTask = async (id) => {
    try {
        await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: API_KEY,
            },
        })
    } catch (err) {
        console.error(err)
    }
}