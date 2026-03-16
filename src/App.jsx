import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f5f5f5]">

        <Navbar
          name="Brand Perception AI - Early Signals"
          // subname="A tool to analyze brand perception using AI"
        />

        <Dashboard />

      </div>
    </BrowserRouter>
  )
}

export default App