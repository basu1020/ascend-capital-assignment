import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import appContext from '../context/app/appContext'

const Navbar = () => {
  const app_context = useContext(appContext)
  const {loggedIN, setLoggedIN} = app_context

  return (
    <>
      <nav className='bg-gray-300 text-black flex flex-row md:flex-col items-center justify-between min-h-[8vh]'>
        <h1 className="text-xl font-bold items-center justify-center  md:justify-center md:w-full ms-4 w-1/2">
          <Link to="/">
            TaskApp {}
          </Link>
        </h1>
        { !loggedIN &&
        <div className="flex flex-row md:flex-col font-normal justify-end md:justify-center md:items-center w-1/2 md:w-full me-4">
          <Link to="/login" className='mx-2'> Login </Link>
          <Link to="/signup" className='mx-2'> Sign up </Link>
        </div>}
        {loggedIN && <div className="flex flex-row md:flex-col font-normal justify-end md:justify-center md:items-center w-1/2 md:w-full me-4">
          <p className='cursor-pointer' onClick={() => {
            localStorage.removeItem("taskapp-token")
            setLoggedIN(false)
          }}>Log Out</p>
          </div>}
      </nav>
    </>
  )
}

export default Navbar