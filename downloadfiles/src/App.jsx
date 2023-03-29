import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Download from './components/Download'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
