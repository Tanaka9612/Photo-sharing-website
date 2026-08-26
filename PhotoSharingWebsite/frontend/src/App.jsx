import { useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import './App.css'
import Home from './components/Home'
import SplashPage from'./components/SplashPage'
import Login from './components/Login'
import Signup from './components/SignUp'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
