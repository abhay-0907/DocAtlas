import Index from "./pages/Index"
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
function App() {

  return (
    <>
    <div>

    </div>
    <Routes>
      <Route path="/app" element={<Index/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
