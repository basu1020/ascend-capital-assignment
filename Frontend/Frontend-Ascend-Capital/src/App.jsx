import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AppState from './context/app/appState'

function App() {

  return (
    <>
      <AppState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AppState>
    </>
  )
}

export default App
