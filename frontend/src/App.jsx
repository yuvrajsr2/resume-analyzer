import { useState } from 'react'
import {Router, Route, Routes, Navigate} from 'react-router-dom'
import './App.css'


import HomePage from './pages/homePage'
import AnalyzePage from './pages/analyzePage'

function App() {
  

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Resume analyzer
      </h1>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
      </Routes>
    </div>
  )
}

export default App
