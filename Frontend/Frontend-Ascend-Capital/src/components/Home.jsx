import React, { useState, useContext, useEffect } from 'react'
import appContext from '../context/app/appContext'
import { useNavigate } from 'react-router-dom'
import { AiFillCheckCircle } from 'react-icons/ai'

const Home = () => {
    const app_context = useContext(appContext)
    const { loggedIN, setLoggedIN, getUserTasks, updateTasks } = app_context
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        const fetchedtasks = await getUserTasks()
        setTasks(fetchedtasks)
    }

    const updateBackendwithNewTasks = async (newTasks) => {
        await updateTasks({ "tasks": newTasks })
    }

    const handleAddingNewList = () => {
        setTasks(prevTasks => {
            const newTasks = [...prevTasks, []]
            updateBackendwithNewTasks(newTasks)
            return newTasks
        })
    }

    const handleDragStart = (e, listIndex, taskIndex) => {
        e.dataTransfer.setData("listIndex", listIndex);
        e.dataTransfer.setData("taskIndex", taskIndex);
    };

    const handleDragOver = (e, listIndex) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = async (e, targetListIndex) => {
        e.preventDefault();
        const sourceListIndex = Number(e.dataTransfer.getData("listIndex"));
        const sourceTaskIndex = Number(e.dataTransfer.getData("taskIndex"));

        if (sourceListIndex === targetListIndex) return;

        setTasks((prevTasks) => {
            const newTasks = prevTasks.map((list, index) => {
                if (index === sourceListIndex) {
                  const updatedList = list.filter((_, ind) => ind !== sourceTaskIndex);
                  return updatedList;
                }
                if (index === targetListIndex) {
                  const taskToMove = prevTasks[sourceListIndex][sourceTaskIndex];
                  return [...list, taskToMove];
                }
                return list;
            });
            updateBackendwithNewTasks(newTasks);

            return newTasks;
        });
    };

    const handleDeleteTask = (listIndex, taskIndex) => {
        setTasks(prevTasks => {
            const newTasks = prevTasks.map((list, index) =>
                index === listIndex ? [...list.slice(0, taskIndex), ...list.slice(taskIndex + 1)] : list
            );
            updateBackendwithNewTasks(newTasks);
            return newTasks;
        });
    };

    useEffect(() => {
        if (localStorage.getItem("taskapp-token")) {
            setLoggedIN(true)
            fetchTasks()
        }
        else {
            navigate("/")
        }

        return () => {}
    }, [])

    return (
        <div className='flex font-bold text-4xl justify-center items-center align-middle h-[92vh] w-auto'>
            {!loggedIN &&
                <p> Please Log In to see your tasks 👨‍💻</p>}
            {loggedIN &&
                <div className='min-w-[100vw] w-auto h-full '>
                    <div className="bg-gray-800 p-2 overflow-x-scroll text-white text-2xl h-full w-auto flex flex-row"
                    >
                        {tasks.map((element, index) => (
                            <div className="flex flex-col h-full bg-gray-400 mx-1" key={index} onDrop={(e) => { handleDrop(e, index)}} onDragOver={(e) => handleDragOver(e, index)}>
                                <div className="flex flex-row items-center mx-2 bg-gray-200 justify-between text-black">
                                    <p className='mx-2'>
                                        List {index + 1}
                                    </p>
                                    <div>
                                        <p className="cursor-pointer mx-1" onClick={() => {
                                            setTasks(prevTask => {
                                                const newTask = [...prevTask.slice(0, index),
                                                [...prevTask[index], "New Task"],
                                                ...prevTask.slice(index + 1)]
                                                updateBackendwithNewTasks(newTask)
                                                return newTask
                                            })
                                        }}>
                                            ➕
                                        </p>
                                    </div>
                                </div>
                                <div className="m-2 bg-gray-400 flex flex-col min-w-[300px]"
                                    >
                                    {element.map((elem, ind) => (
                                        <div className="flex flex-row my-1 bg-gray-200 justify-between text-black text-lg" draggable="true"
                                            key={ind}
                                            onDragStart={(e) => handleDragStart(e, index, ind)}
                                        >
                                            <p className='mx-2 text-xl'>
                                                <span contentEditable suppressContentEditableWarning
                                                    onBlur={(event) => {
                                                        const newValue = event.target.textContent;
                                                        if (newValue !== element[ind]) {
                                                            setTasks(prevTasks => {
                                                                const newTask = [...prevTasks.slice(0, index),
                                                                [...prevTasks[index].slice(0, ind), newValue, ...prevTasks[index].slice(ind + 1)],
                                                                ...prevTasks.slice(index + 1)]
                                                                updateBackendwithNewTasks(newTask)
                                                                return newTask
                                                            }
                                                            )
                                                        }
                                                        else {
                                                        }
                                                    }}>
                                                    {elem}
                                                </span>
                                            </p>
                                            <span className='flex items-center mx-2 cursor-pointer' name="hereGPT">
                                                <AiFillCheckCircle color="gray" onClick={() => handleDeleteTask(index, ind)} />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="m-2 bg-gray-400 min-w-[200px] flex items-center justify-center text-6xl">
                            <p className='cursor-pointer' onClick={handleAddingNewList}>➕</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Home