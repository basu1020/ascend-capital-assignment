import AppContext from "./appContext";
import { useState } from "react";

const AppState = (props) => {
    const host = 'https://taskapp-backend.onrender.com'
    const [loggedIN, setLoggedIN] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        tasks: []
    })

    const login = async (email, password) => {

        const response = await fetch(`${host}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": password})
        })
        const json = await response.json()
        return json
    }

    const signup = async (name, email, password) => {
        const response = await fetch(`${host}/signup`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"name": name, "email":email, "password":password})
        })
        const json = await response.json()
        return json
    }

    const getUserTasks = async () => {
        const response = await fetch(`${host}/get-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("taskapp-token")
            },
        })
        const json = await response.json()
        return json.user.tasks
    }

    const updateTasks = async (newTasksStructure) => {
        const response = await fetch(`${host}/update-tasks`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("taskapp-token")
            },
            body: JSON.stringify(newTasksStructure)
        })
        const json = await response.json()
        return json
    }



    return (
        <AppContext.Provider value={{login, signup, loggedIN, setLoggedIN, updateTasks, user, setUser, getUserTasks}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState