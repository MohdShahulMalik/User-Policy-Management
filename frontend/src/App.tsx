import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Button from './components/Button'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users' 
import Policies from './pages/Policies' 

function App() {

  return (
    <Routes>
      <Route path = "/" element={<Layout/>}>
        <Route index path = "/" element = {<Dashboard/>} />
        <Route path="/users" element = {<Users/>} />
        <Route path="/policies" element = {<Policies/>} />
      </Route>
      <Route path='*' element = {<div>Not Found</div>} />
    </Routes>
  )
}

export default App
