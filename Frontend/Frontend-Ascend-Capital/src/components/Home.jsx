import React, { useState, useContext, useEffect } from 'react'
import appContext from '../context/app/appContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const app_context = useContext(appContext)
    const { loggedIN, setLoggedIN, getUserTasks } = app_context
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        const fetchedtasks = await getUserTasks()
        console.log(fetchedtasks.user.tasks)
        setTasks(fetchedtasks.user.tasks)
    }

    useEffect(() => {
        if (localStorage.getItem("taskapp-token")) {
            setLoggedIN(true)
            fetchTasks()
        }
        else {
            navigate("/")
        }
    }, [])

    return (
        <div className='flex font-bold text-4xl justify-center items-center align-middle h-[92vh] w-auto'>
            {!loggedIN &&
                <p> Please Log In to see your tasks 👨‍💻</p>}
            {loggedIN &&
                <div className='min-w-[100vw] w-auto h-full overflow-x-scroll'>
                    <div className="bg-gray-800 text-white text-2xl h-full min-w-[100vw] w-auto flex flex-row">
                        {tasks.map((element, index) => {
                            return (
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center mx-2 bg-gray-200 justify-between text-black">
                                        <p>
                                            List {index + 1}
                                        </p>
                                        <p className="cursor-pointer" onClick={() => {
                                            setTasks([...tasks.slice(0, index),
                                            [...tasks[index], "New Task"],
                                            ...tasks.slice(index + 1)])
                                        }}>
                                            ➕
                                        </p>
                                    </div>
                                    <div className="m-2 bg-gray-400 flex flex-col min-w-[300px]">
                                        {element.map((elem, index) => {
                                            return (
                                                <div className="flex flex-row bg-gray-200 justify-between text-black text-lg">
                                                    <p className='mx-2 text-xl'>{element[index]}</p>
                                                </div>)
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="m-2 bg-gray-400 min-w-[200px] flex items-center justify-center text-6xl">
                            <p className='cursor-pointer' onClick={() => {
                                setTasks([...tasks, []])
                            }}>➕</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Home